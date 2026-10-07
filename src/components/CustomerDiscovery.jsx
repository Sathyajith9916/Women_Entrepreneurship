import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, MapPin, Filter, Store, Sparkles, Tag, ArrowRight, Phone, Clock, AlertTriangle } from 'lucide-react';
import ProductCard from './ProductCard';
import { CATEGORIES, LOCATIONS } from '../data/seedData';

export default function CustomerDiscovery({ onSelectProduct, onSelectSeller }) {
  const { sellers, products, t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Filter products based on search, category and location
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const seller = sellers.find(s => s.id === product.sellerId);
      if (!seller) return false;

      // Category match
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory || seller.category === selectedCategory;

      // Location match
      const locationMatch = selectedLocation === 'All' || seller.location === selectedLocation;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const searchMatch = !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        seller.name.toLowerCase().includes(query) ||
        seller.category.toLowerCase().includes(query) ||
        seller.location.toLowerCase().includes(query);

      return categoryMatch && locationMatch && searchMatch;
    });
  }, [products, sellers, searchQuery, selectedCategory, selectedLocation]);

  // Sellers matching search & location
  const filteredSellers = useMemo(() => {
    return sellers.filter(seller => {
      const locationMatch = selectedLocation === 'All' || seller.location === selectedLocation;
      const categoryMatch = selectedCategory === 'All' || seller.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const searchMatch = !query ||
        seller.name.toLowerCase().includes(query) ||
        seller.description.toLowerCase().includes(query) ||
        seller.location.toLowerCase().includes(query);

      return locationMatch && categoryMatch && searchMatch;
    });
  }, [sellers, searchQuery, selectedCategory, selectedLocation]);

  // Active Festival Campaigns across all sellers
  const activeFestivalOffers = useMemo(() => {
    const list = [];
    sellers.forEach(s => {
      if (s.festivalOffers && s.festivalOffers.length > 0) {
        s.festivalOffers.forEach(offer => {
          if (offer.active) {
            list.push({ ...offer, seller: s });
          }
        });
      }
    });
    return list;
  }, [sellers]);

  return (
    <div>
      {/* Platform Welcome & Value Statement */}
      <div style={{
        marginBottom: '1.5rem',
        padding: '1.25rem',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--accent)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Hubballi-Dharwad Local Commerce
          </span>
        </div>
        <h1 style={{
          fontSize: '1.4rem',
          fontWeight: 800,
          color: 'var(--text-main)',
          lineHeight: 1.2
        }}>
          Direct access to local women-led home enterprises
        </h1>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          maxWidth: '750px',
          lineHeight: 1.45
        }}>
          Authentic North Karnataka foods, heritage Kasuti embroidery, boutique tailoring, and custom bakes directly from home makers. Support micro-entrepreneurs with transparent pricing, UPI, and local delivery.
        </p>
      </div>

      {/* Active Festival Campaigns Banner */}
      {activeFestivalOffers.length > 0 && (
        <div style={{
          marginBottom: '1.5rem',
          border: '1px solid var(--accent-border)',
          backgroundColor: 'var(--warning-bg)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
            <Sparkles size={16} color="var(--accent)" />
            <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent)' }}>
              Active Festival Specials in Hubballi-Dharwad
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '0.75rem'
          }}>
            {activeFestivalOffers.map(offer => (
              <div
                key={offer.id}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span className="badge badge-accent" style={{ fontSize: '0.68rem' }}>
                      {offer.festivalName}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                      by {offer.seller.name}
                    </span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', marginTop: '0.2rem' }}>
                    {offer.title}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--accent)', fontWeight: 700 }}>
                    {offer.discountDesc}
                  </div>
                </div>

                <button
                  onClick={() => onSelectSeller(offer.seller)}
                  className="btn btn-secondary btn-sm"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        marginBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {/* Search Input */}
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-control"
            style={{ paddingLeft: '2.25rem', fontSize: '0.9375rem' }}
          />
        </div>

        {/* Filter Dropdowns and Category Chips */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Location Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <MapPin size={15} color="var(--accent)" />
            <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Area:</span>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="select-control"
              style={{ padding: '0.35rem 0.65rem', fontSize: '0.8125rem', width: 'auto' }}
            >
              {LOCATIONS.map(loc => (
                <option key={loc} value={loc}>
                  {loc === 'All' ? 'All Hubballi-Dharwad' : loc}
                </option>
              ))}
            </select>
          </div>

          {/* Category Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Filter size={15} color="var(--text-muted)" />
            <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select-control"
              style={{ padding: '0.35rem 0.65rem', fontSize: '0.8125rem', width: 'auto' }}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category quick buttons for easy mobile tapping */}
        <div style={{
          display: 'flex',
          gap: '0.4rem',
          overflowX: 'auto',
          paddingBottom: '0.2rem',
          scrollbarWidth: 'none'
        }}>
          {["All", "Food", "Baking", "Kasuti / Embroidery", "Tailoring", "Jewellery", "Catering"].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                border: '1px solid',
                borderColor: selectedCategory === cat ? 'var(--text-main)' : 'var(--border-color)',
                backgroundColor: selectedCategory === cat ? 'var(--text-main)' : 'var(--bg-secondary)',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-main)',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.25rem 0.65rem',
                borderRadius: '4px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Women-Led Businesses Section */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Women-Led Businesses ({filteredSellers.length})
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-subtle)' }}>
              Verified home kitchens, craft studios, and boutique tailoring in your locality
            </p>
          </div>
        </div>

        <div className="grid-cols-3">
          {filteredSellers.map(seller => {
            const isClosed = seller.status === "TEMPORARILY CLOSED";
            const isLimited = seller.status === "LIMITED ORDERS";

            return (
              <div
                key={seller.id}
                onClick={() => onSelectSeller(seller)}
                className="card"
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <span className="badge badge-neutral">{seller.category}</span>
                    {isClosed ? (
                      <span className="badge badge-closed">Closed</span>
                    ) : isLimited ? (
                      <span className="badge badge-limited">Limited Orders</span>
                    ) : (
                      <span className="badge badge-open">Open</span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                    {seller.name}
                  </h3>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Proprietor: <span style={{ fontWeight: 600 }}>{seller.ownerName}</span>
                  </div>

                  <p style={{
                    fontSize: '0.8125rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.4,
                    marginBottom: '0.75rem'
                  }}>
                    {seller.description}
                  </p>

                  {/* Unavailable notice if closed */}
                  {seller.unavailableNotice && (
                    <div style={{
                      backgroundColor: 'var(--warning-bg)',
                      border: '1px solid var(--accent-border)',
                      borderRadius: '4px',
                      padding: '0.4rem 0.6rem',
                      fontSize: '0.75rem',
                      color: '#78350f',
                      marginBottom: '0.6rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}>
                      <AlertTriangle size={13} />
                      <span>{seller.unavailableNotice}</span>
                    </div>
                  )}
                </div>

                <div style={{
                  paddingTop: '0.6rem',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.775rem',
                  color: 'var(--text-subtle)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <MapPin size={13} color="var(--accent)" />
                    <span>{seller.location}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    {seller.deliveryAvailable ? (
                      <span className="badge badge-delivery" style={{ fontSize: '0.68rem' }}>Delivery</span>
                    ) : (
                      <span className="badge badge-neutral" style={{ fontSize: '0.68rem' }}>Pickup</span>
                    )}
                    <span style={{ fontWeight: 600, color: 'var(--accent)' }}>View &rarr;</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product & Service Catalogue Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Direct Product Catalogue ({filteredProducts.length} items)
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-subtle)' }}>
              Browse items, view standard pricing, or request a quote for custom artisanal work
            </p>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            border: '1px dashed var(--border-strong)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-secondary)'
          }}>
            <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              No products found matching your current filter.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedLocation('All'); }}
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '0.75rem' }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid-cols-3">
            {filteredProducts.map(product => {
              const seller = sellers.find(s => s.id === product.sellerId);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  seller={seller}
                  onOrderClick={onSelectProduct}
                  onSellerClick={onSelectSeller}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Tax and GST Regulatory Notice (Strict requirement from brief) */}
      <div style={{
        marginTop: '2.5rem',
        padding: '0.75rem 1rem',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-secondary)',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        textAlign: 'center'
      }}>
        <p>
          <strong>Notice:</strong> {t.gstDisclaimer}
        </p>
      </div>
    </div>
  );
}
