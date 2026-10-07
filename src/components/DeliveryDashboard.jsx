import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bike, MapPin, Phone, CheckCircle2, Navigation, Clock, User, Package, ShieldCheck, ArrowRight } from 'lucide-react';
import { LOCATIONS } from '../data/seedData';

export default function DeliveryDashboard() {
  const {
    deliveryPartners,
    activePartner,
    activeDeliveryPartnerId,
    setActiveDeliveryPartnerId,
    orders,
    sellers,
    updateDeliveryPartnerStatus,
    assignDeliveryPartner,
    updateOrderStatus,
    registerDeliveryPartner
  } = useApp();

  const [isRegistering, setIsRegistering] = useState(false);
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regVehicle, setRegVehicle] = useState('Bike');
  const [regArea, setRegArea] = useState('Vidyanagar');

  // Orders that require delivery and are accepted or ready, without a partner assigned yet
  const availableDeliveryJobs = orders.filter(o =>
    o.orderType === 'DELIVERY' &&
    ['ACCEPTED', 'READY'].includes(o.status) &&
    !o.deliveryPartnerId
  );

  // Active deliveries assigned to this specific partner
  const myActiveDeliveries = orders.filter(o =>
    o.deliveryPartnerId === activePartner.id &&
    ['PICKUP PENDING', 'PICKED UP', 'OUT_FOR_DELIVERY', 'READY', 'ACCEPTED'].includes(o.status)
  );

  const myCompletedDeliveries = orders.filter(o =>
    o.deliveryPartnerId === activePartner.id &&
    o.status === 'DELIVERED'
  );

  const handleRegister = (e) => {
    e.preventDefault();
    const created = registerDeliveryPartner({
      name: regName,
      phone: regPhone,
      vehicleType: regVehicle,
      assignedArea: regArea
    });
    setActiveDeliveryPartnerId(created.id);
    setIsRegistering(false);
  };

  const handleAcceptDeliveryJob = (orderId) => {
    // Partner accepts: moves to PICKUP PENDING
    assignDeliveryPartner(orderId, activePartner.id);
    updateOrderStatus(orderId, 'PICKUP PENDING', `Assigned to delivery partner ${activePartner.name}`);
  };

  return (
    <div>
      {/* Header and Partner Selector */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.25rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>
              Hyperlocal Delivery Network
            </span>
            <span className={`badge ${activePartner.status === 'AVAILABLE' ? 'badge-open' : activePartner.status === 'BUSY' ? 'badge-limited' : 'badge-neutral'}`}>
              {activePartner.status}
            </span>
            <span className="badge badge-neutral">
              {activePartner.vehicleType} • Area: {activePartner.assignedArea}
            </span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{activePartner.name}</h1>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Phone: {activePartner.phone} • Deliveries completed: <strong>{activePartner.completedDeliveries + myCompletedDeliveries.length}</strong>
          </div>
        </div>

        {/* Controls: Change Partner or Availability Status */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={activePartner.id}
            onChange={e => setActiveDeliveryPartnerId(e.target.value)}
            className="select-control"
            style={{ width: 'auto', fontSize: '0.8125rem' }}
          >
            {deliveryPartners.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.vehicleType} - {p.assignedArea})
              </option>
            ))}
          </select>

          <select
            value={activePartner.status}
            onChange={e => updateDeliveryPartnerStatus(activePartner.id, e.target.value)}
            className="select-control"
            style={{ width: 'auto', fontSize: '0.8125rem' }}
          >
            <option value="AVAILABLE">🟢 AVAILABLE</option>
            <option value="BUSY">🟡 BUSY</option>
            <option value="OFFLINE">⚪ OFFLINE</option>
          </select>

          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="btn btn-secondary btn-sm"
          >
            + Register Partner
          </button>
        </div>
      </div>

      {/* Registration Form Modal */}
      {isRegistering && (
        <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--accent-border)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Join Local Delivery Fleet</h3>
          <form onSubmit={handleRegister}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
              <div className="input-group">
                <label className="input-label">Full Name *</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  className="input-control"
                  placeholder="e.g. Suresh Pujar"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={e => setRegPhone(e.target.value)}
                  className="input-control"
                  placeholder="+91 99000 12345"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Vehicle Type</label>
                <select
                  value={regVehicle}
                  onChange={e => setRegVehicle(e.target.value)}
                  className="select-control"
                >
                  <option value="Bike">Bike</option>
                  <option value="Scooter">Scooter</option>
                  <option value="Auto">Auto</option>
                  <option value="Walk">Walk</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Operating Locality</label>
                <select
                  value={regArea}
                  onChange={e => setRegArea(e.target.value)}
                  className="select-control"
                >
                  {LOCATIONS.filter(l => l !== 'All').map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setIsRegistering(false)} className="btn btn-secondary btn-sm">Cancel</button>
              <button type="submit" className="btn btn-primary btn-sm">Register Partner</button>
            </div>
          </form>
        </div>
      )}

      {/* ACTIVE ASSIGNED DELIVERIES */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          My Active Deliveries ({myActiveDeliveries.length})
        </h2>

        {myActiveDeliveries.length === 0 ? (
          <div style={{
            padding: '1.5rem',
            border: '1px dashed var(--border-color)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            color: 'var(--text-muted)',
            backgroundColor: 'var(--bg-secondary)'
          }}>
            No assigned deliveries in progress. Accept an available delivery job below to begin.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {myActiveDeliveries.map(order => {
              const seller = sellers.find(s => s.id === order.sellerId);
              return (
                <div key={order.id} className="card" style={{ borderLeft: '4px solid var(--accent)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div>
                      <span className="badge badge-accent" style={{ marginBottom: '0.2rem' }}>
                        Active Delivery #{order.id}
                      </span>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                        Fulfill order for {order.customerName}
                      </h3>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                        Items: {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span className="badge badge-delivery" style={{ fontSize: '0.8125rem' }}>
                        {order.status}
                      </span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.2rem' }}>
                        Delivery Fee: <strong>₹30</strong>
                      </div>
                    </div>
                  </div>

                  {/* Hubballi-Dharwad Hyperlocal Map & Location Representation */}
                  <div style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem',
                    marginBottom: '0.85rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem', fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                      <span>📍 Hubballi-Dharwad Local Distance & Route</span>
                      <span>Estimated Distance: <strong>2.8 km (approx 12 mins via Gokul Rd)</strong></span>
                    </div>

                    {/* Step-by-step route visualizer: Seller -> Delivery Partner -> Customer */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      position: 'relative',
                      padding: '0.75rem 0'
                    }}>
                      <div style={{ textAlign: 'center', zIndex: 1, minWidth: '100px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, margin: '0 auto 4px' }}>
                          1
                        </div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>{seller?.name}</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-subtle)' }}>Pickup: {seller?.location}</div>
                      </div>

                      <div style={{
                        flex: 1,
                        height: '2px',
                        background: 'var(--border-strong)',
                        margin: '0 8px',
                        position: 'relative'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '-9px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'var(--text-main)',
                          color: '#fff',
                          borderRadius: '10px',
                          padding: '1px 7px',
                          fontSize: '0.65rem',
                          whiteSpace: 'nowrap'
                        }}>
                          {activePartner.vehicleType} • {activePartner.name}
                        </div>
                      </div>

                      <div style={{ textAlign: 'center', zIndex: 1, minWidth: '100px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--success)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, margin: '0 auto 4px' }}>
                          2
                        </div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>{order.customerName}</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-subtle)' }}>Drop: {order.customerAddress}</div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.75rem', backgroundColor: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '4px' }}>
                      <div>
                        <strong>Pickup Contact:</strong> {seller?.phone} ({seller?.ownerName})
                      </div>
                      <div>
                        <strong>Customer Contact:</strong> {order.customerPhone} ({order.customerName})
                      </div>
                    </div>
                  </div>

                  {/* Delivery Actions Progression matching exact spec:
                      PICKUP PENDING -> PICKED UP -> OUT FOR DELIVERY -> DELIVERED */}
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                    {(order.status === 'PICKUP PENDING' || order.status === 'READY' || order.status === 'ACCEPTED') && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'PICKED UP', `Order collected from seller by ${activePartner.name}`)}
                        className="btn btn-secondary btn-sm"
                      >
                        <Package size={14} />
                        <span>Mark PICKED UP from Seller</span>
                      </button>
                    )}

                    {order.status === 'PICKED UP' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'OUT_FOR_DELIVERY', `Out for delivery to customer destination`)}
                        className="btn btn-accent btn-sm"
                      >
                        <Navigation size={14} />
                        <span>Start OUT FOR DELIVERY</span>
                      </button>
                    )}

                    {order.status === 'OUT_FOR_DELIVERY' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'DELIVERED', `Successfully handed over to customer`)}
                        className="btn btn-primary btn-sm"
                      >
                        <CheckCircle2 size={14} />
                        <span>Confirm DELIVERED to Customer</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* AVAILABLE JOBS WAITING FOR LOCAL DELIVERY */}
      <div>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          Available Delivery Requests in Hubballi-Dharwad ({availableDeliveryJobs.length})
        </h2>

        {availableDeliveryJobs.length === 0 ? (
          <div style={{
            padding: '1.5rem',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-muted)',
            fontSize: '0.875rem'
          }}>
            No unassigned deliveries right now. When sellers accept orders requiring delivery, they will appear here.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {availableDeliveryJobs.map(order => {
              const seller = sellers.find(s => s.id === order.sellerId);
              const isAreaMatch = seller?.location === activePartner.assignedArea;
              return (
                <div key={order.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontWeight: 700 }}>Order #{order.id}</span>
                      <span className="badge badge-accent">Delivery Earning ₹30</span>
                      <span className="badge badge-neutral">{seller?.location}</span>
                      {isAreaMatch && (
                        <span className="badge badge-open">Local Match ({activePartner.assignedArea})</span>
                      )}
                    </div>

                    <div style={{ fontSize: '0.8125rem' }}>
                      Pickup: <strong>{seller?.name}</strong> ({seller?.address || seller?.location})
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                      Drop: <strong>{order.customerName}</strong> ({order.customerAddress})
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => handleAcceptDeliveryJob(order.id)}
                      className="btn btn-primary btn-sm"
                    >
                      Accept Delivery
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
