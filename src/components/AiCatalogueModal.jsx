import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, Wand2 } from 'lucide-react';
import { generateCatalogueListing } from '../utils/aiHelper';
import { useApp } from '../context/AppContext';

export default function AiCatalogueModal({ onClose, onProductCreated }) {
  const { addProduct } = useApp();
  const [prompt, setPrompt] = useState('I make homemade Dharwad holige using traditional ingredients.');
  const [apiKey, setApiKey] = useState(localStorage.getItem('sakhi_gemini_key') || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const samplePrompts = [
    "I make homemade Dharwad holige using traditional ingredients.",
    "Stone ground spicy peanut shenga chutney powder with garlic.",
    "GI-tagged authentic Kasuti embroidery hand-stitched Ilkal sarees.",
    "Boutique wedding bridal blouse stitching with customized fitting."
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const generated = await generateCatalogueListing(prompt, apiKey || null);
      setResult(generated);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToCatalogue = () => {
    if (!result) return;
    const added = addProduct({
      name: result.title,
      description: result.description,
      category: result.category,
      price: Number(result.suggestedPrice) || 200,
      unit: result.unit || '1 Pack',
      isQuoteBased: result.isQuoteBased || false,
      availability: true
    });
    onProductCreated(added);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={18} color="var(--accent)" />
            <h3 className="modal-title">AI Catalogue Assistant</h3>
          </div>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </div>

        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Describe what you make in your own simple words. The assistant creates structured title, description, category, and pricing formatted for customers.
        </p>

        {/* Input prompt */}
        <div className="input-group">
          <label className="input-label">Describe your product or service</label>
          <textarea
            rows={3}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            className="textarea-control"
            placeholder="e.g. I make homemade Dharwad holige using traditional ingredients."
          />
        </div>

        {/* Quick prompt suggestions */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginBottom: '0.35rem' }}>
            Try quick examples:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPrompt(p)}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  padding: '0.2rem 0.5rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                "{p.slice(0, 35)}..."
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
            ⚡ Works instantly offline with local Hubballi-Dharwad knowledge
          </span>

          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="btn btn-accent"
          >
            <Wand2 size={15} />
            <span>{loading ? "Generating..." : "Generate Listing"}</span>
          </button>
        </div>

        {/* Result Preview */}
        {result && (
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.25rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <span className="badge badge-accent">{result.category}</span>
              <span className="badge badge-neutral">{result.unit}</span>
            </div>

            <div className="input-group" style={{ marginBottom: '0.5rem' }}>
              <label className="input-label" style={{ fontSize: '0.75rem' }}>Generated Title</label>
              <input
                type="text"
                value={result.title}
                onChange={e => setResult({ ...result, title: e.target.value })}
                className="input-control"
                style={{ fontWeight: 700 }}
              />
            </div>

            <div className="input-group" style={{ marginBottom: '0.5rem' }}>
              <label className="input-label" style={{ fontSize: '0.75rem' }}>Customer-Facing Description</label>
              <textarea
                rows={2}
                value={result.description}
                onChange={e => setResult({ ...result, description: e.target.value })}
                className="textarea-control"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div>
                <label className="input-label" style={{ fontSize: '0.75rem' }}>Price (₹)</label>
                <input
                  type="number"
                  value={result.suggestedPrice}
                  onChange={e => setResult({ ...result, suggestedPrice: Number(e.target.value) })}
                  className="input-control"
                />
              </div>

              <div>
                <label className="input-label" style={{ fontSize: '0.75rem' }}>Unit / Serving</label>
                <input
                  type="text"
                  value={result.unit}
                  onChange={e => setResult({ ...result, unit: e.target.value })}
                  className="input-control"
                />
              </div>
            </div>

            <button
              onClick={handleSaveToCatalogue}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              <Check size={16} />
              <span>Add to My Store Catalogue</span>
            </button>
          </div>
        )}

        <div style={{ textAlign: 'right' }}>
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
