import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Check, ChevronDown, ChevronUp, FastForward, Info } from 'lucide-react';

export default function DemoWalkthroughBar({ onTriggerDemoAction }) {
  const { currentRole, setCurrentRole, activeSeller, setActiveSellerId } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { num: 1, text: "Open Sakhi Market", role: "CUSTOMER" },
    { num: 2, text: "Search 'Holige'", role: "CUSTOMER", action: "SEARCH_HOLIGE" },
    { num: 3, text: "Find Vidyanagar business (Lakshmi Home Foods)", role: "CUSTOMER" },
    { num: 4, text: "Open catalogue", role: "CUSTOMER", action: "OPEN_CATALOGUE" },
    { num: 5, text: "Place order request", role: "CUSTOMER", action: "PLACE_ORDER" },
    { num: 6, text: "Seller receives request", role: "SELLER" },
    { num: 7, text: "Seller accepts order", role: "SELLER" },
    { num: 8, text: "Customer UPI payment", role: "CUSTOMER", action: "PAY_UPI" },
    { num: 9, text: "Delivery partner sees request", role: "DELIVERY" },
    { num: 10, text: "Delivery partner accepts", role: "DELIVERY" },
    { num: 11, text: "Move through delivery states", role: "DELIVERY" },
    { num: 12, text: "Order marked DELIVERED", role: "DELIVERY" },
    { num: 13, text: "Seller dashboard earnings update", role: "SELLER" },
    { num: 14, text: "Seller temporarily closes business", role: "SELLER" },
    { num: 15, text: "Customer sees unavailable notice", role: "CUSTOMER" },
    { num: 16, text: "Seller creates Deepavali offer", role: "SELLER" },
    { num: 17, text: "Generate shareable poster", role: "SELLER" },
    { num: 18, text: "Share product on WhatsApp", role: "CUSTOMER" }
  ];

  const handleSelectStep = (s) => {
    setActiveStep(s.num);
    if (s.role !== currentRole) {
      setCurrentRole(s.role);
    }
    if (s.action && onTriggerDemoAction) {
      onTriggerDemoAction(s.action);
    }
  };

  return (
    <div style={{
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      borderBottom: '1px solid #1e293b',
      fontSize: '0.8125rem'
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0.4rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            backgroundColor: 'var(--accent)',
            color: '#ffffff',
            fontWeight: 700,
            padding: '1px 6px',
            borderRadius: '3px',
            fontSize: '0.7rem'
          }}>
            MVP DEMO
          </span>
          <span style={{ fontWeight: 600 }}>
            Step {activeStep} of 18: <span style={{ color: '#93c5fd' }}>{steps[activeStep - 1].text}</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => {
              const next = activeStep < 18 ? activeStep + 1 : 1;
              handleSelectStep(steps[next - 1]);
            }}
            className="btn btn-secondary btn-sm"
            style={{ backgroundColor: '#1e293b', color: '#ffffff', borderColor: '#334155' }}
          >
            <FastForward size={12} />
            <span>Next Step ({activeStep}/18)</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-secondary btn-sm"
            style={{ backgroundColor: '#1e293b', color: '#ffffff', borderColor: '#334155' }}
          >
            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            <span>All 18 Steps</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div style={{
          backgroundColor: '#090d16',
          padding: '0.75rem 1rem',
          borderTop: '1px solid #1e293b'
        }}>
          <div style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '0.4rem'
          }}>
            {steps.map(s => (
              <div
                key={s.num}
                onClick={() => handleSelectStep(s)}
                style={{
                  padding: '0.4rem 0.6rem',
                  borderRadius: '4px',
                  backgroundColor: activeStep === s.num ? 'var(--accent)' : '#1e293b',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <span style={{ fontWeight: 700, minWidth: '18px' }}>{s.num}.</span>
                <span style={{ flex: 1 }}>{s.text}</span>
                <span style={{
                  fontSize: '0.65rem',
                  opacity: 0.8,
                  padding: '1px 4px',
                  borderRadius: '2px',
                  background: 'rgba(0,0,0,0.3)'
                }}>
                  {s.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
