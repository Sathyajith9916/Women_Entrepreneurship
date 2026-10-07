import React, { useState } from 'react';
import { X, ShoppingBag, Truck, MapPin, Phone, User, MessageSquare, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function OrderModal({ product, seller, onClose, onOrderSuccess }) {
  const { createOrder } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('Anand Rao');
  const [customerPhone, setCustomerPhone] = useState('+91 98450 11223');
  const [orderType, setOrderType] = useState(seller?.deliveryAvailable ? 'DELIVERY' : 'PICKUP');
  const [customerAddress, setCustomerAddress] = useState('Opp. BVB College, Vidyanagar, Hubballi');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!product || !seller) return null;

  const isQuote = product.isQuoteBased;
  const deliveryFee = orderType === 'DELIVERY' ? 30 : 0;
  const subtotal = product.price * quantity;
  const totalAmount = isQuote ? 0 : subtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert("Please enter customer name and phone number.");
      return;
    }
    if (orderType === 'DELIVERY' && !customerAddress) {
      alert("Please enter your delivery address.");
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      sellerId: seller.id,
      sellerName: seller.name,
      customerName,
      customerPhone,
      customerAddress: orderType === 'DELIVERY' ? customerAddress : `Pickup at ${seller.address || seller.location}`,
      deliveryAddress: customerAddress,
      orderType,
      notes,
      isQuoteRequest: isQuote,
      items: [
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: isQuote ? 1 : quantity,
          unit: product.unit
        }
      ],
      totalAmount,
      deliveryFee
    };

    const newOrder = createOrder(orderPayload);
    setIsSubmitting(false);
    onOrderSuccess(newOrder);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="badge badge-neutral" style={{ fontSize: '0.7rem', marginBottom: '0.2rem' }}>
              {seller.name} • {seller.location}
            </span>
            <h3 className="modal-title">
              {isQuote ? "Request a Custom Quote" : "Place Order Request"}
            </h3>
          </div>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </div>

        {seller.status === "LIMITED ORDERS" && (
          <div className="callout callout-warning">
            <AlertTriangle size={16} />
            <div style={{ fontSize: '0.8125rem' }}>
              Seller note: Accepting limited orders due to high rush. Processing might take additional time.
            </div>
          </div>
        )}

        {/* Selected Product Summary */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          padding: '0.85rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.25rem',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{product.name}</div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>{product.category} • {product.unit}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>
                {isQuote ? "Quote on Request" : `₹${product.price}`}
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Quantity Selector (if fixed price) */}
          {!isQuote && (
            <div className="input-group">
              <label className="input-label">Quantity ({product.unit})</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="btn btn-secondary"
                  style={{ width: '38px', height: '38px', padding: 0 }}
                >
                  -
                </button>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, minWidth: '30px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="btn btn-secondary"
                  style={{ width: '38px', height: '38px', padding: 0 }}
                >
                  +
                </button>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Total item price: <strong>₹{subtotal}</strong>
                </span>
              </div>
            </div>
          )}

          {/* Customer Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="input-group">
              <label className="input-label">Your Name *</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                className="input-control"
                placeholder="e.g. Anand Rao"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Phone Number (WhatsApp) *</label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={e => setCustomerPhone(e.target.value)}
                className="input-control"
                placeholder="+91 98450 11223"
              />
            </div>
          </div>

          {/* Delivery vs Pickup Choice */}
          <div className="input-group">
            <label className="input-label">Fulfillment Option</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {seller.deliveryAvailable && (
                <label style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 0.75rem',
                  border: '1px solid',
                  borderColor: orderType === 'DELIVERY' ? 'var(--text-main)' : 'var(--border-color)',
                  backgroundColor: orderType === 'DELIVERY' ? 'var(--bg-secondary)' : '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontSize: '0.8125rem',
                  fontWeight: 600
                }}>
                  <input
                    type="radio"
                    name="orderType"
                    checked={orderType === 'DELIVERY'}
                    onChange={() => setOrderType('DELIVERY')}
                  />
                  <span>Local Delivery (+₹30)</span>
                </label>
              )}

              {seller.pickupAvailable && (
                <label style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 0.75rem',
                  border: '1px solid',
                  borderColor: orderType === 'PICKUP' ? 'var(--text-main)' : 'var(--border-color)',
                  backgroundColor: orderType === 'PICKUP' ? 'var(--bg-secondary)' : '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontSize: '0.8125rem',
                  fontWeight: 600
                }}>
                  <input
                    type="radio"
                    name="orderType"
                    checked={orderType === 'PICKUP'}
                    onChange={() => setOrderType('PICKUP')}
                  />
                  <span>Self Pickup (Free)</span>
                </label>
              )}
            </div>
          </div>

          {/* Address input if delivery */}
          {orderType === 'DELIVERY' && (
            <div className="input-group">
              <label className="input-label">Delivery Address in Hubballi-Dharwad *</label>
              <input
                type="text"
                required
                value={customerAddress}
                onChange={e => setCustomerAddress(e.target.value)}
                className="input-control"
                placeholder="Street address, landmark, locality"
              />
            </div>
          )}

          {/* Notes or Custom requirement */}
          <div className="input-group">
            <label className="input-label">
              {isQuote ? "Custom Specifications & Requirements *" : "Special Instructions / Delivery Time"}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="textarea-control"
              placeholder={isQuote ? "Describe measurements, colors, date required, quantity, etc." : "e.g. Please deliver warm by 5 PM for puja"}
            />
          </div>

          {/* Order Summary calculation */}
          {!isQuote && (
            <div style={{
              borderTop: '1px solid var(--border-color)',
              paddingTop: '0.75rem',
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.875rem'
            }}>
              <div>
                <span>Items: ₹{subtotal}</span>
                {orderType === 'DELIVERY' && (
                  <span style={{ color: 'var(--text-subtle)', marginLeft: '0.5rem' }}>+ ₹30 Delivery</span>
                )}
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>
                Total: ₹{totalAmount}
              </div>
            </div>
          )}

          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            marginBottom: '1.25rem',
            backgroundColor: 'var(--bg-subtle)',
            padding: '0.5rem 0.75rem',
            borderRadius: '4px'
          }}>
            ℹ️ <strong>Workflow:</strong> Request is sent directly to the woman entrepreneur for approval. You will be prompted for UPI payment once accepted.
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn ${isQuote ? 'btn-accent' : 'btn-primary'}`}
            >
              {isQuote ? "Send Quote Request" : "Submit Order Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
