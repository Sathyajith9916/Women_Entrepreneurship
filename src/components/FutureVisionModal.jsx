import React from 'react';
import { X, Sparkles, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function FutureVisionModal({ onClose }) {
  const visionItems = [
    { title: "1. Women Entrepreneur Community", desc: "Peer-to-peer Hubballi-Dharwad local circle for knowledge sharing, bulk raw material sourcing, and collective purchasing." },
    { title: "2. Expert Talks & Workshops", desc: "Quarterly workshops with food safety officers, packaging experts, and digital marketing leaders from TiE Hubballi." },
    { title: "3. Women Mentorship Network", desc: "Pairing first-time home entrepreneurs with established women business founders across North Karnataka." },
    { title: "4. Festival Demand Prediction", desc: "Machine learning insights helping home bakers and sweet makers forecast ingredient requirements 3 weeks before Deepavali/Dasara." },
    { title: "5. Conversational Voice AI Assistant", desc: "Kannada voice assistant allowing mothers and grandmothers to manage catalogue and orders simply by speaking." },
    { title: "6. Business Trust Profile", desc: "Verifiable rating, hygiene certification badge, and local customer testimonial endorsement system." },
    { title: "7. Financial Readiness Index", desc: "Automated scoring of order consistency, digital transaction volume, and fulfillment discipline." },
    { title: "8. Partnerships with Banks / NBFCs", desc: "Pre-approved low-interest micro-credit and working capital loans based on platform transaction records rather than collateral." },
    { title: "9. Women-Powered Community Fund", desc: "Micro-grant corpus supported by local chamber initiatives and corporate CSR partners for equipment purchases." },
    { title: "10. Government Scheme Discovery", desc: "Direct eligibility checking for Mudra loans, PMEGP, and Karnataka State Women Development Corporation grants." },
    { title: "11. Advanced Neighbourhood Analytics", desc: "Heatmaps of demand across Vidyanagar, Keshwapur, and Dharwad to optimize home business specialization." },
    { title: "12. Dedicated Local EV Delivery Fleet", desc: "All-women electric scooter delivery fleet providing flexible local employment in Hubballi-Dharwad." }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '680px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <Sparkles size={18} color="var(--accent)" />
              <h3 className="modal-title">Namma Siri: Long-Term Vision & Roadmap</h3>
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Marketplace &rarr; Community &rarr; Business Data &rarr; Trust &rarr; Financial Readiness &rarr; Growth
            </div>
          </div>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </div>

        {/* Core Philosophy Callout */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          marginBottom: '1.25rem'
        }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
            Core Guiding Philosophy
          </h4>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
            "Today 12,000–15,000 women-led home businesses in Hubballi-Dharwad exist inside closed WhatsApp groups and personal contacts. Namma Siri makes them discoverable, transactable and accountable without forcing them to become complicated formal e-commerce companies."
          </p>
        </div>

        {/* 12 Roadmap Capabilities */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '0.75rem',
          marginBottom: '1.5rem'
        }}>
          {visionItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                border: '1px solid var(--border-color)',
                padding: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#ffffff'
              }}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'right' }}>
          <button onClick={onClose} className="btn btn-primary">
            Close Roadmap
          </button>
        </div>
      </div>
    </div>
  );
}
