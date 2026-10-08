import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Store, Users, Bike, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CompartmentSwitcher() {
  const { currentRole, setCurrentRole, activeSeller } = useApp();

  const compartments = [
    {
      id: 'CUSTOMER',
      name: 'Customer Compartment',
      badge: 'Buyer & Resident',
      icon: ShoppingBag,
      color: '#be185d', // rose pink
      bgColor: '#fdf2f8',
      borderColor: '#fbcfe8',
      desc: 'Browse Hubballi home makers, discover authentic food & Kasuti, place orders and pay via UPI QR.'
    },
    {
      id: 'SELLER',
      name: 'Business Owner Compartment',
      badge: 'Micro-Entrepreneur',
      icon: Store,
      color: '#b45309', // warm amber
      bgColor: '#fffbeb',
      borderColor: '#fde68a',
      desc: 'Seller Portal: Manage products, accept customer orders, view UPI ledger, expenses, and loan trust score.'
    },
    {
      id: 'COMMUNITY',
      name: 'Community & Sisterhood',
      badge: 'Peer Network',
      icon: Users,
      color: '#7e22ce', // purple
      bgColor: '#faf5ff',
      borderColor: '#e9d5ff',
      desc: 'Connect with 1,200+ local women entrepreneurs, attend workshops, and share business advice.'
    },
    {
      id: 'DELIVERY',
      name: 'Delivery Fleet Compartment',
      badge: 'Local Logistics',
      icon: Bike,
      color: '#0369a1', // blue
      bgColor: '#f0f9ff',
      borderColor: '#bae6fd',
      desc: 'Neighborhood delivery partners handling door-to-door pickups & dropoffs in Vidyanagar & Dharwad.'
    }
  ];

  const activeCompartment = compartments.find(c => c.id === currentRole) || compartments[0];

  return (
    <div style={{
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0.75rem 1rem 0 1rem'
    }}>
      {/* Compartment Selector Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '0.65rem',
        marginBottom: '0.75rem'
      }}>
        {compartments.map(comp => {
          const isActive = currentRole === comp.id;
          const Icon = comp.icon;
          return (
            <button
              key={comp.id}
              onClick={() => setCurrentRole(comp.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left',
                padding: '0.75rem 0.9rem',
                backgroundColor: isActive ? comp.bgColor : '#ffffff',
                border: '2px solid',
                borderColor: isActive ? comp.color : 'var(--border-color)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                boxShadow: isActive ? 'var(--shadow-md)' : 'none',
                transition: 'all 0.15s ease',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <div style={{
                    backgroundColor: isActive ? comp.color : 'var(--bg-subtle)',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.3rem',
                    display: 'flex'
                  }}>
                    <Icon size={16} />
                  </div>
                  <strong style={{ fontSize: '0.875rem', color: isActive ? comp.color : 'var(--text-main)' }}>
                    {comp.name}
                  </strong>
                </div>

                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '10px',
                  backgroundColor: isActive ? comp.color : 'var(--bg-subtle)',
                  color: isActive ? '#ffffff' : 'var(--text-subtle)'
                }}>
                  {comp.badge}
                </span>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                {comp.desc}
              </div>

              {isActive && (
                <div style={{
                  marginTop: '0.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: comp.color
                }}>
                  <CheckCircle2 size={12} />
                  <span>ACTIVE COMPARTMENT</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Compartment Clarification Banner */}
      <div style={{
        padding: '0.55rem 1rem',
        backgroundColor: activeCompartment.bgColor,
        border: `1px solid ${activeCompartment.borderColor}`,
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
        fontSize: '0.8125rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '1rem' }}>👉</span>
          <span style={{ color: 'var(--text-main)' }}>
            <strong>Viewing {activeCompartment.name}:</strong>{' '}
            {currentRole === 'CUSTOMER' && 'You are experiencing the platform as a customer looking for local food & handicrafts.'}
            {currentRole === 'SELLER' && `Managing ${activeSeller?.name || 'Seller Hub'} (Vidyanagar). Live order pipeline, payment ledger & loan readiness.`}
            {currentRole === 'COMMUNITY' && 'Exploring the Hubballi women entrepreneurs support network, upcoming offline meetups & peer Q&A.'}
            {currentRole === 'DELIVERY' && 'Simulating the local delivery rider dispatch flow across Hubballi-Dharwad.'}
          </span>
        </div>

        {/* Quick Demo Switcher Buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', fontWeight: 600 }}>Quick Demo:</span>
          <button
            onClick={() => setCurrentRole(currentRole === 'CUSTOMER' ? 'SELLER' : 'CUSTOMER')}
            className="btn btn-secondary btn-sm"
            style={{
              padding: '0.2rem 0.55rem',
              fontSize: '0.72rem',
              borderColor: activeCompartment.borderColor,
              backgroundColor: '#ffffff'
            }}
          >
            {currentRole === 'CUSTOMER' ? '👩‍🍳 Switch to Business Owner Mode' : '🛍️ Switch to Customer Mode'}
          </button>
        </div>
      </div>
    </div>
  );
}
