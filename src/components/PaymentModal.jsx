import React, { useState } from 'react';
import { X, QrCode, CheckCircle2, Copy, Check, ExternalLink, ShieldAlert, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PaymentModal({ order, onClose }) {
  const { sellers, markPaymentCompleted, t } = useApp();
  const [copied, setCopied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(order?.paymentStatus === 'PAID');

  if (!order) return null;

  const seller = sellers.find(s => s.id === order.sellerId);
  const upiId = seller?.upiId || "nammasiri.business@upi";
  const amount = order.totalAmount || 0;

  // Standard UPI deep link
  const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(seller?.ownerName || seller?.name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Namma Siri Order ${order.id}`)}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPaid = () => {
    markPaymentCompleted(order.id);
    setIsSuccess(true);
  };

  const handleWhatsAppReceipt = () => {
    const text = encodeURIComponent(
      `Namaskara *${seller?.name || 'Seller'}*,\n\n` +
      `I have placed Order *#${order.id}* on Namma Siri.\n` +
      `Items: ${order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}\n` +
      `Total Amount: *₹${amount}*\n` +
      `Payment Status: *COMPLETED via UPI* to ${upiId}\n` +
      `Fulfillment: ${order.orderType} to ${order.customerAddress}\n\n` +
      `Kindly confirm and dispatch. Dhanyavadagalu!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
              Order #{order.id}
            </span>
            <h3 className="modal-title">Direct UPI Payment</h3>
          </div>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </div>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{
              display: 'inline-flex',
              padding: '1rem',
              backgroundColor: 'var(--success-bg)',
              borderRadius: '50%',
              marginBottom: '1rem'
            }}>
              <CheckCircle2 size={48} color="var(--success)" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Payment Recorded!
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Your payment of <strong>₹{amount}</strong> has been confirmed. The seller and delivery partner will be notified to proceed.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                onClick={handleWhatsAppReceipt}
                className="btn btn-whatsapp"
                style={{ width: '100%' }}
              >
                <Share2 size={15} />
                <span>Send Payment Receipt to Seller on WhatsApp</span>
              </button>

              <button onClick={onClose} className="btn btn-secondary" style={{ width: '100%' }}>
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Amount Banner */}
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              textAlign: 'center',
              marginBottom: '1.25rem'
            }}>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-subtle)' }}>Amount to Pay</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0' }}>
                ₹{amount}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Pay directly to: <strong>{seller?.name}</strong> ({seller?.ownerName})
              </div>
            </div>

            {/* Simulated UPI QR Code */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.25rem',
              backgroundColor: '#ffffff'
            }}>
              {/* Clean SVG QR Representation */}
              <div style={{
                width: '160px',
                height: '160px',
                border: '2px solid #0f172a',
                padding: '8px',
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '4px',
                backgroundColor: '#ffffff',
                marginBottom: '0.75rem'
              }}>
                <div style={{ background: '#000', gridColumn: 'span 2', gridRow: 'span 2' }}></div>
                <div style={{ background: '#000' }}></div>
                <div style={{ background: '#000', gridColumn: 'span 2', gridRow: 'span 2' }}></div>
                <div style={{ background: '#000' }}></div>
                <div style={{ background: '#000' }}></div>
                <div style={{ background: '#000' }}></div>
                <div style={{ background: '#000', gridColumn: 'span 2', gridRow: 'span 2' }}></div>
                <div style={{ background: '#000' }}></div>
                <div style={{ background: '#000', gridColumn: 'span 2' }}></div>
                <div style={{ background: '#000' }}></div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--bg-secondary)',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8125rem',
                fontWeight: 600
              }}>
                <span>UPI ID: <strong>{upiId}</strong></span>
                <button
                  onClick={handleCopy}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                  title="Copy UPI ID"
                >
                  {copied ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
                </button>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.35rem' }}>
                Scan using Google Pay, PhonePe, Paytm or BHIM
              </span>
            </div>

            {/* Direct UPI Intent Link (Mobile browsers) */}
            <div style={{ marginBottom: '1.25rem' }}>
              <a
                href={upiLink}
                className="btn btn-secondary"
                style={{ width: '100%', marginBottom: '0.5rem' }}
              >
                <ExternalLink size={14} />
                <span>Open in Installed UPI App</span>
              </a>

              <button
                onClick={handleConfirmPaid}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                <CheckCircle2 size={16} />
                <span>Mark Payment as Completed</span>
              </button>
            </div>

            {/* GST Tax Disclaimer */}
            <div style={{
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '0.75rem',
              textAlign: 'center'
            }}>
              <strong>Regulatory Note:</strong> {t.gstDisclaimer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
