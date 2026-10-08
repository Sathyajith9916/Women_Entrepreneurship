import React from 'react';
import { Share2, ShoppingBag, MessageSquare, Check, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProductCard({ product, seller, onOrderClick, onSellerClick }) {
  const { t, festivalDemandState, showToast } = useApp();
  const [showPreOrderModal, setShowPreOrderModal] = React.useState(false);

  const isSellerClosed = seller?.status === "TEMPORARILY CLOSED";
  const isAvailable = product.availability && !isSellerClosed;
  const isSareeOrFashion = product.category?.toLowerCase().includes('fashion') || product.name?.toLowerCase().includes('saree') || product.category?.toLowerCase().includes('embroidery') || product.category?.toLowerCase().includes('kasuti');
  const isPreOrderActive = festivalDemandState?.campaignLaunched || isSareeOrFashion;

  const handleWhatsAppShare = (e) => {
    e.stopPropagation();
    const shareText = encodeURIComponent(
      `Check out ${seller.name} on Namma Siri!\n\n` +
      `*${product.name}*\n` +
      `Price: ₹${product.price} (${product.unit})\n` +
      `Location: ${seller.location}, Hubballi-Dharwad\n\n` +
      `Order or request quote: https://nammasiri.hubballi/s/${seller.id}`
    );
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  return (
    <div className="card" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      opacity: isAvailable ? 1 : 0.75,
      transition: 'border-color 0.15s ease'
    }}>
      <div>
        {/* Top meta tags */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
          <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
            {product.category}
          </span>
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            {product.isQuoteBased ? (
              <span className="badge badge-accent">Quote Based</span>
            ) : isAvailable ? (
              <span className="badge badge-open">In Stock</span>
            ) : (
              <span className="badge badge-closed">Unavailable</span>
            )}
          </div>
        </div>

        {/* Festival Pre-order Banner Badge */}
        {isPreOrderActive && (
          <div style={{
            backgroundColor: '#fff1f2',
            border: '1px solid #fecdd3',
            borderRadius: '0.4rem',
            padding: '0.35rem 0.6rem',
            marginBottom: '0.6rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem'
          }}>
            <span style={{ color: '#be185d', fontWeight: 700 }}>
              🪔 Dasara Pre-order available
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPreOrderModal(true);
              }}
              className="btn btn-primary btn-sm"
              style={{
                fontSize: '0.7rem',
                padding: '0.15rem 0.5rem',
                backgroundColor: '#be185d',
                color: '#ffffff',
                border: 'none',
                fontWeight: 800
              }}
            >
              Pre-order
            </button>
          </div>
        )}

        {/* Product Title */}
        <h3 style={{
          fontSize: '1rem',
          fontWeight: 700,
          color: 'var(--text-main)',
          marginBottom: '0.35rem',
          lineHeight: 1.3
        }}>
          {product.name}
        </h3>

        {/* Seller info link */}
        {seller && (
          <div style={{
            fontSize: '0.8125rem',
            marginBottom: '0.6rem',
            color: 'var(--text-muted)'
          }}>
            by <button
              onClick={() => onSellerClick(seller)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'var(--accent)',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {seller.name}
            </button>
            <span style={{ margin: '0 0.35rem', color: 'var(--border-strong)' }}>•</span>
            <span>{seller.location}</span>
          </div>
        )}

        {/* Description */}
        <p style={{
          fontSize: '0.8125rem',
          color: 'var(--text-muted)',
          lineHeight: 1.45,
          marginBottom: '1rem'
        }}>
          {product.description}
        </p>
      </div>

      {/* Bottom price and actions */}
      <div style={{
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
              ₹{product.price}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
              /{product.unit}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {/* WhatsApp share */}
          <button
            onClick={handleWhatsAppShare}
            className="btn btn-secondary btn-sm"
            title="Share product via WhatsApp"
            style={{ padding: '0.35rem 0.5rem' }}
          >
            <Share2 size={13} color="#16a34a" />
          </button>

          {/* Order / Quote action */}
          <button
            onClick={() => onOrderClick(product, seller)}
            disabled={!isAvailable}
            className={`btn btn-sm ${product.isQuoteBased ? 'btn-outline-accent' : 'btn-primary'}`}
            style={{
              opacity: isAvailable ? 1 : 0.5,
              cursor: isAvailable ? 'pointer' : 'not-allowed'
            }}
          >
            {product.isQuoteBased ? (
              <>
                <MessageSquare size={13} />
                <span>Request Quote</span>
              </>
            ) : (
              <>
                <ShoppingBag size={13} />
                <span>Order</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Pre-order Recorded Modal */}
      {showPreOrderModal && (
        <div className="modal-overlay" onClick={() => setShowPreOrderModal(false)} style={{ zIndex: 1100 }}>
          <div
            className="modal-content"
            style={{ maxWidth: 380, textAlign: 'center', padding: '2rem 1.5rem', borderRadius: '1rem' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              backgroundColor: '#fff1f2',
              color: '#be185d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '1.8rem',
              border: '2px solid #fecdd3'
            }}>
              🪔
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#881337', marginBottom: '0.4rem' }}>
              Pre-order Request Recorded!
            </h3>

            <p style={{ fontSize: '0.85rem', color: '#be185d', marginBottom: '1.25rem', fontWeight: 500 }}>
              Your pre-order request for <strong>{product.name}</strong> by <strong>{seller?.name}</strong> has been recorded for Dasara festival delivery.
            </p>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1.25rem', fontSize: '0.78rem', color: '#475569', textAlign: 'left' }}>
              <div>📍 Delivery Location: {seller?.location}, Hubballi-Dharwad</div>
              <div>🏷️ Price: ₹{product.price} ({product.unit})</div>
              <div>✨ No advance payment required for pre-orders.</div>
            </div>

            <button
              onClick={() => setShowPreOrderModal(false)}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', backgroundColor: '#be185d', padding: '0.6rem', fontWeight: 800 }}
            >
              Great, Thank You!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
