import React from 'react';
import { useApp } from '../context/AppContext';
import { Store, User, Bike, Compass, RotateCcw, Sparkles } from 'lucide-react';

export default function Header({ onOpenRoadmap }) {
  const {
    currentRole,
    setCurrentRole,
    currentLanguage,
    setCurrentLanguage,
    t,
    resetDemoData,
    activeSeller,
    sellers,
    setActiveSellerId
  } = useApp();

  return (
    <header style={{
      borderBottom: '1px solid var(--border-color)',
      backgroundColor: '#ffffff',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
          <span style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <span style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              backgroundColor: 'var(--accent)',
              borderRadius: '2px'
            }}></span>
            SAKHI MARKET
          </span>
          <span style={{
            fontSize: '0.8125rem',
            color: 'var(--text-subtle)',
            display: 'inline-block'
          }}>
            {t.tagline}
          </span>
        </div>

        {/* Center: Role Switcher */}
        <div style={{
          display: 'flex',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '3px',
          gap: '2px'
        }}>
          <button
            onClick={() => setCurrentRole('CUSTOMER')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.75rem',
              fontSize: '0.8125rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              backgroundColor: currentRole === 'CUSTOMER' ? '#ffffff' : 'transparent',
              color: currentRole === 'CUSTOMER' ? 'var(--text-main)' : 'var(--text-muted)',
              boxShadow: currentRole === 'CUSTOMER' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            <User size={14} />
            <span>{t.roleCustomer}</span>
          </button>

          <button
            onClick={() => setCurrentRole('SELLER')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.75rem',
              fontSize: '0.8125rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              backgroundColor: currentRole === 'SELLER' ? '#ffffff' : 'transparent',
              color: currentRole === 'SELLER' ? 'var(--accent)' : 'var(--text-muted)',
              boxShadow: currentRole === 'SELLER' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            <Store size={14} />
            <span>{t.roleSeller}</span>
          </button>

          <button
            onClick={() => setCurrentRole('DELIVERY')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.75rem',
              fontSize: '0.8125rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              backgroundColor: currentRole === 'DELIVERY' ? '#ffffff' : 'transparent',
              color: currentRole === 'DELIVERY' ? 'var(--text-main)' : 'var(--text-muted)',
              boxShadow: currentRole === 'DELIVERY' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            <Bike size={14} />
            <span>{t.roleDelivery}</span>
          </button>
        </div>

        {/* Right utility items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Language selector */}
          <select
            value={currentLanguage}
            onChange={(e) => setCurrentLanguage(e.target.value)}
            style={{
              fontSize: '0.75rem',
              padding: '0.3rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: '#ffffff',
              color: 'var(--text-main)',
              cursor: 'pointer'
            }}
          >
            <option value="en">English (EN)</option>
            <option value="kn">ಕನ್ನಡ (KN)</option>
            <option value="hi">हिन्दी (HI)</option>
          </select>

          {/* Future vision modal trigger */}
          <button
            onClick={onOpenRoadmap}
            className="btn btn-secondary btn-sm"
            title="Long-term vision & community credit readiness roadmap"
          >
            <Sparkles size={13} color="var(--accent)" />
            <span>{t.futureVision}</span>
          </button>

          {/* Reset button */}
          <button
            onClick={resetDemoData}
            className="btn btn-secondary btn-sm"
            title="Reset demo dataset to start fresh"
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>
    </header>
  );
}
