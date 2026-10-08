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
    ctx.fillRect(25, 25, width - 50, 75);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`✨ ${festivalName.toUpperCase()} SPECIAL ✨`, width / 2, 62);

    // Namma Siri Sub-tag
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#64748b';
    ctx.font = '700 13px sans-serif';
    ctx.fillText('NAMMA SIRI • HUBBALLI-DHARWAD WOMEN ENTERPRISE', width / 2, 130);

    // Seller Name
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText(sellerName, width / 2, 175);

    // Location badge
    ctx.fillStyle = '#475569';
    ctx.font = '500 15px sans-serif';
    ctx.fillText(`📍 ${location}, Hubballi-Dharwad`, width / 2, 210);

    // Divider
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(90, 235);
    ctx.lineTo(width - 90, 235);
    ctx.stroke();

    // Helper to wrap text and return array of lines
    const getLines = (context, text, maxWidth) => {
      const words = String(text || '').split(' ');
      const lines = [];
      let currentLine = '';

      for (let n = 0; n < words.length; n++) {
        const testLine = currentLine ? `${currentLine} ${words[n]}` : words[n];
        const metrics = context.measureText(testLine);
        if (metrics.width > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = words[n];
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);
      return lines;
    };

    // Featured Product Box
    const boxX = 50;
    const boxY = 260;
    const boxWidth = width - 100; // 500px wide
    const boxHeight = 265;

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    // Title rendering (Auto-wrapped, 22px bold)
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    const titleLines = getLines(ctx, title, boxWidth - 40);
    let curY = boxY + 45;
    titleLines.forEach((line) => {
      ctx.fillText(line, width / 2, curY);
      curY += 28;
    });

    // Separator inside card
    curY += 6;
    ctx.strokeStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(width / 2 - 60, curY);
    ctx.lineTo(width / 2 + 60, curY);
    ctx.stroke();
    curY += 26;

    // Price callout - dynamically choose font size so it fits inside boxWidth - 40
    let priceFontSize = 26;
    ctx.font = `bold ${priceFontSize}px sans-serif`;
    let priceLines = getLines(ctx, priceText, boxWidth - 50);
    // If it spans more than 2 lines, shrink font
    if (priceLines.length > 2) {
      priceFontSize = 20;
      ctx.font = `bold ${priceFontSize}px sans-serif`;
      priceLines = getLines(ctx, priceText, boxWidth - 50);
    }

    ctx.fillStyle = '#b45309';
    priceLines.forEach((line) => {
      ctx.fillText(line, width / 2, curY);
      curY += priceFontSize + 6;
    });

    // Tagline badge inside card
    ctx.fillStyle = '#16a34a';
    ctx.font = '600 14px sans-serif';
    ctx.fillText('✓ 100% Home Crafted • Traditional Quality', width / 2, Math.max(curY + 12, boxY + boxHeight - 24));

    // Booking Details section
    const bookingY = 560;
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('Order Now / Pre-book on Namma Siri', width / 2, bookingY);

    ctx.fillStyle = '#475569';
    ctx.font = '500 16px sans-serif';
    ctx.fillText(`WhatsApp / Call: ${phone}`, width / 2, bookingY + 34);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 13px sans-serif';
    ctx.fillText('Direct UPI • Local Hubballi-Dharwad Delivery', width / 2, bookingY + 62);

    // Footer
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(25, 660, width - 50, 65);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 13px sans-serif';
    ctx.fillText('NAMMA SIRI • LOCAL WOMEN ENTREPRENEURS PLATFORM', width / 2, 688);
    ctx.font = '400 12px sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('Direct Order • Fair Local Pricing • Empowering Home Businesses', width / 2, 708);
  }, [seller, product, offer]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `namma-siri-poster-${sellerName.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🎉 *${festivalName} Offer by ${sellerName}* 🎉\n\n` +
      `*${title}*\n` +
      `Special Price: ${priceText}\n` +
      `Location: ${location}, Hubballi-Dharwad\n\n` +
      `Order directly via Namma Siri:\n` +
      `https://nammasiri.hubballi/s/${seller?.id || '1'}`
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
