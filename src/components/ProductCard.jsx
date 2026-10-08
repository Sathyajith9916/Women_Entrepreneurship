import React from 'react';
import { Share2, ShoppingBag, MessageSquare, Check, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProductCard({ product, seller, onOrderClick, onSellerClick }) {
  const { t } = useApp();

  const isSellerClosed = seller?.status === "TEMPORARILY CLOSED";
  const isAvailable = product.availability && !isSellerClosed;

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
    </div>
  );
}
