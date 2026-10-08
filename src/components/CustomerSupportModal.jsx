import React, { useState } from 'react';
import { X, Phone, MessageCircle, HelpCircle, Mail, MapPin, Clock, CheckCircle2, ChevronDown, ChevronUp, HeartHandshake, ShieldCheck } from 'lucide-react';

const FAQS = [
  {
    q: "How do I place an order if I don't use credit cards or net banking?",
    a: "Namma Siri supports direct PhonePe, Google Pay, Paytm UPI QR codes as well as Cash on Delivery (COD). You only pay after your order is confirmed by the home seller."
  },
  {
    q: "How does local delivery work across Hubballi and Dharwad?",
    a: "Orders are fulfilled by our local neighborhood delivery fleet (Basavaraj, Pooja, Manjunath). Delivery typically takes 45–90 minutes within Hubballi-Dharwad city limits."
  },
  {
    q: "I am a home cook / artisan without GST. Can I still sell here?",
    a: "YES! Namma Siri is designed specifically for micro-enterprises under the GST exemption limit (up to ₹40 Lakhs turnover). No GST or complex paperwork is required to register and sell."
  },
  {
    q: "How do sellers receive customer payments?",
    a: "Customers pay directly into your personal UPI ID (PhonePe / GPay / Bank UPI). Namma Siri does not hold your money; 100% of your earnings go straight to your account."
  },
  {
    q: "What is the Namma Siri Trust Score for bank loans?",
    a: "It is a digital credit-readiness score (out of 1000) built from your real transaction volume on Namma Siri. You can take your printable statement to local banks in Hubballi for MUDRA and Stree Shakti loans without formal audited balance sheets."
  }
];

export default function CustomerSupportModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('contact'); // 'contact', 'callback', 'faq'
  const [openFaq, setOpenFaq] = useState(0);
  const [callbackForm, setCallbackForm] = useState({ name: '', phone: '', userType: 'Customer', query: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div
        className="modal-content"
        style={{ maxWidth: 540, padding: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header with warm pink-magenta gradient */}
        <div style={{
          background: 'linear-gradient(135deg, #be185d, #9d174d)',
          color: '#ffffff',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', opacity: 0.9 }}>
              <HeartHandshake size={15} />
              <span>Sakhi Community Helpline • Hubballi-Dharwad</span>
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0.2rem 0 0 0' }}>
              Customer Support & Help Desk
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              cursor: 'pointer',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
          {[
            { id: 'contact', label: '📞 Direct Contact' },
            { id: 'callback', label: '🤝 Request Callback' },
            { id: 'faq', label: '❓ Help & FAQs' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                flex: 1,
                padding: '0.75rem',
                fontSize: '0.8125rem',
                fontWeight: 600,
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: activeTab === t.id ? 'var(--accent)' : 'var(--text-muted)',
                borderBottom: activeTab === t.id ? '2px solid var(--accent)' : '2px solid transparent'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Direct Contact */}
        {activeTab === 'contact' && (
          <div style={{ padding: '1.25rem 1.5rem', maxHeight: '70vh', overflowY: 'auto' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Our dedicated women coordinators are available in Hubballi-Dharwad to assist customers and home makers in <strong>Kannada, Hindi, and English</strong>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {/* WhatsApp direct */}
              <a
                href="https://api.whatsapp.com/send?phone=918362200123&text=Namaskara%20Sakhi%20Team%2C%20I%20need%20help%20with%20Namma%20Siri..."
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.9rem 1rem',
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  color: '#15803d'
                }}
              >
                <div style={{ backgroundColor: '#25d366', color: '#fff', borderRadius: '50%', padding: '0.4rem', display: 'flex' }}>
                  <MessageCircle size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Chat on WhatsApp</div>
                  <div style={{ fontSize: '0.75rem', color: '#166534' }}>Instant response • +91 836 220 0123</div>
                </div>
              </a>

              {/* Phone call */}
              <a
                href="tel:+918362200123"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.9rem 1rem',
                  backgroundColor: '#fdf2f8',
                  border: '1px solid #fbcfe8',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  color: '#be185d'
                }}
              >
                <div style={{ backgroundColor: '#be185d', color: '#fff', borderRadius: '50%', padding: '0.4rem', display: 'flex' }}>
                  <Phone size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Sakhi Helpline (Toll Free)</div>
                  <div style={{ fontSize: '0.75rem', color: '#9d174d' }}>1800-425-SIRI (8:00 AM – 9:00 PM)</div>
                </div>
              </a>

              {/* Physical Helpdesk in Hubballi */}
              <div style={{
                padding: '0.9rem 1rem',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <MapPin size={15} color="var(--accent)" />
                  <span>Physical Walk-in Support Centers:</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                  • <strong>Vidyanagar:</strong> TiE Hubballi & Deshpande Foundation Campus<br />
                  • <strong>Keshwapur:</strong> Kasuti Mahila Samaja Kendra, Kusugal Road
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
              <ShieldCheck size={14} color="var(--success)" />
              <span>Safe & respectful support run exclusively by women coordinators.</span>
            </div>
          </div>
        )}

        {/* Tab 2: Request Callback */}
        {activeTab === 'callback' && (
          <div style={{ padding: '1.25rem 1.5rem', maxHeight: '70vh', overflowY: 'auto' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle2 size={48} color="var(--success)" style={{ margin: '0 auto 0.75rem auto' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                  Callback Request Received!
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Our Hubballi Sakhi coordinator will call you back at <strong>{callbackForm.phone}</strong> within 15 minutes.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }}>
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit}>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Need help ordering or setting up your home business? Enter your details and our team will call you directly.
                </p>

                <div className="input-group">
                  <label className="input-label">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={callbackForm.name}
                    onChange={e => setCallbackForm({ ...callbackForm, name: e.target.value })}
                    className="input-control"
                    placeholder="e.g. Rekha Joshi"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Phone Number (WhatsApp preferred) *</label>
                  <input
                    type="tel"
                    required
                    value={callbackForm.phone}
                    onChange={e => setCallbackForm({ ...callbackForm, phone: e.target.value })}
                    className="input-control"
                    placeholder="+91 98451 00000"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">I am contacting as:</label>
                  <select
                    value={callbackForm.userType}
                    onChange={e => setCallbackForm({ ...callbackForm, userType: e.target.value })}
                    className="select-control"
                  >
                    <option value="Customer">Customer (Need help ordering / payment)</option>
                    <option value="Business Owner">Business Owner (Need help onboarding my store)</option>
                    <option value="Delivery Partner">Delivery Fleet Partner</option>
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">What can we help you with?</label>
                  <textarea
                    rows={2}
                    value={callbackForm.query}
                    onChange={e => setCallbackForm({ ...callbackForm, query: e.target.value })}
                    className="textarea-control"
                    placeholder="Describe your question or location in Hubballi-Dharwad..."
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Request Free Callback
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab 3: FAQs */}
        {activeTab === 'faq' && (
          <div style={{ padding: '1.25rem 1.5rem', maxHeight: '70vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: '#ffffff',
                      overflow: 'hidden'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: 'none',
                        background: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--text-main)'
                      }}
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={16} color="var(--accent)" /> : <ChevronDown size={16} />}
                    </button>
                    {isOpen && (
                      <div style={{
                        padding: '0.5rem 1rem 0.85rem 1rem',
                        fontSize: '0.8125rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.5,
                        backgroundColor: 'var(--bg-pink-soft)',
                        borderTop: '1px solid var(--border-color)'
                      }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
