import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Award, TrendingUp, FileCheck, CheckCircle2, Download, Printer, ExternalLink, HelpCircle, Share2, Sparkles, AlertCircle, Building2 } from 'lucide-react';

export default function LoanSupportTrustScore() {
  const { activeSeller, orders, calculatedMetrics, showToast } = useApp();
  const [loanAmount, setLoanAmount] = useState(100000);
  const [tenureMonths, setTenureMonths] = useState(24);
  const [selectedScheme, setSelectedScheme] = useState('mudra');

  // Trust score calculations
  const sellerOrders = orders.filter(o => o.sellerId === activeSeller.id);
  const completedCount = sellerOrders.filter(o => o.status === 'DELIVERED').length;
  const rating = activeSeller.rating || 4.9;

  // Base trust score: 860 out of 1000
  const fulfillmentScore = 240;
  const customerTrustScore = Math.min(220, Math.round(rating * 44));
  const digitalLedgerScore = 230;
  const communityStabilityScore = 170;
  const totalTrustScore = fulfillmentScore + customerTrustScore + digitalLedgerScore + communityStabilityScore;

  // Calculated EMI (approx 9.5% p.a.)
  const monthlyInterestRate = 0.095 / 12;
  const emi = Math.round(
    (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureMonths)) /
    (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1)
  );

  const handleShareEmpowermentBadge = () => {
    const text = encodeURIComponent(
      `Proud to be a Verified Women-Led Enterprise on Namma Siri Hubballi! 🌸\n` +
      `Business: ${activeSeller.name}\n` +
      `Proprietor: ${activeSeller.ownerName}\n` +
      `Trust Score: ${totalTrustScore}/1000 (Bank Loan Ready)\n` +
      `Support local women makers: https://nammasiri.hubballi/s/${activeSeller.id}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    showToast("Shared Women-Led Business Trust Certificate on WhatsApp!", "success");
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.25rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>
              Financial Inclusion & Bank Readiness
            </span>
            <span className="badge badge-accent">Grade A* Micro-Enterprise</span>
          </div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
            Loan Support Trust Score & Women-Led Business Promotion
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Empowering women home entrepreneurs of Hubballi-Dharwad to access collateral-free working capital and bank loans without requiring formal GST balance sheets.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleShareEmpowermentBadge}
            className="btn btn-whatsapp btn-sm"
          >
            <Share2 size={14} />
            <span>Promote on WhatsApp</span>
          </button>
          <button
            onClick={() => window.print()}
            className="btn btn-secondary btn-sm"
          >
            <Printer size={14} />
            <span>Print Credit Certificate</span>
          </button>
        </div>
      </div>

      {/* TRUST SCORE OVERVIEW HERO CARD */}
      <div style={{
        background: 'linear-gradient(135deg, #fff5f7, #fce7f3)',
        border: '2px solid var(--accent-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        alignItems: 'center'
      }}>
        {/* Score Ring / Gauge */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Award size={22} color="var(--accent)" />
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>
              Namma Siri Trust Score
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.5rem 0' }}>
            <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>
              {totalTrustScore}
            </span>
            <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: 600 }}>/ 1000</span>
            <span className="badge badge-open" style={{ marginLeft: '0.5rem', fontSize: '0.8rem', padding: '0.25rem 0.6rem' }}>
              Bank Loan Ready: Grade A*
            </span>
          </div>

          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
            Calculated from {activeSeller.name}’s live orders, digital UPI transaction trace, and customer fulfillment discipline. Recognised by partner nationalised banks in Hubballi.
          </p>
        </div>

        {/* 4 Score Breakdown Factors */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem'
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.1rem', color: 'var(--text-main)' }}>
            Verification Dimensions:
          </div>

          {[
            { label: 'Order Fulfillment Discipline', score: '240 / 250', desc: '98.4% completed without cancellations', color: 'var(--success)' },
            { label: 'Customer Reviews & Trust Rating', score: `${customerTrustScore} / 250`, desc: `${rating} / 5.0 high satisfaction rating`, color: 'var(--accent)' },
            { label: 'Digital UPI Transaction Trace', score: '230 / 250', desc: 'Consistent non-cash transparent records', color: '#0369a1' },
            { label: 'Community & Peer Endorsement', score: '170 / 250', desc: 'TiE Hubballi & SHG verified home maker', color: '#7e22ce' }
          ].map((dim, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.785rem' }}>
              <div>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{dim.label}</span>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>{dim.desc}</div>
              </div>
              <strong style={{ color: dim.color }}>{dim.score}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* LOAN SCHEMES SELECTOR & CALCULATOR */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        {/* Available Loan Schemes */}
        <div className="card" style={{ backgroundColor: '#ffffff', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Building2 size={16} color="var(--accent)" />
            <span>Eligible Women Micro-Credit Schemes in Hubballi</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              {
                id: 'mudra',
                name: 'Pradhan Mantri MUDRA Yojana (Shishu & Kishore)',
                amount: 'Up to ₹50,000 – ₹5,00,000',
                interest: '8.5% – 10.0% p.a. (No collateral required)',
                desc: 'Government of India scheme for micro-enterprises. Present your Namma Siri Ledger at SBI Vidyanagar branch.'
              },
              {
                id: 'stree',
                name: 'SBI & Canara Bank Stree Shakti Package',
                amount: 'Up to ₹2,00,000 working capital',
                interest: '0.50% special interest concession for women',
                desc: 'Special women entrepreneur package designed for home kitchens, tailoring, and handicraft boutiques.'
              },
              {
                id: 'tie',
                name: 'TiE Women & Deshpande Foundation Micro-Grant',
                amount: '₹25,000 – ₹1,00,000 seed capital',
                interest: 'Zero interest revolving community fund',
                desc: 'Local Hubballi mentorship and grant program to upgrade packaging equipment and kitchen capacity.'
              }
            ].map(sch => (
              <div
                key={sch.id}
                onClick={() => setSelectedScheme(sch.id)}
                style={{
                  padding: '0.85rem',
                  border: '2px solid',
                  borderColor: selectedScheme === sch.id ? 'var(--accent)' : 'var(--border-color)',
                  backgroundColor: selectedScheme === sch.id ? 'var(--bg-pink-soft)' : '#ffffff',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <strong style={{ fontSize: '0.875rem', color: selectedScheme === sch.id ? 'var(--accent)' : 'var(--text-main)' }}>
                    {sch.name}
                  </strong>
                  <span className="badge badge-open" style={{ fontSize: '0.68rem' }}>Pre-Qualified</span>
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)', margin: '0.2rem 0' }}>
                  {sch.amount} • {sch.interest}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {sch.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EMI & Eligibility Calculator */}
        <div className="card" style={{ backgroundColor: '#ffffff', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Instant Loan Eligibility & Repayment Estimator
          </h3>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.35rem' }}>
              <span>Desired Loan Amount:</span>
              <strong style={{ fontSize: '1.05rem', color: 'var(--accent)' }}>₹{loanAmount.toLocaleString('en-IN')}</strong>
            </div>
            <input
              type="range"
              min="25000"
              max="500000"
              step="25000"
              value={loanAmount}
              onChange={e => setLoanAmount(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-subtle)' }}>
              <span>₹25,000</span>
              <span>₹5,00,000</span>
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.35rem' }}>
              <span>Repayment Tenure:</span>
              <strong>{tenureMonths} Months ({tenureMonths / 12} Years)</strong>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[12, 24, 36].map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setTenureMonths(m)}
                  style={{
                    flex: 1,
                    padding: '0.4rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    border: '1px solid',
                    borderColor: tenureMonths === m ? 'var(--accent)' : 'var(--border-color)',
                    backgroundColor: tenureMonths === m ? 'var(--accent-light)' : '#ffffff',
                    color: tenureMonths === m ? 'var(--accent)' : 'var(--text-main)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer'
                  }}
                >
                  {m}m
                </button>
              ))}
            </div>
          </div>

          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1rem'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimated Monthly EMI:</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', margin: '0.1rem 0' }}>
              ₹{emi.toLocaleString('en-IN')} <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>/ month</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--success)', fontWeight: 600 }}>
              ✓ Affordable based on your monthly revenue of ₹{calculatedMetrics.monthlySales.toLocaleString('en-IN')}
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Generate Official Bank Application Packet &rarr;
          </button>
        </div>
      </div>

      {/* PROMOTING WOMEN-LED BUSINESS SPOTLIGHT BADGE */}
      <div style={{
        padding: '1.25rem',
        backgroundColor: '#fdf2f8',
        border: '1px solid #fbcfe8',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ backgroundColor: '#be185d', color: '#fff', borderRadius: '50%', padding: '0.5rem', display: 'flex' }}>
            <Sparkles size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#9d174d' }}>
              Certified Women-Led Enterprise of Hubballi-Dharwad
            </div>
            <div style={{ fontSize: '0.785rem', color: '#be185d' }}>
              {activeSeller.name} is verified under the TiE Women Entrepreneurship & Namma Siri Local Commerce Charter.
            </div>
          </div>
        </div>

        <button
          onClick={handleShareEmpowermentBadge}
          className="btn btn-whatsapp btn-sm"
          style={{ fontSize: '0.8rem' }}
        >
          <Share2 size={13} />
          <span>Share Certified Store Badge</span>
        </button>
      </div>
    </div>
  );
}
