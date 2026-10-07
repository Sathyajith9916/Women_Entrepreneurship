import React from 'react';
import { X, MapPin, Phone, Clock, Share2, AlertTriangle, CheckCircle, Package } from 'lucide-react';
import ProductCard from './ProductCard';
import { useApp } from '../context/AppContext';

export default function SellerProfileModal({ seller, onClose, onOrderClick }) {
  const { products, t } = useApp();
  if (!seller) return null;

  const sellerProducts = products.filter(p => p.sellerId === seller.id);
  const isClosed = seller.status === "TEMPORARILY CLOSED";
  const isLimited = seller.status === "LIMITED ORDERS";

  const handleShareStore = () => {
    const text = encodeURIComponent(
      `Check out ${seller.name} by ${seller.ownerName} on Sakhi Market!\n\n` +
      `Specialty: ${seller.category} in ${seller.location}, Hubballi-Dharwad.\n` +
      `Explore catalogue: https://sakhi-market.hubballi/s/${seller.id}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '780px' }} onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-neutral">{seller.category}</span>
              {isClosed ? (
                <span className="badge badge-closed">Temporarily Closed</span>
              ) : isLimited ? (
                <span className="badge badge-limited">Limited Orders</span>
              ) : (
                <span className="badge badge-open">Open for Orders</span>
              )}
            </div>
            <h2 className="modal-title" style={{ fontSize: '1.4rem' }}>{seller.name}</h2>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Proprietor: <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{seller.ownerName}</span>
            </div>
          </div>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </div>

        {/* Unavailable notice alert if seller is closed */}
        {seller.unavailableNotice && (
          <div className="callout callout-warning">
            <AlertTriangle size={18} />
            <div>
              <strong>Availability Notice:</strong> {seller.unavailableNotice}
              {isClosed && (
                <div style={{ fontSize: '0.775rem', marginTop: '0.2rem' }}>
                  Orders are temporarily paused by the seller. Please check back later.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Seller Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '0.75rem',
          backgroundColor: 'var(--bg-secondary)',
          padding: '0.85rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.25rem',
          fontSize: '0.8125rem'
        }}>
          <div>
            <div style={{ color: 'var(--text-subtle)', marginBottom: '0.2rem' }}>Location & Address</div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
              <MapPin size={14} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{seller.address || `${seller.location}, Hubballi-Dharwad`}</span>
            </div>
          </div>

          <div>
            <div style={{ color: 'var(--text-subtle)', marginBottom: '0.2rem' }}>Working Hours</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={14} color="var(--text-muted)" />
              <span>{seller.workingHours}</span>
            </div>
          </div>

          <div>
            <div style={{ color: 'var(--text-subtle)', marginBottom: '0.2rem' }}>Delivery / Pickup</div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {seller.deliveryAvailable && <span className="badge badge-delivery">Home Delivery</span>}
              {seller.pickupAvailable && <span className="badge badge-neutral">Store Pickup</span>}
            </div>
          </div>

          <div>
            <div style={{ color: 'var(--text-subtle)', marginBottom: '0.2rem' }}>Contact & Share</div>
            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <button
                onClick={handleShareStore}
                className="btn btn-whatsapp btn-sm"
              >
                <Share2 size={13} />
                <span>WhatsApp Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* About Business */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.35rem' }}>About the Business</h4>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {seller.description}
          </p>
        </div>

        {/* Products in this store */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>
              Store Catalogue ({sellerProducts.length} items)
            </h4>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '0.75rem'
          }}>
            {sellerProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                seller={seller}
                onOrderClick={onOrderClick}
                onSellerClick={() => {}}
              />
            ))}
          </div>
        </div>

        {/* Modal footer */}
        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
