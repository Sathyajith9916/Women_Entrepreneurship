import React, { useState } from 'react';
import { X, User, Phone, Mail, Lock, MapPin, Briefcase, ChevronRight, Store, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

const CATEGORIES = [
  'Food', 'Baking', 'Catering', 'Tailoring',
  'Kasuti / Embroidery', 'Handicrafts', 'Jewellery',
  'Fashion', 'Festive Products', 'Other'
];

const LOCATIONS = [
  'Vidyanagar', 'Gokul Road', 'Keshwapur', 'Shirur Park',
  'Dharwad', 'Old Hubballi', 'Navanagar', 'Deshpande Nagar'
];

function InputField({ label, type = 'text', value, onChange, placeholder, required, icon: Icon }) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  return (
    <div style={{ marginBottom: '0.875rem' }}>
      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
        {label} {required && <span style={{ color: 'var(--accent)' }}>*</span>}
      </label>
      <div style={{ position: 'relative' }}>
        {Icon && (
          <Icon size={14} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        )}
        <input
          type={isPassword && show ? 'text' : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          style={{
            width: '100%',
            padding: `0.5rem ${isPassword ? '2.5rem' : '0.75rem'} 0.5rem ${Icon ? '2.2rem' : '0.75rem'}`,
            fontSize: '0.875rem',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-main)',
            background: '#fff',
            boxSizing: 'border-box',
            outline: 'none'
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            {show ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default function AuthModal({ onClose, onLogin, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register' | 'success'
  const [form, setForm] = useState({
    fullName: '', businessName: '', phone: '', email: '',
    password: '', confirmPassword: '', category: '', location: '', description: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // --- Auth helpers (localStorage) ---
  const getUsers = () => {
    try {
      const existing = JSON.parse(localStorage.getItem('ns_users') || '[]');
      if (existing.length === 0) {
        const seed = [
          {
            id: 'user-lakshmi',
            sellerId: 'seller-1',
            fullName: 'Lakshmi Patil',
            businessName: 'Lakshmi Home Foods',
            phone: '9845123456',
            email: 'lakshmi@example.com',
            password: 'password123',
            category: 'Food',
            location: 'Vidyanagar',
            description: 'Authentic Dharwad Bele Holige and traditional North Karnataka delicacies.',
            registeredAt: new Date().toISOString()
          },
          {
            id: 'user-radha',
            sellerId: 'seller-2',
            fullName: 'Radha Kulkarni',
            businessName: 'Radha Kasuti Kendra',
            phone: '9845234567',
            email: 'radha@example.com',
            password: 'password123',
            category: 'Kasuti / Embroidery',
            location: 'Keshwapur',
            description: 'Handcrafted Dharwad Kasuti embroidery on handloom sarees and kurtis.',
            registeredAt: new Date().toISOString()
          }
        ];
        localStorage.setItem('ns_users', JSON.stringify(seed));
        return seed;
      }
      return existing;
    } catch {
      return [];
    }
  };
  const saveUsers = users => localStorage.setItem('ns_users', JSON.stringify(users));

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    if (!form.fullName || !form.businessName || !form.phone || !form.password || !form.category || !form.location) {
      setError('Please fill all required fields.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const users = getUsers();
    if (users.find(u => u.phone === form.phone)) {
      setError('This phone number is already registered. Please login.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const sellerId = `seller-${Date.now()}`;
      const newUser = {
        id: `user-${Date.now()}`,
        sellerId,
        fullName: form.fullName,
        businessName: form.businessName,
        phone: form.phone,
        email: form.email,
        password: form.password, // plain text — fine for MVP demo
        category: form.category,
        location: form.location,
        description: form.description,
        registeredAt: new Date().toISOString()
      };
      users.push(newUser);
      saveUsers(users);

      // Create seller profile in app state
      const newSeller = {
        id: sellerId,
        name: form.businessName,
        ownerName: form.fullName,
        category: form.category,
        location: form.location,
        address: `${form.location}, Hubballi-Dharwad`,
        phone: form.phone,
        upiId: '',
        description: form.description || `Welcome to ${form.businessName}!`,
        workingHours: '9:00 AM - 7:00 PM',
        deliveryAvailable: true,
        pickupAvailable: true,
        status: 'OPEN',
        unavailableNotice: '',
        rating: 5.0,
        reviewsCount: 0,
        festivalOffers: [],
        isNew: true
      };

      localStorage.setItem('ns_current_user', JSON.stringify(newUser));
      setLoading(false);
      setMode('success');

      setTimeout(() => {
        onLogin(newUser, newSeller);
      }, 1500);
    }, 800);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!form.phone || !form.password) {
      setError('Phone and password are required.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const users = getUsers();
      const user = users.find(u => u.phone === form.phone && u.password === form.password);
      if (!user) {
        setError('Invalid phone or password. Please try again.');
        setLoading(false);
        return;
      }
      localStorage.setItem('ns_current_user', JSON.stringify(user));
      setLoading(false);
      onLogin(user, null);
    }, 600);
  };

  if (mode === 'success') {
    return (
      <div className="modal-overlay">
        <div className="modal-content" style={{ maxWidth: 360, textAlign: 'center', padding: '2.5rem 2rem' }}>
          <CheckCircle2 size={52} color="#16a34a" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Welcome to Namma Siri!</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Your business profile is being created...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: 460, padding: 0, overflow: 'hidden' }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #92400e, #b45309)', padding: '1.25rem 1.5rem', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem' }}>{mode === 'login' ? 'Seller Login' : 'Register Your Business'}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Namma Siri — Hubballi-Dharwad Women Entrepreneurs</div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={14} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
          {['login', 'register'].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); }}
              style={{
                flex: 1, padding: '0.75rem', fontSize: '0.875rem', fontWeight: 600,
                border: 'none', cursor: 'pointer',
                borderBottom: mode === m ? '2px solid var(--accent)' : '2px solid transparent',
                backgroundColor: 'transparent',
                color: mode === m ? 'var(--accent)' : 'var(--text-muted)'
              }}>
              {m === 'login' ? 'Login' : 'Register'}
            </button>
          ))}
        </div>

        <div style={{ padding: '1.25rem 1.5rem', maxHeight: '70vh', overflowY: 'auto' }}>
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.75rem', fontSize: '0.8125rem', color: '#b91c1c', marginBottom: '0.875rem' }}>
              {error}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin}>
              <InputField label="Phone Number" type="tel" value={form.phone} onChange={v => set('phone', v)} placeholder="+91 98451 00000" required icon={Phone} />
              <InputField label="Password" type="password" value={form.password} onChange={v => set('password', v)} placeholder="Enter password" required icon={Lock} />

              <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginBottom: '1rem', padding: '0.6rem 0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
                  1-Click Quick Demo Login:
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(f => ({ ...f, phone: '9845123456', password: 'password123' }));
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                  >
                    🌸 Lakshmi Home Foods (Vidyanagar)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(f => ({ ...f, phone: '9845234567', password: 'password123' }));
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                  >
                    🧵 Radha Kasuti Kendra (Keshwapur)
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                {loading ? 'Logging in...' : 'Login to Seller Hub'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 0.75rem' }}>
                <InputField label="Your Full Name" value={form.fullName} onChange={v => set('fullName', v)} placeholder="Lakshmi Patil" required icon={User} />
                <InputField label="Business Name" value={form.businessName} onChange={v => set('businessName', v)} placeholder="Lakshmi Home Foods" required icon={Store} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 0.75rem' }}>
                <InputField label="Phone" type="tel" value={form.phone} onChange={v => set('phone', v)} placeholder="+91 98451 00000" required icon={Phone} />
                <InputField label="Email (optional)" type="email" value={form.email} onChange={v => set('email', v)} placeholder="you@email.com" icon={Mail} />
              </div>

              {/* Category */}
              <div style={{ marginBottom: '0.875rem' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                  Business Category <span style={{ color: 'var(--accent)' }}>*</span>
                </label>
                <select value={form.category} onChange={e => set('category', e.target.value)} required
                  style={{ width: '100%', padding: '0.5rem 0.75rem', fontSize: '0.875rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)', background: '#fff', boxSizing: 'border-box' }}>
                  <option value="">Select category...</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Location */}
              <div style={{ marginBottom: '0.875rem' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                  Location / Area <span style={{ color: 'var(--accent)' }}>*</span>
                </label>
                <select value={form.location} onChange={e => set('location', e.target.value)} required
                  style={{ width: '100%', padding: '0.5rem 0.75rem', fontSize: '0.875rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)', background: '#fff', boxSizing: 'border-box' }}>
                  <option value="">Select area...</option>
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: '0.875rem' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                  Business Description <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                  placeholder="Tell customers what you sell and what makes your products special..."
                  rows={2}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', fontSize: '0.875rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)', background: '#fff', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 0.75rem' }}>
                <InputField label="Password" type="password" value={form.password} onChange={v => set('password', v)} placeholder="Min. 6 characters" required icon={Lock} />
                <InputField label="Confirm Password" type="password" value={form.confirmPassword} onChange={v => set('confirmPassword', v)} placeholder="Repeat password" required icon={Lock} />
              </div>

              {/* GST disclaimer */}
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.75rem', marginBottom: '1rem', lineHeight: 1.45 }}>
                <strong>Note:</strong> GST registration is not required to create a profile. You remain responsible for complying with applicable tax laws.
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                {loading ? 'Creating your business...' : 'Register & Start Selling →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
