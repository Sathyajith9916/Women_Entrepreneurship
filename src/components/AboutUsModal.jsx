import React from 'react';
import { X, Heart, Users, MapPin, ShoppingBag, Truck, BarChart2, Shield } from 'lucide-react';

const STATS = [
  { value: '15,000+', label: 'Women Entrepreneurs', icon: Users },
  { value: '7', label: 'Business Categories', icon: ShoppingBag },
  { value: '2 Cities', label: 'Hubballi & Dharwad', icon: MapPin },
  { value: '100%', label: 'Locally Operated', icon: Heart },
];

const VALUES = [
  {
    icon: Shield,
    title: 'No GST Required',
    desc: 'Designed for informal micro-businesses. No complicated registration needed to get started.'
  },
  {
    icon: ShoppingBag,
    title: 'Simple Digital Catalogue',
    desc: 'Turn WhatsApp descriptions into structured product listings with photos, pricing, and availability.'
  },
  {
    icon: Truck,
    title: 'Local Delivery Network',
    desc: 'Connect with local delivery partners in Hubballi-Dharwad who understand the area.'
  },
  {
    icon: BarChart2,
    title: 'Business Credibility',
    desc: 'Transaction history and sales records help women entrepreneurs build financial readiness over time.'
  },
];

const TEAM = [
  { name: 'TiE Hubballi', role: 'Ecosystem Partner' },
  { name: 'Women Entrepreneurs Circle', role: 'Community Backbone' },
  { name: 'Local Delivery Network', role: 'Last-Mile Partners' },
  { name: 'District Craftswomen', role: 'Kasuti & Handcraft Guild' },
];

export default function AboutUsModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '720px', padding: 0, overflow: 'hidden' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Hero Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #92400e 0%, #b45309 60%, #d97706 100%)',
          padding: '2rem 2rem 1.5rem',
          color: '#ffffff',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '1rem', right: '1rem',
              background: 'rgba(255,255,255,0.15)', border: 'none',
              borderRadius: '50%', width: 32, height: 32, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
            }}
          >
            <X size={16} />
          </button>

          {/* Women Empowerment Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="26" cy="26" r="26" fill="rgba(255,255,255,0.18)" />
              <rect x="19" y="32" width="14" height="10" rx="3" fill="white" />
              <rect x="20" y="20" width="3.5" height="14" rx="1.75" fill="white" />
              <rect x="24.25" y="18" width="3.5" height="16" rx="1.75" fill="white" />
              <rect x="28.5" y="19" width="3.5" height="15" rx="1.75" fill="white" />
              <rect x="15.5" y="27" width="5" height="3.5" rx="1.75" fill="white" />
              <circle cx="34" cy="14" r="2.5" fill="#FCD34D" />
              <line x1="34" y1="10" x2="34" y2="9" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="34" y1="18" x2="34" y2="19" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="30" y1="14" x2="29" y2="14" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="38" y1="14" x2="39" y2="14" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="20" cy="12" r="5" stroke="white" strokeWidth="1.8" fill="none" />
              <line x1="20" y1="17" x2="20" y2="21" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="17.5" y1="19" x2="22.5" y2="19" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Namma Siri</div>
              <div style={{ fontSize: '0.8125rem', opacity: 0.85 }}>ನಮ್ಮ ಸಿರಿ — Our Prosperity</div>
            </div>
          </div>

          <p style={{ fontSize: '0.9375rem', lineHeight: 1.55, opacity: 0.95, maxWidth: 520 }}>
            A digital commerce platform built from the ground up for the <strong>12,000–15,000 women-led
            home businesses</strong> of Hubballi-Dharwad — from Kasuti embroiderers to home bakers,
            caterers to jewellery makers.
          </p>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderBottom: '1px solid var(--border-color)'
        }}>
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} style={{
              padding: '1rem 0.75rem',
              textAlign: 'center',
              borderRight: '1px solid var(--border-color)'
            }}>
              <Icon size={16} color="var(--accent)" style={{ marginBottom: '0.3rem' }} />
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>{value}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Body content */}
        <div style={{ padding: '1.5rem 2rem', maxHeight: '55vh', overflowY: 'auto' }}>

          {/* Mission */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Our Mission
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Most women entrepreneurs in Hubballi-Dharwad currently sell through WhatsApp groups,
              word-of-mouth, and personal contacts — with no digital presence, no structured catalogue,
              and no reliable payment or delivery workflow.
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginTop: '0.5rem' }}>
              <strong style={{ color: 'var(--text-main)' }}>Namma Siri</strong> changes that — making these
              businesses discoverable, transactable, and financially accountable, without requiring GST
              registration, professional photography, or technical expertise.
            </p>
          </section>

          {/* What we offer */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              What We Offer
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {VALUES.map(({ icon: Icon, title, desc }) => (
                <div key={title} style={{
                  padding: '0.875rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                    <Icon size={14} color="var(--accent)" />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)' }}>{title}</span>
                  </div>
                  <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', lineHeight: 1.45, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Business categories */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Business Categories Supported
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['Home Food & Snacks', 'Baking & Cakes', 'Catering', 'Kasuti / Embroidery', 'Tailoring & Fashion', 'Jewellery', 'Handicrafts', 'Festive Products'].map(cat => (
                <span key={cat} style={{
                  padding: '0.25rem 0.6rem',
                  borderRadius: '999px',
                  background: '#fef3c7',
                  color: '#92400e',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  border: '1px solid #fcd34d'
                }}>{cat}</span>
              ))}
            </div>
          </section>

          {/* Partners */}
          <section style={{ marginBottom: '0.5rem' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Built With & For
            </h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {TEAM.map(({ name, role }) => (
                <div key={name} style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: '#fff'
                }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)' }}>{name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{role}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <div style={{
          padding: '1rem 2rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--bg-secondary)'
        }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            <Heart size={12} style={{ display: 'inline', color: 'var(--accent)', marginRight: 4 }} />
            Made with pride in Hubballi-Dharwad
          </div>
          <button onClick={onClose} className="btn btn-primary btn-sm">
            Explore Namma Siri →
          </button>
        </div>
      </div>
    </div>
  );
}
