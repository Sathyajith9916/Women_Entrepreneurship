import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Megaphone, TrendingUp, Sparkles, Share2, Eye, ShoppingBag,
  CheckCircle2, AlertCircle, Copy, ExternalLink, Globe, Award,
  BarChart2, Zap, Tag, Instagram, Facebook, ArrowRight, ShieldCheck, X
} from 'lucide-react';

export default function MarketingAdsSection() {
  const { activeSeller, showToast } = useApp();

  // Local state for deterministic simulation
  const [visibilityScore, setVisibilityScore] = useState(68);
  const [campaignActive, setCampaignActive] = useState(false);
  const [metaSimulated, setMetaSimulated] = useState(false);
  const [internalFeatured, setInternalFeatured] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoadingLaunch, setIsLoadingLaunch] = useState(false);
  const [showAiCampaign, setShowAiCampaign] = useState(false);
  const [showWhatsappText, setShowWhatsappText] = useState(false);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);

  // Promotion Form State
  const [promoForm, setPromoForm] = useState({
    product: 'Kasuti Handloom Saree',
    audience: 'Festival shoppers',
    location: 'Hubballi + Dharwad',
    duration: '7 days',
    budget: '250'
  });

  // Metrics State
  const [metrics, setMetrics] = useState({
    reach: 1240,
    views: 318,
    clicks: 14,
    productVisits: 28,
    orders: 7,
    conversion: '5.6%',
    revenue: 19600,
    adSpend: 0
  });

  const handleLaunchPromotion = () => {
    setIsLoadingLaunch(true);
    setTimeout(() => {
      setIsLoadingLaunch(false);
      setCampaignActive(true);
      setVisibilityScore(86);
      setMetrics({
        reach: 5740,
        views: 3820,
        clicks: 184,
        productVisits: 96,
        orders: 12,
        conversion: '12.5%',
        revenue: 33600,
        adSpend: Number(promoForm.budget) || 250
      });
      setShowCreateModal(false);
      showToast('✓ Promotion is Live! Reach expanded to +4,500 local customers.', 'success');
    }, 1000);
  };

  const handleSimulateMeta = () => {
    setMetaSimulated(true);
    showToast('✓ Meta Campaign Submitted (Simulation). Ad ready for review.', 'info');
  };

  const handleFeatureProduct = () => {
    setInternalFeatured(true);
    showToast('✓ Product Featured in Hubballi recommendations!', 'success');
  };

  const whatsappMessageText = `🪷 NEW FROM ${activeSeller?.name?.toUpperCase() || 'RADHA KASUTI KENDRA'}

Handcrafted Kasuti Sarees - ₹2,800
Traditional local craftsmanship from Hubballi.

🛍️ Available now on Sakhi Market: https://nammasiri.hubballi/s/${activeSeller?.id || 'seller-2'}`;

  const handleCopyWhatsapp = () => {
    navigator.clipboard.writeText(whatsappMessageText);
    setCopiedWhatsapp(true);
    showToast('Message copied to clipboard!', 'info');
    setTimeout(() => setCopiedWhatsapp(false), 2000);
  };

  const handleShareWhatsapp = () => {
    const text = encodeURIComponent(whatsappMessageText);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    showToast('Opened WhatsApp sharing!', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* HEADER TITLE */}
      <div style={{
        background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
        border: '1.5px solid #fecdd3',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#be185d', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>
            <Megaphone size={14} /> Sakhi Growth Suite
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#881337', margin: '0.2rem 0' }}>
            📣 Sakhi Growth & Marketing
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#be185d', margin: 0, fontWeight: 500 }}>
            Reach more customers without needing to know digital marketing.
          </p>
        </div>

        <button
          onClick={() => {
            const el = document.getElementById('promote-product-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="btn btn-primary"
          style={{
            backgroundColor: '#be185d',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '0.85rem',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '0.5rem'
          }}
        >
          🚀 Promote Product &rarr;
        </button>
      </div>

      {/* 1. VISIBILITY SCORE CARD */}
      <div className="card" style={{ padding: '1.25rem', border: '1.5px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Your Business Visibility
            </h3>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Calculated based on listing optimization & local promotion reach
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 900, color: visibilityScore >= 80 ? '#16a34a' : '#be185d' }}>
              {visibilityScore}
            </span>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-subtle)' }}> / 100</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ height: 12, backgroundColor: '#f1f5f9', borderRadius: 6, overflow: 'hidden', marginBottom: '1rem' }}>
          <div style={{
            width: `${visibilityScore}%`,
            height: '100%',
            background: visibilityScore >= 80 ? 'linear-gradient(90deg, #22c55e, #16a34a)' : 'linear-gradient(90deg, #f472b6, #be185d)',
            borderRadius: 6,
            transition: 'width 0.6s ease'
          }} />
        </div>

        {/* Visibility Factors */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: '#166534', fontWeight: 600 }}>
            <CheckCircle2 size={16} color="#16a34a" /> Business profile complete
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: '#166534', fontWeight: 600 }}>
            <CheckCircle2 size={16} color="#16a34a" /> 3 products listed
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: '#166534', fontWeight: 600 }}>
            <CheckCircle2 size={16} color="#16a34a" /> Festival campaign available
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: campaignActive ? '#166534' : '#b45309', fontWeight: 600 }}>
            {campaignActive ? <CheckCircle2 size={16} color="#16a34a" /> : <AlertCircle size={16} color="#d97706" />}
            {campaignActive ? 'Social promotion active' : 'Social promotion not active'}
          </div>
        </div>

        {/* Recommendation */}
        <div style={{
          background: '#fff1f2',
          border: '1px solid #fecdd3',
          borderRadius: '0.65rem',
          padding: '0.85rem 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#881337', fontWeight: 600 }}>
            💡 <strong>Recommendation:</strong> Promoting your business could help you reach more local customers.
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary btn-sm"
            style={{ backgroundColor: '#be185d', color: '#ffffff', fontWeight: 800, border: 'none' }}
          >
            Improve Visibility &rarr;
          </button>
        </div>
      </div>

      {/* 2. PROMOTE A PRODUCT */}
      <div id="promote-product-section" className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              🚀 Promote Your Product
            </h3>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Select a product to boost reach across Hubballi-Dharwad
            </div>
          </div>

          {campaignActive && (
            <span className="badge badge-open" style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}>
              🟢 ACTIVE CAMPAIGN
            </span>
          )}
        </div>

        {/* Product Card Showcase */}
        <div style={{
          border: '1.5px solid var(--border-color)',
          borderRadius: '0.85rem',
          padding: '1.15rem',
          background: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <span className="badge badge-neutral" style={{ fontSize: '0.7rem', marginBottom: '0.3rem' }}>
              Kasuti / Embroidery
            </span>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0' }}>
              Kasuti Handloom Saree
            </h4>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#be185d' }}>
              ₹2,800 <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontWeight: 400 }}>/ 1 Saree</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
              Proprietor: {activeSeller?.ownerName || 'Radha Kulkarni'} • {activeSeller?.location || 'Keshwapur, Hubballi'}
            </div>
          </div>

          {/* Current Stats */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center', background: '#fafafa', border: '1px solid var(--border-color)', padding: '0.5rem 0.85rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>REACH</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>{metrics.reach.toLocaleString()}</div>
            </div>
            <div style={{ textAlign: 'center', background: '#fafafa', border: '1px solid var(--border-color)', padding: '0.5rem 0.85rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>VIEWS</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>{metrics.views.toLocaleString()}</div>
            </div>
            <div style={{ textAlign: 'center', background: '#fafafa', border: '1px solid var(--border-color)', padding: '0.5rem 0.85rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>ORDERS</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#16a34a' }}>{metrics.orders}</div>
            </div>
          </div>

          <div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary"
              style={{
                backgroundColor: '#be185d',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.9rem',
                padding: '0.6rem 1.25rem',
                border: 'none',
                boxShadow: '0 4px 12px rgba(190, 24, 93, 0.25)'
              }}
            >
              Create Promotion &rarr;
            </button>
          </div>
        </div>

        {/* Active Campaign Info Box if active */}
        {campaignActive && (
          <div style={{
            marginTop: '1rem',
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '0.75rem',
            padding: '1rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '0.75rem',
            fontSize: '0.8125rem'
          }}>
            <div><span style={{ color: '#166534', fontWeight: 600 }}>Status:</span> <strong>🟢 ACTIVE</strong></div>
            <div><span style={{ color: '#166534', fontWeight: 600 }}>Platform:</span> <strong>Sakhi + Meta Ads</strong></div>
            <div><span style={{ color: '#166534', fontWeight: 600 }}>Duration:</span> <strong>{promoForm.duration}</strong></div>
            <div><span style={{ color: '#166534', fontWeight: 600 }}>Budget:</span> <strong>₹{promoForm.budget}</strong></div>
            <div><span style={{ color: '#166534', fontWeight: 600 }}>Target:</span> <strong>{promoForm.location}</strong></div>
            <div><span style={{ color: '#166534', fontWeight: 600 }}>Clicks:</span> <strong>{metrics.clicks}</strong></div>
            <div><span style={{ color: '#166534', fontWeight: 600 }}>Orders:</span> <strong>{metrics.orders}</strong></div>
          </div>
        )}
      </div>

      {/* 5. META ADS SIMULATION & 6. INTERNAL PROMOTION */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>

        {/* META ADS SIMULATION CARD */}
        <div className="card" style={{ padding: '1.25rem', border: '1.5px solid #bfdbfe' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#1d4ed8', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            <Globe size={14} /> Reach Beyond Sakhi Market
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e3a8a', margin: '0.2rem 0' }}>
            Promote on Meta (Instagram & Facebook)
          </h3>
          <p style={{ fontSize: '0.8125rem', color: '#3b82f6', marginBottom: '1rem', lineHeight: 1.4 }}>
            Sakhi can help entrepreneurs create campaigns for platforms such as Instagram and Facebook.
          </p>

          {/* SIMULATED AD PREVIEW BOX */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '0.75rem',
            padding: '0.875rem',
            marginBottom: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', fontSize: '0.75rem' }}>
              <span style={{ color: '#64748b', fontWeight: 600 }}>Sponsored Ad Preview</span>
              <span style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: '0.3rem' }}>
                Meta Demo
              </span>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.5rem' }}>
              <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#0f172a' }}>
                {activeSeller?.name || 'Radha Kasuti Kendra'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.4rem' }}>
                Sponsored • Hubballi
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#be185d', marginBottom: '0.2rem' }}>
                🪷 Handcrafted Kasuti Sarees
              </div>
              <div style={{ fontSize: '0.78rem', color: '#334155', marginBottom: '0.6rem', lineHeight: 1.35 }}>
                Traditional craftsmanship. Made locally in Hubballi. Premium authentic silk.
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '0.4rem 0.6rem', borderRadius: '0.4rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>₹2,800</span>
                <span style={{ background: '#1877f2', color: '#fff', fontSize: '0.72rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '0.3rem' }}>
                  Shop Now
                </span>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.78rem', color: '#475569', marginBottom: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <div>• Objective: <strong>Get more customers</strong></div>
            <div>• Target Audience: <strong>People within Hubballi-Dharwad</strong></div>
            <div>• Budget: <strong>₹250</strong></div>
          </div>

          {metaSimulated ? (
            <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '0.5rem', padding: '0.6rem 0.75rem', fontSize: '0.8125rem', color: '#166534', fontWeight: 700 }}>
              ✓ Meta campaign created (Simulation)
              <div style={{ fontSize: '0.72rem', fontWeight: 400, color: '#15803d', marginTop: '0.15rem' }}>
                Your advertisement would now be submitted to Meta for review.
              </div>
              <div style={{ fontSize: '0.68rem', color: '#166534', fontStyle: 'italic', marginTop: '0.3rem' }}>
                Simulation only — no real ad was created or charged.
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={handleSimulateMeta}
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center', borderColor: '#3b82f6', color: '#1d4ed8', fontWeight: 800, fontSize: '0.85rem' }}
              >
                <span>Simulate Meta Campaign</span>
              </button>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textAlign: 'center', marginTop: '0.3rem' }}>
                Simulation only — no real Meta connection required
              </div>
            </div>
          )}
        </div>

        {/* INTERNAL SAKHI MARKET PROMOTION CARD */}
        <div className="card" style={{ padding: '1.25rem', border: '1.5px solid #fbcfe8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#be185d', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            <Award size={14} /> Marketplace Boost
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#881337', margin: '0.2rem 0' }}>
            🏪 Promote inside Sakhi Market
          </h3>
          <p style={{ fontSize: '0.8125rem', color: '#be185d', marginBottom: '1rem', lineHeight: 1.4 }}>
            Get your products featured at the top of customer search and category feeds across Hubballi-Dharwad.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.8125rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#166534', fontWeight: 600 }}>
              <CheckCircle2 size={15} color="#16a34a" /> Featured seller placement
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#166534', fontWeight: 600 }}>
              <CheckCircle2 size={15} color="#16a34a" /> Festival collection banner
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#166534', fontWeight: 600 }}>
              <CheckCircle2 size={15} color="#16a34a" /> Trending near you feed
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#166534', fontWeight: 600 }}>
              <CheckCircle2 size={15} color="#16a34a" /> Recommended products highlight
            </div>
          </div>

          <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '0.5rem', padding: '0.65rem 0.85rem', marginBottom: '1rem', fontSize: '0.8125rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Featured in Hubballi</span>
            <strong>~2,800 impressions</strong>
          </div>

          {internalFeatured ? (
            <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '0.5rem', padding: '0.65rem 0.85rem', fontSize: '0.8125rem', color: '#166534', fontWeight: 700 }}>
              ✓ Product featured successfully
              <div style={{ fontSize: '0.72rem', fontWeight: 400, color: '#15803d', marginTop: '0.15rem' }}>
                Your product will appear in recommended/featured sections.
              </div>
            </div>
          ) : (
            <button
              onClick={handleFeatureProduct}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', backgroundColor: '#be185d', color: '#ffffff', fontWeight: 800, fontSize: '0.85rem', border: 'none' }}
            >
              Feature My Product &rarr;
            </button>
          )}
        </div>

      </div>

      {/* 7. WHATSAPP SHARING & 9. AI MARKETING ASSISTANT */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>

        {/* WHATSAPP SHARING */}
        <div className="card" style={{ padding: '1.25rem', border: '1.5px solid #bbf7d0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#16a34a', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            <Share2 size={14} /> Instant Customer Outreach
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#14532d', margin: '0.2rem 0' }}>
            💬 Share on WhatsApp
          </h3>
          <p style={{ fontSize: '0.8125rem', color: '#16a34a', marginBottom: '1rem' }}>
            Reach your existing customers and WhatsApp community directly.
          </p>

          {!showWhatsappText ? (
            <button
              onClick={() => setShowWhatsappText(true)}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center', borderColor: '#22c55e', color: '#16a34a', fontWeight: 800, fontSize: '0.85rem' }}
            >
              Generate WhatsApp Promotion &rarr;
            </button>
          ) : (
            <div>
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '0.5rem',
                padding: '0.85rem',
                fontSize: '0.8125rem',
                color: '#14532d',
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
                marginBottom: '0.875rem'
              }}>
                {whatsappMessageText}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={handleCopyWhatsapp}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}
                >
                  <Copy size={13} />
                  <span>{copiedWhatsapp ? 'Copied!' : 'Copy Message'}</span>
                </button>
                <button
                  onClick={handleShareWhatsapp}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1, justifyContent: 'center', backgroundColor: '#16a34a', fontSize: '0.8rem' }}
                >
                  <Share2 size={13} />
                  <span>Share on WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 9. AI MARKETING ASSISTANT SIMULATION */}
        <div className="card" style={{ padding: '1.25rem', border: '1.5px solid #fbcfe8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#be185d', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            <Sparkles size={14} /> Automated Promotion Engine
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#881337', margin: '0.2rem 0' }}>
            ✨ Sakhi Marketing Assistant
          </h3>
          <p style={{ fontSize: '0.8125rem', color: '#be185d', marginBottom: '1rem' }}>
            Let Sakhi create your promotion automatically using smart business templates.
          </p>

          {!showAiCampaign ? (
            <button
              onClick={() => setShowAiCampaign(true)}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', backgroundColor: '#be185d', border: 'none', fontWeight: 800, fontSize: '0.85rem' }}
            >
              <Sparkles size={14} />
              <span>Generate Campaign &rarr;</span>
            </button>
          ) : (
            <div style={{
              background: '#fff1f2',
              border: '1px solid #fecdd3',
              borderRadius: '0.65rem',
              padding: '0.85rem',
              fontSize: '0.8125rem',
              color: '#881337'
            }}>
              <div style={{ fontWeight: 800, color: '#be185d', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Sparkles size={14} /> AI Suggested Campaign:
              </div>
              <div style={{ marginBottom: '0.3rem' }}>• <strong>Headline:</strong> "Handcrafted Kasuti Sarees from Hubballi"</div>
              <div style={{ marginBottom: '0.3rem' }}>• <strong>Description:</strong> "Discover beautiful traditional Kasuti craftsmanship made by local women entrepreneurs."</div>
              <div style={{ marginBottom: '0.3rem' }}>• <strong>Audience:</strong> "Women shoppers + festival shoppers in Hubballi-Dharwad"</div>
              <div style={{ marginBottom: '0.3rem' }}>• <strong>Platform:</strong> "Instagram + Sakhi Market"</div>
              <div style={{ marginBottom: '0.6rem' }}>• <strong>Budget:</strong> "₹250 for 7 days"</div>

              <button
                onClick={() => {
                  setShowCreateModal(true);
                  setShowAiCampaign(false);
                }}
                className="btn btn-primary btn-sm"
                style={{ width: '100%', justifyContent: 'center', backgroundColor: '#be185d', fontSize: '0.78rem' }}
              >
                Apply AI Campaign Settings &rarr;
              </button>
            </div>
          )}
        </div>

      </div>

      {/* 8. MARKETING ANALYTICS */}
      <div className="card" style={{ padding: '1.25rem', border: '1.5px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <BarChart2 size={18} color="var(--accent)" /> Campaign Performance Analytics
        </h3>

        {/* Analytics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.75rem',
          marginBottom: '1.25rem'
        }}>
          <div style={{ background: '#fafafa', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.65rem 0.75rem' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>REACH</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>{metrics.reach.toLocaleString()}</div>
          </div>
          <div style={{ background: '#fafafa', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.65rem 0.75rem' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>VIEWS</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>{metrics.views.toLocaleString()}</div>
          </div>
          <div style={{ background: '#fafafa', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.65rem 0.75rem' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>CLICKS</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#be185d' }}>{metrics.clicks}</div>
          </div>
          <div style={{ background: '#fafafa', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.65rem 0.75rem' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>PRODUCT VISITS</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>{metrics.productVisits}</div>
          </div>
          <div style={{ background: '#fafafa', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.65rem 0.75rem' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>ORDERS</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#16a34a' }}>{metrics.orders}</div>
          </div>
          <div style={{ background: '#fafafa', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.65rem 0.75rem' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>CONVERSION</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#16a34a' }}>{metrics.conversion}</div>
          </div>
          <div style={{ background: '#fafafa', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.65rem 0.75rem' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>REVENUE</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#16a34a' }}>₹{metrics.revenue.toLocaleString()}</div>
          </div>
          <div style={{ background: '#fafafa', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.65rem 0.75rem' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>AD SPEND</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#be185d' }}>₹{metrics.adSpend}</div>
          </div>
        </div>

        {/* Visual Comparison Card (BEFORE vs AFTER) */}
        <div style={{
          background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
          border: '1px solid #cbd5e1',
          borderRadius: '0.75rem',
          padding: '1rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem'
        }}>
          <div style={{ background: '#fff', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>BEFORE PROMOTION</div>
            <div style={{ fontSize: '0.9rem', color: '#334155', marginTop: '0.2rem' }}>Reach: <strong>1,240 people</strong></div>
            <div style={{ fontSize: '0.9rem', color: '#334155' }}>Orders: <strong>7 orders</strong></div>
          </div>
          <div style={{ background: '#fff1f2', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #fecdd3' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#be185d', textTransform: 'uppercase' }}>AFTER PROMOTION</div>
            <div style={{ fontSize: '0.9rem', color: '#881337', marginTop: '0.2rem' }}>Reach: <strong>5,740 people (+362%)</strong></div>
            <div style={{ fontSize: '0.9rem', color: '#881337' }}>Orders: <strong>12 orders (+71%)</strong></div>
          </div>
        </div>
      </div>

      {/* 10. GROWTH MESSAGE */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid #cbd5e1',
        borderRadius: '0.85rem',
        padding: '1.25rem',
        fontSize: '0.85rem'
      }}>
        <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
          Why Sakhi Growth matters
        </div>
        <div style={{ color: '#475569', marginBottom: '0.75rem', lineHeight: 1.45 }}>
          Traditional problem: <em>"I make good products, but customers don't know I exist."</em><br />
          Sakhi solution: <strong>Create → Promote → Reach → Sell → Grow</strong>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0.5rem',
          fontWeight: 700,
          color: '#1e293b'
        }}>
          <div>📍 Local discovery</div>
          <div>📣 Digital promotion</div>
          <div>📱 Social media reach</div>
          <div>🛍️ More product visibility</div>
          <div>📈 Business growth</div>
        </div>
      </div>

      {/* CREATE PROMOTION MODAL SIMULATION */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)} style={{ zIndex: 1100 }}>
          <div
            className="modal-content"
            style={{ maxWidth: 480, padding: 0, overflow: 'hidden', borderRadius: '1.15rem' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #be185d, #9d174d)', padding: '1.25rem 1.5rem', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Create Your Promotion</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Sakhi Local & Social Reach Campaign</div>
              </div>
              <button onClick={() => setShowCreateModal(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={14} />
              </button>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#ffffff' }}>
              {isLoadingLaunch ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div className="animate-spin" style={{ width: 44, height: 44, border: '4px solid #fecdd3', borderTopColor: '#be185d', borderRadius: '50%', margin: '0 auto 1rem' }} />
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#881337' }}>Creating your campaign...</div>
                  <div style={{ fontSize: '0.85rem', color: '#be185d', marginTop: '0.2rem' }}>Targeting Hubballi-Dharwad local shoppers</div>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); handleLaunchPromotion(); }}>

                  {/* Step 1: Select Product */}
                  <div style={{ marginBottom: '0.875rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                      Step 1: Select Product
                    </label>
                    <input
                      type="text"
                      value={promoForm.product}
                      onChange={e => setPromoForm({ ...promoForm, product: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem 0.75rem', fontSize: '0.875rem', border: '1px solid var(--border-color)', borderRadius: '0.4rem', boxSizing: 'border-box' }}
                    />
                  </div>

                  {/* Step 2: Choose Target Audience */}
                  <div style={{ marginBottom: '0.875rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                      Step 2: Choose Target Audience
                    </label>
                    <select
                      value={promoForm.audience}
                      onChange={e => setPromoForm({ ...promoForm, audience: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem 0.75rem', fontSize: '0.875rem', border: '1px solid var(--border-color)', borderRadius: '0.4rem', boxSizing: 'border-box' }}
                    >
                      <option value="Festival shoppers">Festival shoppers (Recommended)</option>
                      <option value="Local customers">Local customers</option>
                      <option value="Women shoppers">Women shoppers</option>
                      <option value="All nearby customers">All nearby customers</option>
                    </select>
                  </div>

                  {/* Step 3: Location */}
                  <div style={{ marginBottom: '0.875rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                      Step 3: Choose Location
                    </label>
                    <select
                      value={promoForm.location}
                      onChange={e => setPromoForm({ ...promoForm, location: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem 0.75rem', fontSize: '0.875rem', border: '1px solid var(--border-color)', borderRadius: '0.4rem', boxSizing: 'border-box' }}
                    >
                      <option value="Hubballi + Dharwad">Hubballi + Dharwad</option>
                      <option value="Keshwapur & Vidyanagar">Keshwapur & Vidyanagar</option>
                      <option value="Gokul Road & Shirur Park">Gokul Road & Shirur Park</option>
                    </select>
                  </div>

                  {/* Step 4 & 5: Duration & Budget */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                        Step 4: Duration
                      </label>
                      <select
                        value={promoForm.duration}
                        onChange={e => setPromoForm({ ...promoForm, duration: e.target.value })}
                        style={{ width: '100%', padding: '0.5rem 0.75rem', fontSize: '0.875rem', border: '1px solid var(--border-color)', borderRadius: '0.4rem', boxSizing: 'border-box' }}
                      >
                        <option value="3 days">3 days</option>
                        <option value="7 days">7 days (Default)</option>
                        <option value="14 days">14 days</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                        Step 5: Budget
                      </label>
                      <select
                        value={promoForm.budget}
                        onChange={e => setPromoForm({ ...promoForm, budget: e.target.value })}
                        style={{ width: '100%', padding: '0.5rem 0.75rem', fontSize: '0.875rem', border: '1px solid var(--border-color)', borderRadius: '0.4rem', boxSizing: 'border-box' }}
                      >
                        <option value="100">₹100</option>
                        <option value="250">₹250 (Default)</option>
                        <option value="500">₹500</option>
                      </select>
                    </div>
                  </div>

                  {/* Estimated Reach Preview Box */}
                  <div style={{
                    background: '#fff1f2',
                    border: '1px solid #fecdd3',
                    borderRadius: '0.65rem',
                    padding: '0.85rem',
                    marginBottom: '1.25rem',
                    fontSize: '0.8125rem'
                  }}>
                    <div style={{ fontWeight: 800, color: '#881337', marginBottom: '0.35rem' }}>Estimated Reach</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#be185d', marginBottom: '0.2rem' }}>
                      <span>Before promotion:</span> <strong>1,240</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#be185d', marginBottom: '0.2rem' }}>
                      <span>Estimated additional reach:</span> <strong>+4,500</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#881337', fontWeight: 800, borderTop: '1px dashed #f472b6', paddingTop: '0.35rem', marginTop: '0.35rem' }}>
                      <span>Estimated total reach:</span> <strong>5,740 people</strong>
                    </div>

                    <div style={{ fontSize: '0.7rem', color: '#9d174d', marginTop: '0.5rem', fontStyle: 'italic' }}>
                      Demo estimate — actual results depend on campaign performance.
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      backgroundColor: '#be185d',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      padding: '0.7rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(190, 24, 93, 0.3)'
                    }}
                  >
                    🚀 Launch Promotion &rarr;
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
