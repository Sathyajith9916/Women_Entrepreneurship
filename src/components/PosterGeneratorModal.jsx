import React, { useRef, useEffect } from 'react';
import { X, Download, Share2, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function PosterGeneratorModal({ seller, product, offer, onClose }) {
  const canvasRef = useRef(null);

  const title = offer ? offer.title : (product?.name || "Festive Delicacies & Handmade Goods");
  const festivalName = offer ? offer.festivalName : "Festival Special";
  const sellerName = seller?.name || "Local Artisan";
  const location = seller?.location || "Hubballi-Dharwad";
  const phone = seller?.phone || "+91 98451 23456";
  const priceText = offer
    ? `${offer.discountDesc}`
    : (product ? `₹${product.price} / ${product.unit}` : "Special Pricing");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = 600;
    const height = 750;
    canvas.width = width;
    canvas.height = height;

    // Background: Clean elegant parchment/cream
    ctx.fillStyle = '#fffdfa';
    ctx.fillRect(0, 0, width, height);

    // Subtle border
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 10;
    ctx.strokeRect(15, 15, width - 30, height - 30);

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.strokeRect(25, 25, width - 50, height - 50);

    // Festival Header Banner
    ctx.fillStyle = '#b45309';
    ctx.fillRect(25, 25, width - 50, 80);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`✨ ${festivalName.toUpperCase()} CELEBRATION ✨`, width / 2, 75);

    // Sakhi Market Sub-tag
    ctx.fillStyle = '#64748b';
    ctx.font = '600 14px sans-serif';
    ctx.fillText('SAKHI MARKET • HUBBALLI-DHARWAD WOMEN ENTERPRISE', width / 2, 140);

    // Seller Name
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText(sellerName, width / 2, 195);

    // Location badge
    ctx.fillStyle = '#475569';
    ctx.font = '500 16px sans-serif';
    ctx.fillText(`📍 ${location}, Hubballi-Dharwad`, width / 2, 230);

    // Divider
    ctx.strokeStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.moveTo(80, 260);
    ctx.lineTo(width - 80, 260);
    ctx.stroke();

    // Featured Product Box
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(60, 290, width - 120, 220);
    ctx.strokeStyle = '#e2e8f0';
    ctx.strokeRect(60, 290, width - 120, 220);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 24px sans-serif';
    // Wrap product title if long
    const words = title.split(' ');
    let line1 = words.slice(0, 4).join(' ');
    let line2 = words.slice(4).join(' ');
    ctx.fillText(line1, width / 2, 350);
    if (line2) {
      ctx.fillText(line2, width / 2, 385);
    }

    // Price callout
    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText(priceText, width / 2, 450);

    ctx.fillStyle = '#16a34a';
    ctx.font = '600 15px sans-serif';
    ctx.fillText('100% Home Crafted • Traditional Quality', width / 2, 485);

    // Booking Details
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('Order Now / Pre-book on Sakhi Market', width / 2, 560);

    ctx.fillStyle = '#475569';
    ctx.font = '500 16px sans-serif';
    ctx.fillText(`WhatsApp / Call: ${phone}`, width / 2, 600);

    // Footer
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(25, 655, width - 50, 70);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 13px sans-serif';
    ctx.fillText('Empowering Local Women-Led Home Businesses', width / 2, 685);
    ctx.font = '400 12px sans-serif';
    ctx.fillText('Direct Order • UPI Payments • Doorstep Delivery', width / 2, 705);
  }, [seller, product, offer]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `sakhi-poster-${sellerName.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🎉 *${festivalName} Offer by ${sellerName}* 🎉\n\n` +
      `*${title}*\n` +
      `Special Price: ${priceText}\n` +
      `Location: ${location}, Hubballi-Dharwad\n\n` +
      `Order directly via Sakhi Market:\n` +
      `https://sakhi-market.hubballi/s/${seller?.id || '1'}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ImageIcon size={18} color="var(--accent)" />
            <h3 className="modal-title">Marketing Poster Generator</h3>
          </div>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </div>

        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Instantly generate a high-resolution poster to share on WhatsApp status, groups, and Instagram stories.
        </p>

        {/* Canvas Display */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-secondary)',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          marginBottom: '1rem',
          overflowX: 'auto'
        }}>
          <canvas
            ref={canvasRef}
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '440px',
              border: '1px solid var(--border-strong)',
              boxShadow: 'var(--shadow-md)'
            }}
          />
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button onClick={handleShareWhatsApp} className="btn btn-whatsapp">
            <Share2 size={15} />
            <span>Share Offer on WhatsApp</span>
          </button>
          <button onClick={handleDownload} className="btn btn-primary">
            <Download size={15} />
            <span>Download High-Res Poster</span>
          </button>
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
