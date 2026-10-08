import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Check, ChevronDown, ChevronUp, FastForward, Info } from 'lucide-react';

export default function DemoWalkthroughBar({ onTriggerDemoAction }) {
  const { currentRole, setCurrentRole, activeSeller, setActiveSellerId } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { num: 1, text: "Open Namma Siri", role: "CUSTOMER", action: "STEP_1" },
    { num: 2, text: "Customer searches 'Holige'", role: "CUSTOMER", action: "STEP_2" },
    { num: 3, text: "Finds Vidyanagar business (Lakshmi Home Foods)", role: "CUSTOMER", action: "STEP_3" },
    { num: 4, text: "Opens store catalogue", role: "CUSTOMER", action: "STEP_4" },
    { num: 5, text: "Customer places order request", role: "CUSTOMER", action: "STEP_5" },
    { num: 6, text: "Seller receives request in Hub", role: "SELLER", action: "STEP_6" },
    { num: 7, text: "Seller accepts the order", role: "SELLER", action: "STEP_7" },
    { num: 8, text: "Customer sees UPI/QR payment option", role: "CUSTOMER", action: "STEP_8" },
    { num: 9, text: "Delivery partner sees delivery request", role: "DELIVERY", action: "STEP_9" },
    { num: 10, text: "Delivery partner accepts delivery", role: "DELIVERY", action: "STEP_10" },
    { num: 11, text: "Order advances through delivery states", role: "DELIVERY", action: "STEP_11" },
    { num: 12, text: "Order becomes DELIVERED", role: "DELIVERY", action: "STEP_12" },
    { num: 13, text: "Seller dashboard updates monthly sales", role: "SELLER", action: "STEP_13" },
    { num: 14, text: "Seller temporarily closes business", role: "SELLER", action: "STEP_14" },
    { num: 15, text: "Customer sees unavailable notice", role: "CUSTOMER", action: "STEP_15" },
    { num: 16, text: "Seller creates Deepavali offer", role: "SELLER", action: "STEP_16" },
    { num: 17, text: "Marketplace generates shareable poster", role: "SELLER", action: "STEP_17" },
    { num: 18, text: "Seller shares product through WhatsApp", role: "CUSTOMER", action: "STEP_18" }
  ];

  const handleSelectStep = (s) => {
    setActiveStep(s.num);
    if (s.role !== currentRole) {
      setCurrentRole(s.role);
    }
    if (onTriggerDemoAction) {
      onTriggerDemoAction(s.action, s.num);
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
            <span>View All 18 Steps</span>
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
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
