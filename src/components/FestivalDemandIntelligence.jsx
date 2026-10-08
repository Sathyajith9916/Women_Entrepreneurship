import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles, TrendingUp, Calendar, AlertTriangle, CheckCircle2,
  Package, Truck, ArrowRight, X, Clock, ShoppingBag, ShieldCheck,
  Zap, ChevronRight, Layers, MapPin
} from 'lucide-react';

export default function FestivalDemandIntelligence() {
  const { festivalDemandState, updateFestivalDemandState, showToast } = useApp();

  const [showPrepareModal, setShowPrepareModal] = useState(false);
  const [showPreOrderModal, setShowPreOrderModal] = useState(false);
  const [additionalStockInput, setAdditionalStockInput] = useState(45);
  const [prepareSuccessMsg, setPrepareSuccessMsg] = useState('');
  const [preOrderSuccessMsg, setPreOrderSuccessMsg] = useState('');

  const handleConfirmPrepare = (e) => {
    e.preventDefault();
    const addedUnits = Number(additionalStockInput) || 45;
    const newCapacity = 75 + addedUnits;

    updateFestivalDemandState({
      inventoryCapacity: newCapacity,
      potentialShortfall: Math.max(0, 120 - newCapacity),
      inventoryPrepared: true
    });

    setPrepareSuccessMsg(`✓ Inventory plan created — ${addedUnits} additional units planned for Dasara.`);
    showToast(`Inventory plan updated to ${newCapacity} units capacity!`, 'success');
  };

  const handleLaunchCampaign = () => {
    updateFestivalDemandState({
      campaignLaunched: true,
      preOrdersCount: 18
    });

    setPreOrderSuccessMsg("✓ Pre-order campaign launched — Customers can now reserve this product before the festival.");
    showToast("Dasara Pre-order campaign launched for customers!", 'success');
  };

  return (
    <div
      id="festival-demand-intelligence-card"
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-md)',
        border: '1.5px solid #fbcfe8',
        boxShadow: '0 4px 16px rgba(190, 24, 93, 0.08)',
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.25rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #fce7f3'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{
              backgroundColor: '#fce7f3',
              color: '#be185d',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '0.2rem 0.6rem',
              borderRadius: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              <span>🪔</span> DASARA 2026 FORECAST
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              • 12 days remaining
            </span>
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#881337', margin: '0.2rem 0' }}>
            🪔 Festival Demand Intelligence
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#be185d', margin: 0, fontWeight: 500 }}>
            Prepare your business before local festival demand increases.
          </p>
        </div>

        {/* Status Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {festivalDemandState.inventoryPrepared && (
            <span className="badge badge-open" style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}>
              ✓ Capacity Planned (120 Units)
            </span>
          )}
          {festivalDemandState.campaignLaunched && (
            <span className="badge badge-accent" style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}>
              🪔 Pre-Orders Active ({festivalDemandState.preOrdersCount} Received)
            </span>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        {/* Metric 1 */}
        <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '0.75rem', padding: '0.85rem' }}>
          <div style={{ fontSize: '0.72rem', color: '#9d174d', fontWeight: 700 }}>DAYS REMAINING</div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#be185d', marginTop: '0.2rem' }}>
            {festivalDemandState.daysRemaining} days
          </div>
          <div style={{ fontSize: '0.7rem', color: '#881337' }}>Dasara Festival Spike</div>
        </div>

        {/* Metric 2 */}
        <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '0.75rem', padding: '0.85rem' }}>
          <div style={{ fontSize: '0.72rem', color: '#9d174d', fontWeight: 700 }}>DEMAND FORECAST</div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#be185d', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <TrendingUp size={18} color="#be185d" />
            <span>+{festivalDemandState.demandForecastPct}%</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#881337' }}>Hubballi-Dharwad market</div>
        </div>

        {/* Metric 3 */}
        <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '0.75rem', padding: '0.85rem' }}>
          <div style={{ fontSize: '0.72rem', color: '#9d174d', fontWeight: 700 }}>EXPECTED ORDERS</div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#881337', marginTop: '0.2rem' }}>
            {festivalDemandState.expectedOrders}
          </div>
          <div style={{ fontSize: '0.7rem', color: '#9d174d' }}>Forecasted customer demand</div>
        </div>

        {/* Metric 4 */}
        <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '0.75rem', padding: '0.85rem' }}>
          <div style={{ fontSize: '0.72rem', color: '#9d174d', fontWeight: 700 }}>SELLER CAPACITY</div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: festivalDemandState.inventoryPrepared ? '#166534' : '#881337', marginTop: '0.2rem' }}>
            {festivalDemandState.inventoryCapacity}
          </div>
          <div style={{ fontSize: '0.7rem', color: '#9d174d' }}>
            {festivalDemandState.inventoryPrepared ? '✓ Cover expected demand' : '75 current units'}
          </div>
        </div>

        {/* Metric 5 */}
        <div style={{ background: festivalDemandState.potentialShortfall > 0 ? '#fef2f2' : '#f0fdf4', border: `1px solid ${festivalDemandState.potentialShortfall > 0 ? '#fecaca' : '#bbf7d0'}`, borderRadius: '0.75rem', padding: '0.85rem' }}>
          <div style={{ fontSize: '0.72rem', color: festivalDemandState.potentialShortfall > 0 ? '#991b1b' : '#166534', fontWeight: 700 }}>POTENTIAL SHORTFALL</div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: festivalDemandState.potentialShortfall > 0 ? '#dc2626' : '#16a34a', marginTop: '0.2rem' }}>
            {festivalDemandState.potentialShortfall} orders
          </div>
          <div style={{ fontSize: '0.7rem', color: festivalDemandState.potentialShortfall > 0 ? '#991b1b' : '#166534' }}>
            {festivalDemandState.potentialShortfall > 0 ? 'Capacity deficit' : '✓ Capacity matches demand'}
          </div>
        </div>
      </div>

      {/* Visual Demand Chart & High Demand Categories */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        {/* Demand Bar Comparison */}
        <div style={{ background: '#fafafa', border: '1px solid var(--border-color)', borderRadius: '0.75rem', padding: '1rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.875rem' }}>
            📊 Seasonal Demand Comparison
          </h4>

          {/* Normal Demand Bar */}
          <div style={{ marginBottom: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Normal Demand</span>
              <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>45 units</span>
            </div>
            <div style={{ height: 12, backgroundColor: '#e5e7eb', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ width: '38%', height: '100%', backgroundColor: '#9ca3af', borderRadius: 6 }} />
            </div>
          </div>

          {/* Festival Demand Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
              <span style={{ color: '#be185d', fontWeight: 700 }}>Dasara Festival Demand</span>
              <span style={{ fontWeight: 800, color: '#be185d' }}>120 units (+82%)</span>
            </div>
            <div style={{ height: 12, backgroundColor: '#ffe4e6', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #f472b6, #be185d)', borderRadius: 6 }} />
            </div>
          </div>
        </div>

        {/* High-demand Categories */}
        <div style={{ background: '#fafafa', border: '1px solid var(--border-color)', borderRadius: '0.75rem', padding: '1rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>🔥</span> High-Demand Categories (Hubballi-Dharwad)
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', border: '1px solid var(--border-color)', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.8125rem' }}>
              <span style={{ fontWeight: 600 }}>👗 Sarees & Handlooms</span>
              <span style={{ fontWeight: 800, color: '#be185d', backgroundColor: '#ffe4e6', padding: '0.15rem 0.5rem', borderRadius: '1rem' }}>+180%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', border: '1px solid var(--border-color)', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.8125rem' }}>
              <span style={{ fontWeight: 600 }}>🎁 Festive Gift Hampers</span>
              <span style={{ fontWeight: 800, color: '#be185d', backgroundColor: '#ffe4e6', padding: '0.15rem 0.5rem', borderRadius: '1rem' }}>+120%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', border: '1px solid var(--border-color)', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.8125rem' }}>
              <span style={{ fontWeight: 600 }}>🍱 Homemade Food & Holige</span>
              <span style={{ fontWeight: 800, color: '#be185d', backgroundColor: '#ffe4e6', padding: '0.15rem 0.5rem', borderRadius: '1rem' }}>+95%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Box */}
      <div style={{
        background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
        border: '1.5px solid #fecdd3',
        borderRadius: '0.85rem',
        padding: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Sparkles size={18} color="#be185d" />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#881337', margin: 0 }}>
            Recommended Action
          </h3>
        </div>

        <p style={{ fontSize: '0.875rem', color: '#881337', marginBottom: '1rem', lineHeight: 1.45, fontWeight: 600 }}>
          {festivalDemandState.inventoryPrepared
            ? "✓ Your planned capacity can cover the forecasted demand."
            : "Increase saree inventory by approximately 45 units or open pre-orders to understand demand before production."}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              setPrepareSuccessMsg('');
              setShowPrepareModal(true);
            }}
            className="btn btn-primary"
            style={{
              backgroundColor: festivalDemandState.inventoryPrepared ? '#16a34a' : '#be185d',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.875rem',
              padding: '0.55rem 1.25rem',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(190, 24, 93, 0.2)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Package size={16} />
            <span>{festivalDemandState.inventoryPrepared ? '✓ Inventory Prepared' : 'Prepare Inventory'}</span>
          </button>

          <button
            onClick={() => {
              setPreOrderSuccessMsg('');
              setShowPreOrderModal(true);
            }}
            className="btn btn-secondary"
            style={{
              borderColor: '#f472b6',
              color: '#be185d',
              fontWeight: 800,
              fontSize: '0.875rem',
              padding: '0.55rem 1.25rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              backgroundColor: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <span>🪔</span>
            <span>{festivalDemandState.campaignLaunched ? `✓ Pre-orders Launched (${festivalDemandState.preOrdersCount})` : 'Launch Pre-orders'}</span>
          </button>
        </div>

        {/* Live status output tags */}
        {festivalDemandState.campaignLaunched && (
          <div style={{
            marginTop: '0.875rem',
            paddingTop: '0.75rem',
            borderTop: '1px dashed #fbcfe8',
            fontSize: '0.8125rem',
            color: '#be185d',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            fontWeight: 700
          }}>
            <span>📦 Pre-orders received: <strong>{festivalDemandState.preOrdersCount}</strong></span>
            <span>🎯 Demand confirmed: <strong>{festivalDemandState.preOrdersCount} / 120</strong></span>
          </div>
        )}
      </div>

      {/* DELIVERY SPIKE SIMULATION SECTION */}
      <div style={{
        background: '#fafafa',
        border: '1px solid var(--border-color)',
        borderRadius: '0.85rem',
        padding: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Truck size={18} color="var(--accent)" />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              🚚 Festival Delivery Readiness
            </h3>
          </div>

          <span className="badge badge-open" style={{ fontSize: '0.75rem' }}>
            Delivery capacity: READY
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.65rem 0.85rem' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>PROJECTED FESTIVAL ORDERS</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.15rem' }}>126 orders</div>
          </div>
          <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.65rem 0.85rem' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>AVAILABLE DELIVERY PARTNERS</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent)', marginTop: '0.15rem' }}>18 partners</div>
          </div>
          <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.65rem 0.85rem' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>PENDING PICKUP CAPACITY</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#16a34a', marginTop: '0.15rem' }}>104 orders</div>
          </div>
        </div>

        {/* Locality Batching */}
        <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          📍 Locality Order Batching (Hubballi-Dharwad):
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
          <div style={{ background: '#fff', border: '1px solid var(--border-color)', padding: '0.4rem 0.65rem', borderRadius: '0.4rem', fontSize: '0.78rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Keshwapur</span> <strong>32 orders</strong>
          </div>
          <div style={{ background: '#fff', border: '1px solid var(--border-color)', padding: '0.4rem 0.65rem', borderRadius: '0.4rem', fontSize: '0.78rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Vidyanagar</span> <strong>28 orders</strong>
          </div>
          <div style={{ background: '#fff', border: '1px solid var(--border-color)', padding: '0.4rem 0.65rem', borderRadius: '0.4rem', fontSize: '0.78rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Gokul Road</span> <strong>21 orders</strong>
          </div>
          <div style={{ background: '#fff', border: '1px solid var(--border-color)', padding: '0.4rem 0.65rem', borderRadius: '0.4rem', fontSize: '0.78rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Dharwad</span> <strong>18 orders</strong>
          </div>
        </div>
      </div>

      {/* BUSINESS INTELLIGENCE MESSAGE ("Why this matters") */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '0.75rem',
        padding: '1rem',
        fontSize: '0.8125rem'
      }}>
        <div style={{ fontWeight: 800, color: '#1e293b', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <ShieldCheck size={16} color="var(--accent)" />
          <span>Why this matters for local women entrepreneurs:</span>
        </div>
        <div style={{ color: '#475569', marginBottom: '0.5rem', lineHeight: 1.4 }}>
          Instead of waiting for demand to arrive, Sakhi Market helps women entrepreneurs:
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.4rem 1rem', color: '#1e293b', fontWeight: 600 }}>
          <div>✓ Predict demand</div>
          <div>✓ Prepare inventory</div>
          <div>✓ Collect pre-orders</div>
          <div>✓ Coordinate local delivery</div>
          <div>✓ Reduce missed festival sales</div>
        </div>
      </div>

      {/* MODAL 1: PREPARE INVENTORY SIMULATION */}
      {showPrepareModal && (
        <div className="modal-overlay" onClick={() => setShowPrepareModal(false)} style={{ zIndex: 1100 }}>
          <div
            className="modal-content"
            style={{ maxWidth: 460, padding: 0, overflow: 'hidden', borderRadius: '1rem' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ background: 'linear-gradient(135deg, #be185d, #9d174d)', padding: '1.25rem 1.5rem', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>Prepare for Dasara</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Set planned production capacity</div>
              </div>
              <button onClick={() => setShowPrepareModal(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={14} />
              </button>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#fff' }}>
              {prepareSuccessMsg ? (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <CheckCircle2 size={48} color="#16a34a" style={{ marginBottom: '0.75rem' }} />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#166534', marginBottom: '0.35rem' }}>
                    Inventory Plan Created!
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#15803d', marginBottom: '1.25rem' }}>
                    {prepareSuccessMsg}
                  </p>
                  <button
                    onClick={() => setShowPrepareModal(false)}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', backgroundColor: '#16a34a' }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConfirmPrepare}>
                  <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.8125rem' }}>
                    <div style={{ fontWeight: 700, color: '#881337', marginBottom: '0.2rem' }}>Product: Sarees & Handlooms</div>
                    <div style={{ color: '#be185d' }}>Current Capacity: <strong>75 units</strong></div>
                    <div style={{ color: '#be185d' }}>Recommended Additional Stock: <strong>45 units</strong></div>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                      How many additional units can you prepare?
                    </label>
                    <input
                      type="number"
                      value={additionalStockInput}
                      onChange={e => setAdditionalStockInput(e.target.value)}
                      min="1"
                      required
                      style={{
                        width: '100%',
                        padding: '0.6rem 0.75rem',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        border: '1.5px solid #f472b6',
                        borderRadius: '0.5rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', backgroundColor: '#be185d', padding: '0.65rem' }}
                  >
                    Confirm Preparation &rarr;
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: LAUNCH PRE-ORDERS SIMULATION */}
      {showPreOrderModal && (
        <div className="modal-overlay" onClick={() => setShowPreOrderModal(false)} style={{ zIndex: 1100 }}>
          <div
            className="modal-content"
            style={{ maxWidth: 460, padding: 0, overflow: 'hidden', borderRadius: '1rem' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ background: 'linear-gradient(135deg, #be185d, #9d174d)', padding: '1.25rem 1.5rem', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span>🪔</span> Dasara Pre-order Campaign
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Validate customer demand before production</div>
              </div>
              <button onClick={() => setShowPreOrderModal(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={14} />
              </button>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#fff' }}>
              {preOrderSuccessMsg ? (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <CheckCircle2 size={48} color="#16a34a" style={{ marginBottom: '0.75rem' }} />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#166534', marginBottom: '0.35rem' }}>
                    Pre-order Campaign Live!
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#15803d', marginBottom: '1rem' }}>
                    {preOrderSuccessMsg}
                  </p>
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1.25rem', fontSize: '0.8125rem', color: '#166534', textAlign: 'left' }}>
                    <div>Pre-orders received: <strong>18</strong></div>
                    <div>Demand confirmed: <strong>18 / 120</strong></div>
                  </div>
                  <button
                    onClick={() => setShowPreOrderModal(false)}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', backgroundColor: '#16a34a' }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '0.5rem', padding: '0.85rem', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: 700, color: '#881337', marginBottom: '0.35rem' }}>Target Product: Sarees & Handloom</div>
                    <div style={{ color: '#be185d', marginBottom: '0.2rem' }}>Expected Festival Demand: <strong>120 orders</strong></div>
                    <div style={{ color: '#be185d', marginBottom: '0.2rem' }}>Pre-order Window: <strong>7 days</strong></div>
                    <div style={{ color: '#881337', marginTop: '0.5rem', fontStyle: 'italic', fontSize: '0.8125rem', background: '#ffffff', padding: '0.4rem 0.6rem', borderRadius: '0.4rem' }}>
                      "Understand customer demand before producing the full inventory."
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleLaunchCampaign}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', backgroundColor: '#be185d', padding: '0.65rem', fontWeight: 800 }}
                  >
                    🚀 Launch Campaign &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
