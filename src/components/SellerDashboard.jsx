import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Sparkles,
  Share2,
  Calendar,
  DollarSign,
  FileText,
  PauseCircle,
  PlayCircle,
  Trash2,
  Edit,
  Tag,
  Check,
  X,
  ExternalLink,
  Store,
  MapPin,
  Phone,
  Printer,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { CATEGORIES, LOCATIONS, FESTIVAL_OPTIONS } from '../data/seedData';
import AiCatalogueModal from './AiCatalogueModal';
import PosterGeneratorModal from './PosterGeneratorModal';
import ExpensesSection from './ExpensesSection';
import MarketingAdsSection from './MarketingAdsSection';
import CommunitySection from './CommunitySection';
import PaymentLayerSection from './PaymentLayerSection';
import LoanSupportTrustScore from './LoanSupportTrustScore';

export default function SellerDashboard() {
  const {
    activeSeller,
    sellers,
    setActiveSellerId,
    orders,
    products,
    updateSeller,
    setSellerStatus,
    addProduct,
    updateProduct,
    toggleProductAvailability,
    deleteProduct,
    updateOrderStatus,
    createFestivalOffer,
    calculatedMetrics,
    t
  } = useApp();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'catalogue', 'festivals', 'history', 'profile'
  const [showAiModal, setShowAiModal] = useState(false);
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [posterContext, setPosterContext] = useState(null);

  // Request changes modal state
  const [requestChangeOrder, setRequestChangeOrder] = useState(null);
  const [changeMessage, setChangeMessage] = useState('We can fulfill tomorrow morning. Is that acceptable?');

  // New product form
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState(activeSeller?.category || 'Food');
  const [newProdPrice, setNewProdPrice] = useState(200);
  const [newProdUnit, setNewProdUnit] = useState('1 Pack');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdIsQuote, setNewProdIsQuote] = useState(false);

  // Festival offer form
  const [isAddingFestival, setIsAddingFestival] = useState(false);
  const [festName, setFestName] = useState('Deepavali Special');
  const [festTitle, setFestTitle] = useState('Deepavali Holige Gift Pack');
  const [festDiscountDesc, setFestDiscountDesc] = useState('₹250 → ₹220 per pack of 10');
  const [festOriginalPrice, setFestOriginalPrice] = useState(250);
  const [festOfferPrice, setFestOfferPrice] = useState(220);

  // Full Profile Edit Form State
  const [profileForm, setProfileForm] = useState({
    name: activeSeller?.name || '',
    ownerName: activeSeller?.ownerName || '',
    category: activeSeller?.category || 'Food',
    location: activeSeller?.location || 'Vidyanagar',
    address: activeSeller?.address || '',
    phone: activeSeller?.phone || '',
    upiId: activeSeller?.upiId || '',
    description: activeSeller?.description || '',
    workingHours: activeSeller?.workingHours || '9:00 AM - 7:00 PM',
    deliveryAvailable: activeSeller?.deliveryAvailable ?? true,
    pickupAvailable: activeSeller?.pickupAvailable ?? true,
    status: activeSeller?.status || 'OPEN',
    unavailableNotice: activeSeller?.unavailableNotice || ''
  });

  // Sync profile form when activeSeller changes
  React.useEffect(() => {
    if (activeSeller) {
      setProfileForm({
        name: activeSeller.name,
        ownerName: activeSeller.ownerName,
        category: activeSeller.category,
        location: activeSeller.location,
        address: activeSeller.address || '',
        phone: activeSeller.phone,
        upiId: activeSeller.upiId || '',
        description: activeSeller.description,
        workingHours: activeSeller.workingHours,
        deliveryAvailable: activeSeller.deliveryAvailable,
        pickupAvailable: activeSeller.pickupAvailable,
        status: activeSeller.status,
        unavailableNotice: activeSeller.unavailableNotice || ''
      });
    }
  }, [activeSeller.id]);

  // Filter orders for active seller
  const sellerOrders = orders.filter(o => o.sellerId === activeSeller.id);
  const sellerProducts = products.filter(p => p.sellerId === activeSeller.id);

  // Categorize orders
  const pendingRequests = sellerOrders.filter(o => o.status === 'REQUESTED');
  const acceptedOrders = sellerOrders.filter(o => ['ACCEPTED', 'READY', 'PICKUP PENDING', 'PICKED UP', 'OUT_FOR_DELIVERY'].includes(o.status));
  const completedOrders = sellerOrders.filter(o => o.status === 'DELIVERED');

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateSeller(activeSeller.id, profileForm);
  };

  const handleQuickStatusChange = (status, notice = "") => {
    const updated = {
      ...profileForm,
      status,
      unavailableNotice: notice !== undefined ? notice : profileForm.unavailableNotice
    };
    setProfileForm(updated);
    setSellerStatus(activeSeller.id, status, updated.unavailableNotice);
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    addProduct({
      name: newProdName,
      category: newProdCategory,
      price: Number(newProdPrice),
      unit: newProdUnit,
      description: newProdDesc,
      isQuoteBased: newProdIsQuote
    });
    setNewProdName('');
    setNewProdDesc('');
    setIsAddingProduct(false);
  };

  const handleAddFestivalSubmit = (e) => {
    e.preventDefault();
    const offer = createFestivalOffer(activeSeller.id, {
      festivalName: festName,
      title: festTitle,
      discountDesc: festDiscountDesc,
      originalPrice: Number(festOriginalPrice),
      offerPrice: Number(festOfferPrice),
      validUntil: "2026-11-20"
    });
    setIsAddingFestival(false);
    setPosterContext({ offer, seller: activeSeller });
    setShowPosterModal(true);
  };

  const openPosterForOffer = (offer) => {
    setPosterContext({ offer, seller: activeSeller });
    setShowPosterModal(true);
  };

  const openPosterForProduct = (product) => {
    setPosterContext({ product, seller: activeSeller });
    setShowPosterModal(true);
  };

  const handleSendChangeRequest = () => {
    if (requestChangeOrder) {
      updateOrderStatus(requestChangeOrder.id, 'REQUESTED', `Seller note: ${changeMessage}`);
      setRequestChangeOrder(null);
    }
  };

  return (
    <div>
      {/* Business Switcher & Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.25rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>
              Micro-Enterprise Portal
            </span>
            <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
              {activeSeller.location}
            </span>
            {activeSeller.status === 'OPEN' && <span className="badge badge-open">Open</span>}
            {activeSeller.status === 'LIMITED ORDERS' && <span className="badge badge-limited">Limited Orders</span>}
            {activeSeller.status === 'TEMPORARILY CLOSED' && <span className="badge badge-closed">Temporarily Closed</span>}
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{activeSeller.name}</h1>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Proprietor: <span style={{ fontWeight: 600 }}>{activeSeller.ownerName}</span> • Phone: {activeSeller.phone} • UPI: <code>{activeSeller.upiId}</code>
          </div>
        </div>

        {/* Quick select another seller */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Active Seller:</span>
          <select
            value={activeSeller.id}
            onChange={(e) => setActiveSellerId(e.target.value)}
            className="select-control"
            style={{ width: 'auto', fontSize: '0.8125rem' }}
          >
            {sellers.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.location})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* FEATURE 14: SELLER AVAILABILITY WARNING BANNER */}
      {activeSeller.status === 'TEMPORARILY CLOSED' && (
        <div className="callout callout-warning" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} color="var(--danger)" />
            <div>
              <strong>Store is Temporarily Closed:</strong> {activeSeller.unavailableNotice || "Not accepting orders at the moment."}
              <div style={{ fontSize: '0.75rem', color: '#92400e' }}>
                New customer orders are blocked until you re-open.
              </div>
            </div>
          </div>
          <button
            onClick={() => handleQuickStatusChange('OPEN', '')}
            className="btn btn-primary btn-sm"
            style={{ marginTop: '0.25rem' }}
          >
            Re-Open Store Now
          </button>
        </div>
      )}

      {/* FEATURE 9 — BUSINESS INSIGHTS DASHBOARD */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        <div className="card" style={{ padding: '0.85rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontWeight: 600 }}>
            {t.monthlySales}
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0' }}>
            ₹{calculatedMetrics.monthlySales.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
            Cumulative ledger records
          </div>
        </div>

        <div className="card" style={{ padding: '0.85rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontWeight: 600 }}>
            {t.totalOrders}
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0' }}>
            {calculatedMetrics.monthlyOrders}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
            This month's customer demand
          </div>
        </div>

        <div className="card" style={{ padding: '0.85rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>
            {t.completed}
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success)', margin: '0.2rem 0' }}>
            {calculatedMetrics.completedOrders}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
            Fulfilled and settled
          </div>
        </div>

        <div className="card" style={{ padding: '0.85rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>
            Pending Action
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent)', margin: '0.2rem 0' }}>
            {pendingRequests.length}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
            Awaiting your approval
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '1.5rem',
        overflowX: 'auto'
      }}>
        {[
          { id: 'orders', label: `📥 Orders (${pendingRequests.length + acceptedOrders.length})` },
          { id: 'catalogue', label: `📦 Catalogue (${sellerProducts.length})` },
          { id: 'payments', label: '💳 Payment Layer & Monthly Tracker' },
          { id: 'expenses', label: '📊 Expenses & Net Profit' },
          { id: 'loans', label: '🏛️ Loan Support & Trust Score' },
          { id: 'marketing', label: '🌸 Marketing & Posters' },
          { id: 'business', label: '⚙️ Business Profile' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.65rem 1rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-muted)',
              borderBottom: '2px solid',
              borderBottomColor: activeTab === tab.id ? 'var(--accent)' : 'transparent',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: ORDER REQUESTS & APPROVAL WORKFLOW */}
      {activeTab === 'orders' && (
        <div>
          {/* Pending Requests Section */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                Incoming Requests Awaiting Approval ({pendingRequests.length})
              </h2>
            </div>

            {pendingRequests.length === 0 ? (
              <div style={{
                padding: '2rem',
                border: '1px dashed var(--border-color)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
                color: 'var(--text-muted)',
                backgroundColor: 'var(--bg-secondary)'
              }}>
                No new pending requests. When a customer orders, it appears here for your review and approval.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {pendingRequests.map(order => (
                  <div
                    key={order.id}
                    className="card"
                    style={{
                      borderLeft: '4px solid var(--accent)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.6rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <span className="badge badge-accent" style={{ marginBottom: '0.3rem' }}>
                          Request #{order.id}
                        </span>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>
                          Customer: {order.customerName} ({order.customerPhone})
                        </h4>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                          Fulfillment: <strong>{order.orderType}</strong> • Address: {order.customerAddress}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                          {order.isQuoteRequest ? "Quote Requested" : `₹${order.totalAmount}`}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
                          {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>

                    {/* Order items */}
                    <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '0.6rem 0.8rem', borderRadius: '4px', fontSize: '0.8125rem' }}>
                      <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>Requested Item(s):</div>
                      {order.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{item.quantity}x {item.name} ({item.unit})</span>
                          <span>{order.isQuoteRequest ? "Quote pending" : `₹${item.price * item.quantity}`}</span>
                        </div>
                      ))}
                      {order.notes && (
                        <div style={{ marginTop: '0.35rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>
                          Customer note: "{order.notes}"
                        </div>
                      )}
                      {order.statusNotes && (
                        <div style={{ marginTop: '0.35rem', color: 'var(--accent)', fontWeight: 600 }}>
                          {order.statusNotes}
                        </div>
                      )}
                    </div>

                    {/* Action buttons: ACCEPT, REJECT, REQUEST CHANGES */}
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                      <button
                        onClick={() => updateOrderStatus(order.id, 'REJECTED', 'Seller unable to fulfill order at this time.')}
                        className="btn btn-danger btn-sm"
                      >
                        <X size={14} />
                        <span>Reject</span>
                      </button>

                      <button
                        onClick={() => {
                          setRequestChangeOrder(order);
                          setChangeMessage('We can fulfill tomorrow morning. Is that acceptable?');
                        }}
                        className="btn btn-secondary btn-sm"
                      >
                        <MessageSquare size={14} />
                        <span>Request Changes</span>
                      </button>

                      <button
                        onClick={() => updateOrderStatus(order.id, 'ACCEPTED')}
                        className="btn btn-primary btn-sm"
                      >
                        <Check size={14} />
                        <span>Accept Order</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active / In-Progress Orders */}
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Active Orders in Progress ({acceptedOrders.length})
            </h2>

            {acceptedOrders.length === 0 ? (
              <div style={{
                padding: '1.5rem',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-muted)',
                fontSize: '0.875rem'
              }}>
                No accepted orders currently in progress.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {acceptedOrders.map(order => (
                  <div key={order.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>#{order.id}</span>
                        <span className={`badge ${order.status === 'ACCEPTED' ? 'badge-open' : order.status === 'READY' ? 'badge-accent' : 'badge-delivery'}`}>
                          {order.status}
                        </span>
                        <span className={`badge ${order.paymentStatus === 'PAID' ? 'badge-open' : 'badge-limited'}`}>
                          {order.paymentStatus === 'PAID' ? 'Paid via UPI' : 'Payment Pending'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                        Customer: {order.customerName} ({order.customerPhone}) • Fulfillment: <strong>{order.orderType}</strong>
                      </div>
                      <div style={{ fontSize: '0.775rem', color: 'var(--text-subtle)' }}>
                        Items: {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                      </div>
                      {order.deliveryPartnerName && (
                        <div style={{ fontSize: '0.775rem', color: 'var(--info)', marginTop: '0.2rem' }}>
                          Delivery Partner: <strong>{order.deliveryPartnerName}</strong> ({order.deliveryPartnerPhone})
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, fontSize: '1rem', marginRight: '0.5rem' }}>
                        ₹{order.totalAmount}
                      </span>

                      {order.status === 'ACCEPTED' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'READY')}
                          className="btn btn-secondary btn-sm"
                        >
                          Mark Ready
                        </button>
                      )}

                      {order.status === 'READY' && order.orderType === 'PICKUP' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'DELIVERED')}
                          className="btn btn-primary btn-sm"
                        >
                          Customer Picked Up &rarr; Complete
                        </button>
                      )}

                      {order.status === 'READY' && order.orderType === 'DELIVERY' && !order.deliveryPartnerId && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>
                          Waiting for Delivery Partner...
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CATALOGUE MANAGEMENT */}
      {activeTab === 'catalogue' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Store Products & Services</h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Add items, manage prices and units, or generate an AI listing with one click.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setShowAiModal(true)}
                className="btn btn-accent"
              >
                <Sparkles size={15} />
                <span>AI Catalogue Assistant</span>
              </button>

              <button
                onClick={() => setIsAddingProduct(true)}
                className="btn btn-primary"
              >
                <Plus size={15} />
                <span>Add Product</span>
              </button>
            </div>
          </div>

          {/* Add product form */}
          {isAddingProduct && (
            <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--accent-border)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Add New Product or Service</h3>
              <form onSubmit={handleAddProductSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                  <div className="input-group">
                    <label className="input-label">Product / Service Name *</label>
                    <input
                      type="text"
                      required
                      value={newProdName}
                      onChange={e => setNewProdName(e.target.value)}
                      className="input-control"
                      placeholder="e.g. Dharwad Holige"
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Category *</label>
                    <select
                      value={newProdCategory}
                      onChange={e => setNewProdCategory(e.target.value)}
                      className="select-control"
                    >
                      {CATEGORIES.filter(c => c !== 'All').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={newProdPrice}
                      onChange={e => setNewProdPrice(e.target.value)}
                      className="input-control"
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Unit / Quantity *</label>
                    <input
                      type="text"
                      required
                      value={newProdUnit}
                      onChange={e => setNewProdUnit(e.target.value)}
                      className="input-control"
                      placeholder="e.g. Pack of 10 / 500g / 1 piece"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Short Description</label>
                  <textarea
                    rows={2}
                    value={newProdDesc}
                    onChange={e => setNewProdDesc(e.target.value)}
                    className="textarea-control"
                    placeholder="Key ingredients, craftsmanship, freshness..."
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={newProdIsQuote}
                      onChange={e => setNewProdIsQuote(e.target.checked)}
                    />
                    <span>This is a custom service requiring quote (e.g. Tailoring, Catering)</span>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setIsAddingProduct(false)} className="btn btn-secondary btn-sm">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Save to Store
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Product list table */}
          <div className="table-container">
            <table className="table-clean">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price / Unit</th>
                  <th>Availability</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sellerProducts.map(prod => (
                  <tr key={prod.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{prod.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {prod.description}
                      </div>
                    </td>
                    <td><span className="badge badge-neutral">{prod.category}</span></td>
                    <td>
                      <strong>₹{prod.price}</strong> <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>/{prod.unit}</span>
                    </td>
                    <td>
                      <button
                        onClick={() => toggleProductAvailability(prod.id)}
                        className={`badge ${prod.availability ? 'badge-open' : 'badge-closed'}`}
                        style={{ cursor: 'pointer', border: 'none' }}
                      >
                        {prod.availability ? 'Available' : 'Out of Stock'}
                      </button>
                    </td>
                    <td>
                      {prod.isQuoteBased ? <span className="badge badge-accent">Quote</span> : <span className="badge badge-neutral">Standard</span>}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button
                          onClick={() => openPosterForProduct(prod)}
                          className="btn btn-secondary btn-sm"
                          title="Generate marketing poster"
                        >
                          Poster
                        </button>
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="btn btn-danger btn-sm"
                          title="Delete product"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: MARKETING & FESTIVAL CAMPAIGNS */}
      {(activeTab === 'marketing' || activeTab === 'festivals') && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Festival Commerce Campaigns</h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Capitalize on surge demand during Deepavali, Dasara, and wedding seasons
              </p>
            </div>

            <button
              onClick={() => setIsAddingFestival(true)}
              className="btn btn-accent"
            >
              <Sparkles size={15} />
              <span>Create Festival Offer</span>
            </button>
          </div>

          {/* Create offer form */}
          {isAddingFestival && (
            <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--accent-border)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Create Festive Campaign</h3>
              <form onSubmit={handleAddFestivalSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                  <div className="input-group">
                    <label className="input-label">Select Occasion</label>
                    <select
                      value={festName}
                      onChange={e => setFestName(e.target.value)}
                      className="select-control"
                    >
                      {FESTIVAL_OPTIONS.map(f => (
                        <option key={f} value={`${f} Special`}>{f}</option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Offer Title</label>
                    <input
                      type="text"
                      required
                      value={festTitle}
                      onChange={e => setFestTitle(e.target.value)}
                      className="input-control"
                      placeholder="e.g. Deepavali Holige Special Box"
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Original Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={festOriginalPrice}
                      onChange={e => setFestOriginalPrice(e.target.value)}
                      className="input-control"
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Offer Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={festOfferPrice}
                      onChange={e => setFestOfferPrice(e.target.value)}
                      className="input-control"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Campaign Highlight / Offer Text</label>
                  <input
                    type="text"
                    required
                    value={festDiscountDesc}
                    onChange={e => setFestDiscountDesc(e.target.value)}
                    className="input-control"
                    placeholder="e.g. ₹250 → ₹220 per pack of 10"
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setIsAddingFestival(false)} className="btn btn-secondary btn-sm">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-accent btn-sm">
                    Publish & Generate Poster
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Active Campaigns list */}
          <div className="grid-cols-2">
            {(activeSeller.festivalOffers || []).map(offer => (
              <div key={offer.id} className="card" style={{ border: '1px solid var(--accent-border)', backgroundColor: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span className="badge badge-accent">{offer.festivalName}</span>
                  <span className="badge badge-open">Active</span>
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  {offer.title}
                </h3>

                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '0.75rem' }}>
                  {offer.discountDesc}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                  <button
                    onClick={() => openPosterForOffer(offer)}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                  >
                    View & Download Poster
                  </button>

                  <button
                    onClick={() => {
                      const text = encodeURIComponent(
                        `🎉 *${offer.festivalName} Offer by ${activeSeller.name}* 🎉\n` +
                        `*${offer.title}*\n` +
                        `Deal: ${offer.discountDesc}\n` +
                        `Order now on Namma Siri: https://nammasiri.hubballi/s/${activeSeller.id}`
                      );
                      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
                    }}
                    className="btn btn-whatsapp btn-sm"
                  >
                    <Share2 size={13} />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Local Marketing & Meta Ads Center */}
          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '2px dashed var(--border-color)' }}>
            <MarketingAdsSection />
          </div>
        </div>
      )}

      {/* TAB: EARNINGS & BUSINESS TRANSACTION HISTORY */}
      {(activeTab === 'earnings' || activeTab === 'history') && (
        <div>
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            marginBottom: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                <FileText size={18} color="var(--accent)" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                  Business Activity Ledger & Financial Readiness
                </h3>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Demonstrating verifiable transaction volume for future bank / NBFC working capital readiness without requiring formal balance sheets.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge badge-accent">Financial Readiness: Building History</span>
                <span className="badge badge-open">Fulfillment Rate: 98.4%</span>
                <span className="badge badge-neutral">Average Ticket: ₹265</span>
              </div>
            </div>

            <div>
              <button
                onClick={() => window.print()}
                className="btn btn-secondary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Printer size={14} />
                <span>Print Ledger Statement</span>
              </button>
            </div>
          </div>

          {/* Activity Table */}
          <div className="table-container">
            <table className="table-clean">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Fulfillment</th>
                </tr>
              </thead>
              <tbody>
                {completedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1.5rem' }}>
                      No completed orders yet. Complete orders to build your financial readiness ledger.
                    </td>
                  </tr>
                ) : (
                  completedOrders.map(order => (
                    <tr key={order.id}>
                      <td style={{ fontSize: '0.8125rem', color: 'var(--text-subtle)' }}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td><strong>#{order.id}</strong></td>
                      <td>{order.customerName}</td>
                      <td style={{ fontSize: '0.8125rem' }}>
                        {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                      </td>
                      <td>
                        <strong>₹{order.totalAmount}</strong>
                      </td>
                      <td>
                        <span className="badge badge-open">UPI Settled</span>
                      </td>
                      <td>
                        <span className="badge badge-neutral">{order.orderType}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: BUSINESS PROFILE & STATUS */}
      {(activeTab === 'business' || activeTab === 'profile') && (
        <div style={{ maxWidth: '780px' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              Edit Business Profile & Operating Status
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Update your commercial details, contact, and control whether you are currently accepting orders.
            </p>

            <form onSubmit={handleProfileSave}>
              {/* Status Section */}
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                marginBottom: '1.25rem'
              }}>
                <label className="input-label" style={{ marginBottom: '0.5rem' }}>
                  Current Availability Status *
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  {[
                    { id: 'OPEN', label: 'OPEN (Accepting all orders)', color: 'var(--success)' },
                    { id: 'LIMITED ORDERS', label: 'LIMITED ORDERS (Festive Rush)', color: 'var(--warning)' },
                    { id: 'TEMPORARILY CLOSED', label: 'TEMPORARILY CLOSED', color: 'var(--danger)' }
                  ].map(opt => (
                    <label
                      key={opt.id}
                      style={{
                        flex: 1,
                        minWidth: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.6rem 0.75rem',
                        border: '1px solid',
                        borderColor: profileForm.status === opt.id ? opt.color : 'var(--border-color)',
                        backgroundColor: profileForm.status === opt.id ? '#ffffff' : 'transparent',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        fontSize: '0.8125rem',
                        fontWeight: 600
                      }}
                    >
                      <input
                        type="radio"
                        name="storeStatus"
                        checked={profileForm.status === opt.id}
                        onChange={() => setProfileForm({ ...profileForm, status: opt.id })}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>

                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Public Availability Notice</label>
                  <input
                    type="text"
                    value={profileForm.unavailableNotice}
                    onChange={e => setProfileForm({ ...profileForm, unavailableNotice: e.target.value })}
                    className="input-control"
                    placeholder="e.g. Temporarily closed until 15 October due to travel."
                  />
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', marginTop: '0.25rem' }}>
                    Shown prominently on your store profile to prevent orders when travelling or unavailable.
                  </div>
                </div>
              </div>

              {/* Business Core Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                <div className="input-group">
                  <label className="input-label">Business Name *</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="input-control"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Owner / Proprietor Name *</label>
                  <input
                    type="text"
                    required
                    value={profileForm.ownerName}
                    onChange={e => setProfileForm({ ...profileForm, ownerName: e.target.value })}
                    className="input-control"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Category *</label>
                  <select
                    value={profileForm.category}
                    onChange={e => setProfileForm({ ...profileForm, category: e.target.value })}
                    className="select-control"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">Hubballi-Dharwad Locality *</label>
                  <select
                    value={profileForm.location}
                    onChange={e => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="select-control"
                  >
                    {LOCATIONS.filter(l => l !== 'All').map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">Contact Phone (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={profileForm.phone}
                    onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="input-control"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">UPI ID for Payments *</label>
                  <input
                    type="text"
                    required
                    value={profileForm.upiId}
                    onChange={e => setProfileForm({ ...profileForm, upiId: e.target.value })}
                    className="input-control"
                    placeholder="e.g. yourname@okaxis"
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Full Address / Landmark</label>
                <input
                  type="text"
                  value={profileForm.address}
                  onChange={e => setProfileForm({ ...profileForm, address: e.target.value })}
                  className="input-control"
                  placeholder="Street name, landmark, near circle..."
                />
              </div>

              <div className="input-group">
                <label className="input-label">Working Hours</label>
                <input
                  type="text"
                  value={profileForm.workingHours}
                  onChange={e => setProfileForm({ ...profileForm, workingHours: e.target.value })}
                  className="input-control"
                  placeholder="e.g. 8:00 AM - 8:00 PM (Mon-Sat)"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Short Business Description</label>
                <textarea
                  rows={2}
                  value={profileForm.description}
                  onChange={e => setProfileForm({ ...profileForm, description: e.target.value })}
                  className="textarea-control"
                />
              </div>

              {/* Delivery and Pickup Options */}
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.25rem', padding: '0.5rem 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={profileForm.deliveryAvailable}
                    onChange={e => setProfileForm({ ...profileForm, deliveryAvailable: e.target.checked })}
                  />
                  <span>Local Home Delivery Available</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={profileForm.pickupAvailable}
                    onChange={e => setProfileForm({ ...profileForm, pickupAvailable: e.target.checked })}
                  />
                  <span>Customer Store Pickup Available</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary">
                  Save Complete Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB: PAYMENT LAYER & LEDGER */}
      {activeTab === 'payments' && (
        <div>
          <PaymentLayerSection />
        </div>
      )}

      {/* TAB: LOAN SUPPORT & TRUST SCORE */}
      {activeTab === 'loans' && (
        <div>
          <LoanSupportTrustScore />
        </div>
      )}

      {/* TAB: EXPENSES & NET PROFIT */}
      {activeTab === 'expenses' && (
        <div style={{ maxWidth: '860px' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Micro-Enterprise Expense & Profit Ledger</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Track direct production costs (ingredients, raw silk, packaging, delivery fuel) to see your real monthly take-home profit.
            </p>
          </div>
          <ExpensesSection />
        </div>
      )}

      {/* TAB: COMMUNITY & SISTERHOOD */}
      {activeTab === 'community' && (
        <div>
          <div style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Women Entrepreneurs Sisterhood Network</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Connect with fellow micro-entrepreneurs across Hubballi-Dharwad, attend local business workshops, and share peer advice.
            </p>
          </div>
          <CommunitySection />
        </div>
      )}

      {/* Request Change Modal */}
      {requestChangeOrder && (
        <div className="modal-overlay" onClick={() => setRequestChangeOrder(null)}>
          <div className="modal-content" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Request Changes for #{requestChangeOrder.id}</h3>
              <button onClick={() => setRequestChangeOrder(null)} className="close-btn"><X size={18} /></button>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Send an adjustment message to <strong>{requestChangeOrder.customerName}</strong>.
            </p>
            <div className="input-group">
              <label className="input-label">Change Note / Proposal</label>
              <textarea
                rows={3}
                value={changeMessage}
                onChange={e => setChangeMessage(e.target.value)}
                className="textarea-control"
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setRequestChangeOrder(null)} className="btn btn-secondary btn-sm">Cancel</button>
              <button onClick={handleSendChangeRequest} className="btn btn-primary btn-sm">Send Proposal</button>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Modal */}
      {showAiModal && (
        <AiCatalogueModal
          onClose={() => setShowAiModal(false)}
          onProductCreated={() => {}}
        />
      )}

      {/* Poster Generator Modal */}
      {showPosterModal && posterContext && (
        <PosterGeneratorModal
          seller={posterContext.seller}
          product={posterContext.product}
          offer={posterContext.offer}
          onClose={() => setShowPosterModal(false)}
        />
      )}
    </div>
  );
}
