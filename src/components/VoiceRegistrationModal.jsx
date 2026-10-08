import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mic, Sparkles, CheckCircle2, X, Edit3, ArrowRight,
  Volume2, ShieldCheck, Phone, MapPin, Store, User, Tag, RefreshCw
} from 'lucide-react';

export function parseVoiceBusiness(transcript = '') {
  const lower = transcript.toLowerCase();

  let category = "Fashion & Textiles";
  let products = "Sarees";
  let businessName = "Radha Saree & Handloom";
  let defaultPrefix = "Saree & Handloom Studio";

  if (lower.match(/saree|handloom|textile|silk|kurti|dress|cloth/i)) {
    category = "Fashion & Textiles";
    products = "Sarees";
    defaultPrefix = "Saree & Handloom Studio";
  } else if (lower.match(/food|pickle|chutney|snacks|holige|sweet|bakery|masala|roti|papad/i)) {
    category = "Food & Homemade Products";
    products = "Dharwad Holige & Homemade Pickles";
    defaultPrefix = "Home Delights Kitchen";
  } else if (lower.match(/tailoring|stitching|blouse|fashion|boutique|alteration/i)) {
    category = "Tailoring & Fashion";
    products = "Custom Tailoring & Stitching";
    defaultPrefix = "Stitching & Boutique Studio";
  } else if (lower.match(/jewellery|jewelry|bangles|beads|necklace|earrings/i)) {
    category = "Jewellery & Accessories";
    products = "Handmade Jewellery & Accessories";
    defaultPrefix = "Craft & Jewellery Hub";
  } else if (lower.match(/embroidery|kasuti|handicraft|craft/i)) {
    category = "Kasuti / Embroidery";
    products = "Kasuti Embroidery Sarees & Kurtis";
    defaultPrefix = "Kasuti Art Studio";
  }

  // Locality matching
  const localities = [
    { key: 'keshwapur', display: 'Keshwapur, Hubballi' },
    { key: 'vidyanagar', display: 'Vidyanagar, Hubballi' },
    { key: 'dharwad', display: 'Dharwad' },
    { key: 'gokul road', display: 'Gokul Road, Hubballi' },
    { key: 'old hubballi', display: 'Old Hubballi' },
    { key: 'unkal', display: 'Unkal, Hubballi' },
    { key: 'navanagar', display: 'Navanagar, Hubballi' },
    { key: 'shirur park', display: 'Shirur Park, Hubballi' }
  ];

  let location = "Keshwapur, Hubballi";
  for (const loc of localities) {
    if (lower.includes(loc.key)) {
      location = loc.display;
      break;
    }
  }

  // Seller Name extraction
  let sellerName = "Radha";
  if (lower.includes("my name is")) {
    const parts = lower.split("my name is");
    if (parts[1]) {
      const w = parts[1].trim().split(" ")[0];
      if (w) sellerName = w.charAt(0).toUpperCase() + w.slice(1);
    }
  } else if (lower.includes("i am")) {
    const parts = lower.split("i am");
    if (parts[1]) {
      const words = parts[1].trim().split(" ");
      const candidate = words[0];
      if (candidate && !['doing', 'running', 'a', 'in', 'the'].includes(candidate.toLowerCase())) {
        sellerName = candidate.charAt(0).toUpperCase() + candidate.slice(1);
      }
    }
  }

  if (category === "Fashion & Textiles") {
    businessName = `${sellerName} Saree & Handloom`;
  } else if (category === "Food & Homemade Products") {
    businessName = `${sellerName} Home Foods & Sweets`;
  } else if (category === "Tailoring & Fashion") {
    businessName = `${sellerName} Tailoring & Boutique`;
  } else if (category === "Jewellery & Accessories") {
    businessName = `${sellerName} Creative Jewellery`;
  } else {
    businessName = `${sellerName} ${defaultPrefix}`;
  }

  return {
    sellerName,
    businessName,
    category,
    products,
    location,
    businessType: "Women-led Microbusiness",
    phone: "98XXXXXX21"
  };
}

