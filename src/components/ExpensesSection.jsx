import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Trash2, Receipt, TrendingDown, TrendingUp, Calculator } from 'lucide-react';

const EXPENSE_CATEGORIES = [
  'Ingredients', 'Packaging', 'Transport', 'Marketing',
  'Equipment', 'Utilities', 'Labour', 'Other'
];

function today() {
  return new Date().toISOString().split('T')[0];
}

export default function ExpensesSection() {
  const { activeSeller, calculatedMetrics } = useApp();
  const storageKey = `ns_expenses_${activeSeller?.id || 'default'}`;

  const [expenses, setExpenses] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { return []; }
  });

  const [form, setForm] = useState({ description: '', amount: '', category: 'Ingredients', date: today() });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const save = (list) => {
    setExpenses(list);
    localStorage.setItem(storageKey, JSON.stringify(list));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.description || !form.amount) { setError('Description and amount are required.'); return; }
    const amt = parseFloat(form.amount);
    if (isNaN(amt) || amt <= 0) { setError('Enter a valid amount.'); return; }
    const newExp = { id: `exp-${Date.now()}`, ...form, amount: amt };
    save([newExp, ...expenses]);
    setForm({ description: '', amount: '', category: 'Ingredients', date: today() });
    setError('');
    setShowForm(false);
  };

  const handleDelete = (id) => save(expenses.filter(e => e.id !== id));

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const revenue = calculatedMetrics.monthlySales;
  const surplus = revenue - totalExpenses;

  const byCategory = EXPENSE_CATEGORIES.map(cat => ({
    cat,
    total: expenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0)
  })).filter(c => c.total > 0);

  return (
    <div>
      {/* Business Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: '#f0fdf4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.3rem' }}>
            <TrendingUp size={14} color="#16a34a" />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Monthly Revenue</span>
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#16a34a' }}>₹{revenue.toLocaleString('en-IN')}</div>
        </div>
        <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: '#fef2f2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.3rem' }}>
            <TrendingDown size={14} color="#dc2626" />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Expenses</span>
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#dc2626' }}>₹{totalExpenses.toLocaleString('en-IN')}</div>
        </div>
        <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: surplus >= 0 ? '#fefce8' : '#fef2f2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.3rem' }}>
            <Calculator size={14} color={surplus >= 0 ? '#b45309' : '#dc2626'} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Approx. Surplus</span>
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: surplus >= 0 ? '#b45309' : '#dc2626' }}>
            {surplus >= 0 ? '+' : ''}₹{Math.abs(surplus).toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '1rem', padding: '0.4rem 0.6rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
        This is an approximate business summary, not professional accounting advice. Consult a tax professional for official records.
      </div>

      {/* Category breakdown */}
      {byCategory.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.5rem' }}>Expenses by Category</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {byCategory.map(({ cat, total }) => (
              <span key={cat} style={{ padding: '0.25rem 0.6rem', background: '#fef3c7', color: '#92400e', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, border: '1px solid #fcd34d' }}>
                {cat}: ₹{total.toLocaleString('en-IN')}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Add expense */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>Expense Entries ({expenses.length})</div>
        <button onClick={() => setShowForm(s => !s)} className="btn btn-secondary btn-sm">
          <Plus size={13} />
          <span>Add Expense</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} style={{ marginBottom: '1rem', padding: '0.875rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-secondary)' }}>
          {error && <div style={{ color: '#b91c1c', fontSize: '0.8125rem', marginBottom: '0.5rem' }}>{error}</div>}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Description *</label>
              <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="e.g. Rice flour, 5kg" style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.8125rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Amount (₹) *</label>
              <input type="number" min="1" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="250" style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.8125rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.8125rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', boxSizing: 'border-box' }}>
                {EXPENSE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Date</label>
              <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.8125rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" className="btn btn-primary btn-sm">Save Expense</button>
            <button type="button" onClick={() => { setShowForm(false); setError(''); }} className="btn btn-secondary btn-sm">Cancel</button>
          </div>
        </form>
      )}

      {/* Expense list */}
      {expenses.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.875rem', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <Receipt size={28} style={{ marginBottom: '0.5rem', opacity: 0.4 }} />
          <div>No expenses recorded yet.</div>
          <div style={{ fontSize: '0.75rem' }}>Add your ingredient, packaging, and transport costs.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {expenses.map(exp => (
            <div key={exp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', background: '#fff', fontSize: '0.8125rem' }}>
              <div>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{exp.description}</span>
                <span style={{ marginLeft: '0.5rem', padding: '0.1rem 0.4rem', background: '#fef3c7', color: '#92400e', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }}>{exp.category}</span>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{exp.date}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontWeight: 700, color: '#dc2626' }}>−₹{exp.amount.toLocaleString('en-IN')}</span>
                <button onClick={() => handleDelete(exp.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
