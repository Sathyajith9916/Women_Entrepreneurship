import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Megaphone, BarChart2, Facebook, Instagram, Plus, Info, ChevronRight, IndianRupee } from 'lucide-react';

const PLATFORMS = [
  { id: 'instagram', label: 'Instagram', icon: Instagram, color: '#E1306C' },
  { id: 'facebook', label: 'Facebook', icon: Facebook, color: '#1877F2' }
];

const DEMO_CAMPAIGNS = [
  {
    id: 'camp-1', name: 'Deepavali Holige Special',
    product: 'Deepavali Holige & Savoury Combo',
    budget: 500, dailyBudget: 100,
    location: 'Hubballi + Dharwad', radius: '10 km',
    startDate: '2026-10-28', endDate: '2026-11-05',
    platforms: ['instagram', 'facebook'],
    status: 'ACTIVE',
    metrics: { spent: 320, reach: 2840, clicks: 118, orders: 14, revenue: 3640 }
  }
];

function MetricBox({ label, value, sub }) {
  return (
    <div style={{ padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>{value}</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{label}</div>
      {sub && <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>{sub}</div>}
    </div>
  );
}

export default function MarketingAdsSection() {
  const { activeSeller } = useApp();
  const [campaigns, setCampaigns] = useState(DEMO_CAMPAIGNS);
  const [showNew, setShowNew] = useState(false);
  const [selected, setSelected] = useState(null);
  const [metaConnected] = useState(false); // In real app: check for Meta API credentials

  const [form, setForm] = useState({
    name: '', product: '', budget: '', dailyBudget: '',
    location: 'Hubballi + Dharwad', radius: '10',
    startDate: '', endDate: '',
    platforms: ['instagram', 'facebook'],
    cta: 'WhatsApp'
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const togglePlat = (id) => setForm(f => ({
    ...f,
    platforms: f.platforms.includes(id) ? f.platforms.filter(p => p !== id) : [...f.platforms, id]
  }));

  const handleCreate = (e) => {
    e.preventDefault();
    const newCamp = {
      id: `camp-${Date.now()}`,
      ...form,
      budget: parseFloat(form.budget) || 0,
      dailyBudget: parseFloat(form.dailyBudget) || 0,
      status: 'DRAFT',
      metrics: null
    };
    setCampaigns(c => [newCamp, ...c]);
    setShowNew(false);
    setForm({ name: '', product: '', budget: '', dailyBudget: '', location: 'Hubballi + Dharwad', radius: '10', startDate: '', endDate: '', platforms: ['instagram', 'facebook'], cta: 'WhatsApp' });
  };

  if (selected) {
    const camp = campaigns.find(c => c.id === selected);
    const roas = camp.metrics ? (camp.metrics.revenue / camp.metrics.spent).toFixed(1) : null;
    return (
      <div>
        <button onClick={() => setSelected(null)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.8125rem', marginBottom: '1rem', padding: 0 }}>
          ← Back to Campaigns
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem' }}>{camp.name}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{camp.product}</div>
          </div>
          <span style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, background: camp.status === 'ACTIVE' ? '#dcfce7' : '#f3f4f6', color: camp.status === 'ACTIVE' ? '#16a34a' : 'var(--text-muted)' }}>{camp.status}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
          <div style={{ padding: '0.6rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem' }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Platforms</div>
            <div style={{ fontWeight: 600 }}>{camp.platforms.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' + ')}</div>
          </div>
          <div style={{ padding: '0.6rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem' }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Location</div>
            <div style={{ fontWeight: 600 }}>{camp.location} ({camp.radius} km)</div>
          </div>
          <div style={{ padding: '0.6rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem' }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Budget</div>
            <div style={{ fontWeight: 600 }}>₹{camp.budget} total / ₹{camp.dailyBudget}/day</div>
          </div>
          <div style={{ padding: '0.6rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem' }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Duration</div>
            <div style={{ fontWeight: 600 }}>{camp.startDate} → {camp.endDate}</div>
          </div>
        </div>

        {camp.metrics ? (
          <>
            <div style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <BarChart2 size={14} color="var(--accent)" /> Campaign Performance
              <span style={{ fontSize: '0.7rem', fontWeight: 400, color: 'var(--text-muted)' }}>(demo data)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <MetricBox label="Amount Spent" value={`₹${camp.metrics.spent}`} />
              <MetricBox label="Reach" value={camp.metrics.reach.toLocaleString('en-IN')} sub="people saw this" />
              <MetricBox label="Clicks" value={camp.metrics.clicks} sub="link clicks" />
              <MetricBox label="Orders" value={camp.metrics.orders} sub="from this campaign" />
              <MetricBox label="Revenue" value={`₹${camp.metrics.revenue.toLocaleString('en-IN')}`} />
              <MetricBox label="ROAS" value={`${roas}x`} sub="return on ad spend" />
            </div>
          </>
        ) : (
          <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Campaign is in DRAFT. Connect Meta account and launch to see performance metrics.
          </div>
        )}

        {!metaConnected && (
          <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#fefce8', border: '1px solid #fde68a', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', color: '#92400e' }}>
            <strong>Connect Meta Account</strong> to publish this campaign to Instagram and Facebook. Meta Business credentials required.
            <div style={{ marginTop: '0.4rem' }}>
              <button className="btn btn-secondary btn-sm">Connect Meta Business Account</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Meta connection status */}
      <div style={{ marginBottom: '1rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: metaConnected ? '#f0fdf4' : '#fefce8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem' }}>
        <div>
          <strong style={{ color: metaConnected ? '#16a34a' : '#b45309' }}>
            {metaConnected ? '✓ Meta Account Connected' : 'Meta Account Not Connected'}
          </strong>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.775rem', marginTop: '0.1rem' }}>
            {metaConnected ? 'Ready to publish campaigns to Instagram & Facebook' : 'Connect to run real campaigns on Instagram & Facebook'}
          </div>
        </div>
        {!metaConnected && (
          <button className="btn btn-secondary btn-sm">Connect Account</button>
        )}
      </div>

      {/* Campaigns */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Campaigns ({campaigns.length})</div>
        <button onClick={() => setShowNew(s => !s)} className="btn btn-secondary btn-sm">
          <Plus size={13} /><span>New Campaign</span>
        </button>
      </div>

      {/* New campaign form */}
      {showNew && (
        <form onSubmit={handleCreate} style={{ marginBottom: '1rem', padding: '0.875rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)' }}>
          <div style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.75rem' }}>New Campaign</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {[
              { label: 'Campaign Name', k: 'name', placeholder: 'e.g. Deepavali Holige' },
              { label: 'Product / Offer', k: 'product', placeholder: 'e.g. Holige Box ₹250' },
              { label: 'Total Budget (₹)', k: 'budget', placeholder: '500', type: 'number' },
              { label: 'Daily Budget (₹)', k: 'dailyBudget', placeholder: '100', type: 'number' },
              { label: 'Start Date', k: 'startDate', type: 'date' },
              { label: 'End Date', k: 'endDate', type: 'date' },
            ].map(({ label, k, placeholder, type = 'text' }) => (
              <div key={k}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>{label}</label>
                <input type={type} value={form[k]} onChange={e => set(k, e.target.value)}
                  placeholder={placeholder} required
                  style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.8125rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>

          <div style={{ marginTop: '0.6rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.3rem' }}>Platforms</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {PLATFORMS.map(({ id, label, icon: Icon, color }) => (
                <button key={id} type="button" onClick={() => togglePlat(id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.35rem 0.6rem', border: `1px solid ${form.platforms.includes(id) ? color : 'var(--border-color)'}`, borderRadius: 'var(--radius-sm)', background: form.platforms.includes(id) ? `${color}15` : '#fff', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 600, color: form.platforms.includes(id) ? color : 'var(--text-muted)' }}>
                  <Icon size={13} /> {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
            <button type="submit" className="btn btn-primary btn-sm">Create Campaign Draft</button>
            <button type="button" onClick={() => setShowNew(false)} className="btn btn-secondary btn-sm">Cancel</button>
          </div>
        </form>
      )}

      {/* Campaign list */}
      {campaigns.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.875rem', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <Megaphone size={28} style={{ marginBottom: '0.5rem', opacity: 0.4 }} />
          <div>No campaigns yet. Create your first one above.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {campaigns.map(camp => (
            <div key={camp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: '#fff' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{camp.name}</div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                  {camp.platforms.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' + ')} • ₹{camp.budget} budget
                </div>
                {camp.metrics && (
                  <div style={{ fontSize: '0.72rem', color: '#16a34a', marginTop: '0.2rem' }}>
                    ₹{camp.metrics.spent} spent • {camp.metrics.orders} orders • ₹{camp.metrics.revenue} revenue
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <span style={{ padding: '0.15rem 0.5rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700, background: camp.status === 'ACTIVE' ? '#dcfce7' : '#f3f4f6', color: camp.status === 'ACTIVE' ? '#16a34a' : 'var(--text-muted)' }}>{camp.status}</span>
                <button onClick={() => setSelected(camp.id)} className="btn btn-secondary btn-sm">
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