export default function VoiceRegistrationModal({ onClose, onRegisterSuccess }) {
  const { loginUser } = useApp();

  // Steps: 1 = Recording, 2 = AI Parsing, 3 = Review, 4 = Success
  const [step, setStep] = useState(1);
  const [recordingState, setRecordingState] = useState('idle'); // 'idle' | 'recording' | 'done'
  const [transcript, setTranscript] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [timerCount, setTimerCount] = useState(0);

  // Default transcript preset option for quick demo
  const sampleTranscripts = [
    "I am doing Saree business in Keshwapur",
    "My name is Sunita and I make homemade Dharwad Holige and pickles in Vidyanagar",
    "I am doing tailoring and blouse stitching in Gokul Road Hubballi"
  ];

  const [selectedPreset, setSelectedPreset] = useState(sampleTranscripts[0]);
  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    products: '',
    location: '',
    businessType: '',
    sellerName: '',
    phone: ''
  });

  // Handle Start Speaking click
  const handleStartSpeaking = () => {
    setRecordingState('recording');
    setTimerCount(3);

    // Countdown timer
    const interval = setInterval(() => {
      setTimerCount(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate 2.8s audio capture
    setTimeout(() => {
      setRecordingState('done');
      setTranscript(selectedPreset);

      // Move to AI Auto-fill (Step 2) after 1.2s
      setTimeout(() => {
        setStep(2);
        const parsed = parseVoiceBusiness(selectedPreset);
        setFormData(parsed);

        // Move to Review (Step 3) after 1.8s
        setTimeout(() => {
          setStep(3);
        }, 1800);
      }, 1200);
    }, 2800);
  };

  const handleRegisterBusiness = () => {
    const sellerId = `seller-voice-${Date.now()}`;
    const newUser = {
      id: `user-${Date.now()}`,
      sellerId,
      fullName: formData.sellerName,
      businessName: formData.businessName,
      phone: formData.phone.replace(/X/g, '9'),
      email: `${formData.sellerName.toLowerCase()}@sakhi.market`,
      password: 'password123',
      category: formData.category,
      location: formData.location.split(',')[0],
      description: `Verified ${formData.businessType} offering ${formData.products}.`,
      registeredAt: new Date().toISOString()
    };

    const newSeller = {
      id: sellerId,
      name: formData.businessName,
      ownerName: formData.sellerName,
      category: formData.category,
      location: formData.location.split(',')[0],
      address: `${formData.location}`,
      phone: formData.phone.replace(/X/g, '9'),
      upiId: `${formData.sellerName.toLowerCase()}@upi`,
      description: `Welcome to ${formData.businessName}! We specialize in ${formData.products}. Registered via Sakhi Voice Assistant.`,
      workingHours: '9:00 AM - 7:00 PM',
      deliveryAvailable: true,
      pickupAvailable: true,
      status: 'OPEN',
      rating: 5.0,
      reviewsCount: 1,
      isNew: true
    };

    // Save locally
    const users = JSON.parse(localStorage.getItem('ns_users') || '[]');
    users.push(newUser);
    localStorage.setItem('ns_users', JSON.stringify(users));

    setStep(4);

    if (onRegisterSuccess) {
      onRegisterSuccess(newUser, newSeller);
    }
  };

  const handleFinishViewBusiness = () => {
    const users = JSON.parse(localStorage.getItem('ns_users') || '[]');
    const latestUser = users[users.length - 1];
    if (latestUser) {
      const sellerId = latestUser.sellerId;
      const latestSeller = {
        id: sellerId,
        name: formData.businessName || latestUser.businessName,
        ownerName: formData.sellerName || latestUser.fullName,
        category: formData.category,
        location: formData.location.split(',')[0],
        phone: latestUser.phone
      };
      loginUser(latestUser, latestSeller);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div
        className="modal-content"
        style={{
          maxWidth: 520,
          padding: 0,
          borderRadius: '1.25rem',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          boxShadow: '0 20px 40px rgba(190, 24, 93, 0.15)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div style={{
          background: 'linear-gradient(135deg, #be185d, #9d174d)',
          color: '#ffffff',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem'
            }}>
              🎙️
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
                Register with Voice
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                AI-Powered Registration for Sakhi Market
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: 30,
              height: 30,
              cursor: 'pointer',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', backgroundColor: '#fff0f3', minHeight: 380 }}>

          {/* STEP 1: VOICE RECORDING SIMULATION */}
          {step === 1 && (
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#881337', marginBottom: '0.35rem' }}>
                Tell us about your business
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#be185d', marginBottom: '1.25rem', fontWeight: 500 }}>
                Speak naturally in your own words. No typing required!
              </p>

              {/* Presets selection for testing demo */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #fbcfe8',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                marginBottom: '1.5rem',
                textAlign: 'left'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9d174d', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span>💡</span> Example voice prompt to simulate:
                </div>
                <select
                  value={selectedPreset}
                  onChange={e => setSelectedPreset(e.target.value)}
                  disabled={recordingState !== 'idle'}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #f472b6',
                    fontSize: '0.85rem',
                    backgroundColor: '#fff',
                    color: '#881337',
                    fontWeight: 600
                  }}
                >
                  {sampleTranscripts.map((t, idx) => (
                    <option key={idx} value={t}>"{t}"</option>
                  ))}
                </select>
              </div>

              {/* Animated Microphone Icon */}
              <div style={{ position: 'relative', display: 'inline-block', margin: '1rem 0 1.5rem' }}>
                <div style={{
                  width: 90,
                  height: 90,
                  borderRadius: '50%',
                  backgroundColor: recordingState === 'recording' ? '#be185d' : '#f472b6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: recordingState === 'recording'
                    ? '0 0 0 15px rgba(190, 24, 93, 0.25), 0 0 0 30px rgba(190, 24, 93, 0.1)'
                    : '0 8px 20px rgba(244, 114, 182, 0.4)',
                  transition: 'all 0.3s ease',
                  margin: '0 auto'
                }}>
                  <Mic size={42} className={recordingState === 'recording' ? 'animate-pulse' : ''} />
                </div>
              </div>

              {/* Recording Status & Waveform Indicator */}
              {recordingState === 'idle' && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <button
                    onClick={handleStartSpeaking}
                    className="btn btn-primary"
                    style={{
                      backgroundColor: '#be185d',
                      color: '#ffffff',
                      padding: '0.75rem 2rem',
                      fontSize: '1rem',
                      fontWeight: 800,
                      borderRadius: '2rem',
                      boxShadow: '0 4px 14px rgba(190, 24, 93, 0.35)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Mic size={18} />
                    <span>Start Speaking</span>
                  </button>
                </div>
              )}

              {recordingState === 'recording' && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: '#be185d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{
                      display: 'inline-block',
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: '#e11d48'
                    }}></span>
                    Listening... (00:0{timerCount})
                  </div>

                  {/* Waveform Pulse Visualizer */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    height: 24,
                    marginTop: '0.75rem'
                  }}>
                    {[16, 24, 12, 28, 20, 14, 26, 18].map((h, i) => (
                      <div
                        key={i}
                        style={{
                          width: 4,
                          height: h,
                          backgroundColor: '#be185d',
                          borderRadius: 2
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {recordingState === 'done' && transcript && (
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #f472b6',
                  borderRadius: '0.85rem',
                  padding: '1rem',
                  marginBottom: '1rem',
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9d174d' }}>Captured Audio Transcript:</span>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      backgroundColor: '#fce7f3',
                      color: '#be185d',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '1rem'
                    }}>
                      Simulated voice input
                    </span>
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#881337', fontStyle: 'italic' }}>
                    "{transcript}"
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: AI AUTO-FILL SIMULATION */}
          {step === 2 && (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                backgroundColor: '#fce7f3',
                color: '#be185d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                border: '2px solid #f472b6'
              }}>
                <Sparkles size={36} color="#be185d" />
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#881337', marginBottom: '0.5rem' }}>
                Understanding your business...
              </h3>

              <p style={{ fontSize: '0.85rem', color: '#be185d', marginBottom: '1.5rem' }}>
                AI is extracting business details, category, and location from your voice input.
              </p>

              {/* Animated processing tags */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                maxWidth: 320,
                margin: '0 auto',
                textAlign: 'left'
              }}>
                <div style={{
                  background: '#fff',
                  border: '1px solid #fbcfe8',
                  borderRadius: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.8125rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <CheckCircle2 size={16} color="#16a34a" />
                  <span>Categorizing: <strong>{formData.category || 'Fashion & Textiles'}</strong></span>
                </div>
                <div style={{
                  background: '#fff',
                  border: '1px solid #fbcfe8',
                  borderRadius: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.8125rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <CheckCircle2 size={16} color="#16a34a" />
                  <span>Locality Detected: <strong>{formData.location || 'Keshwapur, Hubballi'}</strong></span>
                </div>
                <div style={{
                  background: '#fff',
                  border: '1px solid #fbcfe8',
                  borderRadius: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.8125rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <CheckCircle2 size={16} color="#16a34a" />
                  <span>Entrepreneur Name: <strong>{formData.sellerName || 'Radha'}</strong></span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & EDIT */}
          {step === 3 && (
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#881337', margin: 0 }}>
                    Review Generated Business Profile
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#be185d' }}>
                    AI extracted these details from your voice.
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  style={{
                    background: isEditing ? '#be185d' : '#ffffff',
                    color: isEditing ? '#ffffff' : '#be185d',
                    border: '1px solid #be185d',
                    borderRadius: '0.5rem',
                    padding: '0.3rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <Edit3 size={13} />
                  <span>{isEditing ? 'Save Edits' : 'Edit Details'}</span>
                </button>
              </div>

              {/* Profile Review Card */}
              <div style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid #fbcfe8',
                borderRadius: '0.85rem',
                padding: '1.25rem',
                boxShadow: '0 4px 12px rgba(190, 24, 93, 0.06)',
                marginBottom: '1rem'
              }}>
                {/* Women-led badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  backgroundColor: '#fce7f3',
                  color: '#be185d',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.6rem',
                  borderRadius: '1rem',
                  marginBottom: '0.875rem'
                }}>
                  <ShieldCheck size={14} color="#be185d" />
                  <span>Women-Led Business Verified</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem 1rem' }}>
                  {/* Business Name */}
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9d174d', display: 'block', marginBottom: '0.2rem' }}>
                      BUSINESS NAME
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                        style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem', borderRadius: '0.4rem', border: '1px solid #f472b6' }}
                      />
                    ) : (
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#881337', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Store size={15} color="#be185d" />
                        <span>{formData.businessName}</span>
                      </div>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9d174d', display: 'block', marginBottom: '0.2rem' }}>
                      BUSINESS CATEGORY
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem', borderRadius: '0.4rem', border: '1px solid #f472b6' }}
                      />
                    ) : (
                      <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Tag size={14} color="#be185d" />
                        <span>{formData.category}</span>
                      </div>
                    )}
                  </div>

                  {/* Products */}
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9d174d', display: 'block', marginBottom: '0.2rem' }}>
                      PRODUCTS OFFERED
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.products}
                        onChange={e => setFormData({ ...formData, products: e.target.value })}
                        style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem', borderRadius: '0.4rem', border: '1px solid #f472b6' }}
                      />
                    ) : (
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563' }}>
                        {formData.products}
                      </div>
                    )}
                  </div>

                  {/* Business Location */}
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9d174d', display: 'block', marginBottom: '0.2rem' }}>
                      LOCATION
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.location}
                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                        style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem', borderRadius: '0.4rem', border: '1px solid #f472b6' }}
                      />
                    ) : (
                      <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <MapPin size={14} color="#be185d" />
                        <span>{formData.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Entrepreneur Name */}
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9d174d', display: 'block', marginBottom: '0.2rem' }}>
                      SELLER NAME
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.sellerName}
                        onChange={e => setFormData({ ...formData, sellerName: e.target.value })}
                        style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem', borderRadius: '0.4rem', border: '1px solid #f472b6' }}
                      />
                    ) : (
                      <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <User size={14} color="#be185d" />
                        <span>{formData.sellerName}</span>
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9d174d', display: 'block', marginBottom: '0.2rem' }}>
                      PHONE CONTACT
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem', borderRadius: '0.4rem', border: '1px solid #f472b6' }}
                      />
                    ) : (
                      <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Phone size={14} color="#be185d" />
                        <span>{formData.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{
                  marginTop: '0.875rem',
                  paddingTop: '0.65rem',
                  borderTop: '1px dashed #fbcfe8',
                  fontSize: '0.75rem',
                  color: '#9d174d',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  <Sparkles size={14} color="#be185d" />
                  <span>Business Type: <strong>{formData.businessType}</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setRecordingState('idle');
                  }}
                  className="btn btn-secondary"
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    borderColor: '#f472b6',
                    color: '#be185d',
                    fontSize: '0.85rem'
                  }}
                >
                  <RefreshCw size={14} />
                  <span>Re-record Voice</span>
                </button>

                <button
                  type="button"
                  onClick={handleRegisterBusiness}
                  className="btn btn-primary"
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    backgroundColor: '#be185d',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    boxShadow: '0 4px 12px rgba(190, 24, 93, 0.3)'
                  }}
                >
                  <span>Register My Business &rarr;</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS STATE */}
          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '1.5rem 0.5rem' }}>
              <div style={{
                width: 76,
                height: 76,
                borderRadius: '50%',
                backgroundColor: '#dcfce7',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                border: '3px solid #86efac',
                fontSize: '2rem'
              }}>
                🎉
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#166534', marginBottom: '0.5rem' }}>
                Your business is now registered!
              </h3>

              <p style={{ fontSize: '0.9rem', color: '#15803d', marginBottom: '1.5rem', fontWeight: 600 }}>
                Your Sakhi Market profile is ready for customers in Hubballi-Dharwad.
              </p>

              {/* Registered Profile Summary Box */}
              <div style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid #86efac',
                borderRadius: '0.85rem',
                padding: '1rem',
                marginBottom: '1.5rem',
                textAlign: 'left'
              }}>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#166534', marginBottom: '0.25rem' }}>
                  {formData.businessName}
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#374151' }}>
                  Owner: <strong>{formData.sellerName}</strong> • {formData.location}
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#4b5563', marginTop: '0.2rem' }}>
                  Category: <strong>{formData.category}</strong> ({formData.products})
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinishViewBusiness}
                className="btn btn-primary"
                style={{
                  backgroundColor: '#16a34a',
                  color: '#ffffff',
                  padding: '0.75rem 2rem',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  borderRadius: '2rem',
                  boxShadow: '0 4px 14px rgba(22, 163, 74, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>View My Business Dashboard &rarr;</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
