import React from 'react';
import { useApp } from '../context/AppContext';
import { Store, User, Bike, RotateCcw, Sparkles, Info, Users, Compass, LogIn, UserPlus, LogOut, HelpCircle } from 'lucide-react';

// Women-empowerment logo: raised fist + Venus symbol
function NammaSiriLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Namma Siri — Women Empowerment">
      {/* Fist body */}
      <rect x="19" y="32" width="14" height="10" rx="3" fill="#be185d" />
      {/* Fingers */}
      <rect x="20" y="20" width="3.5" height="14" rx="1.75" fill="#be185d" />
      <rect x="24.25" y="18" width="3.5" height="16" rx="1.75" fill="#be185d" />
      <rect x="28.5" y="19" width="3.5" height="15" rx="1.75" fill="#be185d" />
      {/* Thumb */}
      <rect x="15.5" y="27" width="5" height="3.5" rx="1.75" fill="#be185d" />
      {/* Sparkle star */}
      <circle cx="35" cy="14" r="2.5" fill="#ec4899" />
      <line x1="35" y1="10.5" x2="35" y2="9" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="35" y1="17.5" x2="35" y2="19" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="31.5" y1="14" x2="30" y2="14" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="38.5" y1="14" x2="40" y2="14" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" />
      {/* Venus ♀ symbol */}
      <circle cx="20" cy="12" r="5" stroke="#be185d" strokeWidth="1.8" fill="none" />
      <line x1="20" y1="17" x2="20" y2="21" stroke="#be185d" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="17.5" y1="19" x2="22.5" y2="19" stroke="#be185d" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Header({ onOpenRoadmap, onOpenAbout, onOpenAuth, onOpenSupport, onOpenVoiceModal }) {
  const {
    currentRole,
    setCurrentRole,
    currentLanguage,
    setCurrentLanguage,
    t,
    resetDemoData,
    currentUser,
    logoutUser,
  } = useApp();

  const goHome = () => {
    setCurrentRole('CUSTOMER');
  };

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
        {/* Brand — click goes to home */}
        <button
          onClick={goHome}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            textAlign: 'left'
          }}
          title="Go to home"
        >
          <NammaSiriLogo size={36} />
          <div>
            <div style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
              lineHeight: 1.1
            }}>
              NAMMA SIRI
            </div>
            <div style={{
              fontSize: '0.72rem',
              color: 'var(--text-subtle)',
              lineHeight: 1.2
            }}>
              {t.tagline}
            </div>
          </div>
        </button>

        {/* Hubballi-Dharwad tagline chip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            backgroundColor: '#fce7f3',
            color: '#be185d',
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '0.25rem 0.65rem',
            borderRadius: '1rem',
            border: '1px solid #fbcfe8'
          }}>
            🌸 Hubballi-Dharwad Women's Commerce Infrastructure
          </span>
        </div>

        {/* Right utility items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {/* Auth section: Register / Login or Profile chip */}
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: '#fef3c7',
                border: '1px solid #fde68a',
                borderRadius: 'var(--radius-sm)',
                padding: '0.25rem 0.55rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#92400e'
              }}>
                <span>🌸</span>
                <span>{currentUser.fullName?.split(' ')[0] || 'Seller'}</span>
              </div>
              <button
                onClick={logoutUser}
                className="btn btn-secondary btn-sm"
                title="Log out"
                style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
              >
                <LogOut size={12} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <button
                onClick={() => onOpenVoiceModal && onOpenVoiceModal()}
                className="btn btn-sm"
                style={{
                  padding: '0.3rem 0.65rem',
                  fontSize: '0.75rem',
                  backgroundColor: '#be185d',
                  color: '#ffffff',
                  fontWeight: 800,
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  boxShadow: '0 2px 6px rgba(190, 24, 93, 0.2)'
                }}
                title="Register business with voice"
              >
                <span>🎙️ Voice Register</span>
              </button>
              <button
                onClick={() => onOpenAuth && onOpenAuth('login')}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
              >
                <LogIn size={12} />
                <span>Login</span>
              </button>
              <button
                onClick={() => onOpenAuth && onOpenAuth('register')}
                className="btn btn-primary btn-sm"
                style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
              >
                <UserPlus size={12} />
                <span>Register</span>
              </button>
            </div>
          )}

          {/* Language selector */}
          <select
            value={currentLanguage}
            onChange={(e) => {
              const lang = e.target.value;
              setCurrentLanguage(lang);
              const googSelect = document.querySelector('.goog-te-combo');
              if (googSelect) {
                googSelect.value = lang;
                googSelect.dispatchEvent(new Event('change'));
              } else {
                document.cookie = `googtrans=/en/${lang}; path=/`;
                window.location.reload();
              }
            }}
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

          {/* Customer Support & Help Desk button */}
          <button
            onClick={onOpenSupport}
            className="btn btn-secondary btn-sm"
            title="Help Desk & Sakhi Helpline"
            style={{ backgroundColor: '#fff5f7', borderColor: 'var(--border-strong)', color: 'var(--accent)' }}
          >
            <HelpCircle size={13} color="var(--accent)" />
            <span>Help & Support</span>
          </button>

          {/* About Us button */}
          <button
            onClick={onOpenAbout}
            className="btn btn-secondary btn-sm"
            title="About Namma Siri"
          >
            <Info size={13} color="var(--accent)" />
            <span>About Us</span>
          </button>

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
