import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, QrCode, CheckCircle2, Clock, AlertCircle, ArrowUpRight, Download, Filter, Search, Printer, ShieldCheck, IndianRupee } from 'lucide-react';

export default function PaymentLayerSection() {
  const { orders, activeSeller, markPaymentCompleted, showToast } = useApp();
  const [filterMode, setFilterMode] = useState('ALL'); // 'ALL', 'UPI', 'COD'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderForSimulation, setSelectedOrderForSimulation] = useState(null);
  const [simulatedUtr, setSimulatedUtr] = useState('');

  // Seller orders
  const sellerOrders = orders.filter(o => o.sellerId === activeSeller.id);

  // Filtered orders for ledger
  const filteredOrders = sellerOrders.filter(o => {
    const matchMode = filterMode === 'ALL' || (o.paymentMethod || 'UPI') === filterMode;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || o.id.toLowerCase().includes(q) || (o.customerName || '').toLowerCase().includes(q);
    return matchMode && matchSearch;
  });

  // Monthly Metrics Calculations
  const totalRevenue = sellerOrders
    .filter(o => o.status === 'DELIVERED' || o.paymentStatus === 'PAID')
    .reduce((s, o) => s + (o.totalAmount || 0), 0);

  const upiCollections = sellerOrders
    .filter(o => (o.paymentMethod || 'UPI') === 'UPI' && (o.status === 'DELIVERED' || o.paymentStatus === 'PAID'))
    .reduce((s, o) => s + (o.totalAmount || 0), 0);

  const codCollections = totalRevenue - upiCollections;
  const settledOrdersCount = sellerOrders.filter(o => o.paymentStatus === 'PAID').length;
  const pendingPaymentOrders = sellerOrders.filter(o => o.paymentStatus !== 'PAID');

  const handleSimulatePayment = (order) => {
    const fakeUtr = `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}/HDFC`;
    setSimulatedUtr(fakeUtr);
    markPaymentCompleted(order.id);
    showToast(`Payment of ₹${order.totalAmount} captured successfully! Ref: ${fakeUtr}`, "success");
    setSelectedOrderForSimulation(null);
  };

  return (
    <div>
      {/* Header & Overview */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.25rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>
              Financial Infrastructure
            </span>
            <span className="badge badge-accent">Direct P2P Settlement</span>
          </div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Payment Layer & Monthly Revenue Tracker</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Real-time digital payment pipeline for <strong>{activeSeller.name}</strong>. Zero platform withholding — payments settle directly into your UPI ID (<code>{activeSeller.upiId}</code>).
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Printer size={14} />
          <span>Print Monthly Ledger</span>
        </button>
      </div>

      {/* MONTHLY TRACKER SUMMARY CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        <div className="card" style={{ backgroundColor: '#ffffff', border: '1px solid var(--border-color)', padding: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontWeight: 600 }}>
            October 2026 Total Sales
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0' }}>
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--success)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <ArrowUpRight size={13} />
            <span>100% Direct Account Settlement</span>
          </div>
        </div>

        <div className="card" style={{ backgroundColor: '#ffffff', border: '1px solid var(--border-color)', padding: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontWeight: 600 }}>
            UPI QR Collections (Digital)
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0369a1', margin: '0.25rem 0' }}>
            ₹{upiCollections.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
            PhonePe, Google Pay, Paytm, BHIM
          </div>
        </div>

        <div className="card" style={{ backgroundColor: '#ffffff', border: '1px solid var(--border-color)', padding: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontWeight: 600 }}>
            Cash on Delivery (COD)
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#b45309', margin: '0.25rem 0' }}>
            ₹{codCollections.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
            Collected directly at doorstep
          </div>
        </div>

        <div className="card" style={{ backgroundColor: '#ffffff', border: '1px solid var(--border-color)', padding: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontWeight: 600 }}>
            Settlement Reliability
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)', margin: '0.25rem 0' }}>
            99.2%
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
            {settledOrdersCount} Verified settled orders
          </div>
        </div>
      </div>

      {/* PAYMENT PIPELINE TRACKER */}
      <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: '#ffffff', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CreditCard size={18} color="var(--accent)" />
          <span>4-Stage Payment Lifecycle Flow</span>
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.75rem'
        }}>
          {[
            { step: '1', title: 'Order Confirmed', desc: 'Seller reviews & accepts order in hub', status: 'COMPLETE', color: 'var(--success)' },
            { step: '2', title: 'UPI QR Generated', desc: `Encoded with ₹ amount & ${activeSeller.upiId}`, status: 'COMPLETE', color: 'var(--success)' },
            { step: '3', title: 'Customer Pays', desc: 'Scan & Pay via any Indian UPI app', status: 'ACTIVE', color: '#0369a1' },
            { step: '4', title: 'Instant Settlement', desc: 'Money reaches seller account immediately', status: 'AUTO', color: 'var(--accent)' }
          ].map(s => (
            <div key={s.step} style={{
              padding: '0.75rem',
              backgroundColor: 'var(--bg-pink-soft)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: s.color, backgroundColor: '#fff', padding: '2px 6px', borderRadius: '4px' }}>
                  STAGE {s.step}
                </span>
                <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  {s.status}
                </span>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.2rem' }}>{s.title}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK SIMULATOR FOR TESTING PENDING PAYMENTS */}
      {pendingPaymentOrders.length > 0 && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#fffbeb',
          border: '1px solid #fde68a',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#92400e' }}>
              Pending Payment Verification ({pendingPaymentOrders.length} order{pendingPaymentOrders.length > 1 ? 's' : ''})
            </div>
            <div style={{ fontSize: '0.75rem', color: '#78350f' }}>
              Simulate customer UPI payment completion to verify ledger update in real-time.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {pendingPaymentOrders.slice(0, 2).map(order => (
              <button
                key={order.id}
                onClick={() => handleSimulatePayment(order)}
                className="btn btn-primary btn-sm"
                style={{ fontSize: '0.75rem' }}
              >
                Mark #{order.id} as Paid (₹{order.totalAmount})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PAYMENT TRANSACTION LEDGER */}
      <div className="card" style={{ backgroundColor: '#ffffff', border: '1px solid var(--border-color)' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '1rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>
              Transaction Payment Ledger ({filteredOrders.length})
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Complete audit trail of incoming payments, customer details, and settlement states.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search order or customer..."
                style={{
                  padding: '0.35rem 0.6rem 0.35rem 1.8rem',
                  fontSize: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  outline: 'none'
                }}
              />
            </div>

            {/* Mode Filter */}
            <select
              value={filterMode}
              onChange={e => setFilterMode(e.target.value)}
              className="select-control"
              style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', width: 'auto' }}
            >
              <option value="ALL">All Payment Methods</option>
              <option value="UPI">UPI Digital Transfer</option>
              <option value="COD">Cash on Delivery (COD)</option>
            </select>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="table-container">
          <table className="table-clean" style={{ fontSize: '0.8125rem' }}>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items Ordered</th>
                <th>Amount</th>
                <th>Payment Mode</th>
                <th>Settlement Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                    No payment records matching the selected filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => {
                  const isPaid = order.paymentStatus === 'PAID';
                  const method = order.paymentMethod || 'UPI';
                  return (
                    <tr key={order.id}>
                      <td style={{ color: 'var(--text-subtle)', whiteSpace: 'nowrap' }}>
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td><strong>#{order.id}</strong></td>
                      <td>
                        <div>{order.customerName}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>{order.customerPhone}</div>
                      </td>
                      <td style={{ color: 'var(--text-muted)', maxWidth: '240px' }}>
                        {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                      </td>
                      <td>
                        <strong style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>
                          ₹{order.totalAmount}
                        </strong>
                      </td>
                      <td>
                        <span className={`badge ${method === 'UPI' ? 'badge-delivery' : 'badge-neutral'}`}>
                          {method === 'UPI' ? '📱 Direct UPI' : '💵 Cash on Delivery'}
                        </span>
                      </td>
                      <td>
                        {isPaid ? (
                          <span className="badge badge-open" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                            <CheckCircle2 size={11} />
                            <span>Settled (PAID)</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSimulatePayment(order)}
                            className="btn btn-primary btn-sm"
                            style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                          >
                            Mark Paid
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
