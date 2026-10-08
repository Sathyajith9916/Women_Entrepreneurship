import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Header from './components/Header';
import CustomerDiscovery from './components/CustomerDiscovery';
import SellerDashboard from './components/SellerDashboard';
import DeliveryDashboard from './components/DeliveryDashboard';
import SellerProfileModal from './components/SellerProfileModal';
import OrderModal from './components/OrderModal';
import PaymentModal from './components/PaymentModal';
import FutureVisionModal from './components/FutureVisionModal';
import PosterGeneratorModal from './components/PosterGeneratorModal';
import AboutUsModal from './components/AboutUsModal';
import AuthModal from './components/AuthModal';
import CommunitySection from './components/CommunitySection';
import CompartmentSwitcher from './components/CompartmentSwitcher';
import CustomerSupportModal from './components/CustomerSupportModal';
import VoiceRegistrationModal from './components/VoiceRegistrationModal';
import { ShoppingBag, CreditCard, Clock, CheckCircle2, ChevronRight, X, HelpCircle, HeartHandshake } from 'lucide-react';

export default function App() {
  const {
    currentRole,
    sellers,
    products,
    orders,
    activeSeller,
    setActiveSellerId,
    setCurrentRole,
    updateOrderStatus,
    setSellerStatus,
    assignDeliveryPartner,
    activePartner,
    createFestivalOffer,
    toasts,
    showToast,
    currentUser,
    loginUser,
    logoutUser
  } = useApp();

  // Modals state
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrderForPayment, setSelectedOrderForPayment] = useState(null);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showCustomerOrders, setShowCustomerOrders] = useState(false);
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [posterContext, setPosterContext] = useState(null);
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');

  const handleSelectProduct = (product, seller) => {
    setSelectedProduct({ product, seller: seller || sellers.find(s => s.id === product.sellerId) });
  };

  const handleSelectSeller = (seller) => {
    setSelectedSeller(seller);
  };

  const handleOrderSuccess = (newOrder) => {
    setSelectedProduct(null);
    setSelectedOrderForPayment(newOrder);
  };

  // Automated action triggers for all 18 demo points
  const handleTriggerDemoAction = (action, stepNum) => {
    const lakshmi = sellers.find(s => s.id === 'seller-1') || sellers[0];
    const holige = products.find(p => p.id === 'prod-1') || products[0];

    switch (action) {
      case 'STEP_1':
        setCurrentRole('CUSTOMER');
        setCustomerSearchQuery('');
        setSelectedSeller(null);
        setSelectedProduct(null);
        setSelectedOrderForPayment(null);
        showToast("Step 1: Open Namma Siri homepage", "info");
        break;

      case 'STEP_2':
        setCurrentRole('CUSTOMER');
        setCustomerSearchQuery('Holige');
        showToast("Step 2: Searching for 'Holige'...", "info");
        break;

      case 'STEP_3':
        setCurrentRole('CUSTOMER');
        setCustomerSearchQuery('Holige');
        showToast("Step 3: Found Lakshmi Home Foods in Vidyanagar", "info");
        break;

      case 'STEP_4':
        setCurrentRole('CUSTOMER');
        setSelectedSeller(lakshmi);
        showToast("Step 4: Opened Lakshmi Home Foods catalogue", "info");
        break;

      case 'STEP_5':
        setCurrentRole('CUSTOMER');
        setSelectedSeller(null);
        setSelectedProduct({ product: holige, seller: lakshmi });
        showToast("Step 5: Order request modal opened for Dharwad Bele Holige", "info");
        break;

      case 'STEP_6':
        setCurrentRole('SELLER');
        setActiveSellerId('seller-1');
        setSelectedSeller(null);
        setSelectedProduct(null);
        showToast("Step 6: Seller receives incoming order request in Hub", "info");
        break;

      case 'STEP_7': {
        setCurrentRole('SELLER');
        setActiveSellerId('seller-1');
        const reqOrder = orders.find(o => o.sellerId === 'seller-1' && o.status === 'REQUESTED');
        if (reqOrder) {
          updateOrderStatus(reqOrder.id, 'ACCEPTED');
          showToast(`Step 7: Seller accepted order #${reqOrder.id}`, "success");
        } else {
          showToast("Step 7: Order accepted by seller", "info");
        }
        break;
      }

      case 'STEP_8': {
        setCurrentRole('CUSTOMER');
        const pendingPaymentOrder = orders.find(o => o.sellerId === 'seller-1' && (o.status === 'ACCEPTED' || o.status === 'READY'));
        if (pendingPaymentOrder) {
          setSelectedOrderForPayment(pendingPaymentOrder);
        } else if (orders.length > 0) {
          setSelectedOrderForPayment(orders[0]);
        }
        showToast("Step 8: Customer sees UPI QR payment modal", "info");
        break;
      }

      case 'STEP_9':
        setCurrentRole('DELIVERY');
        setSelectedOrderForPayment(null);
        showToast("Step 9: Delivery partner sees delivery requests", "info");
        break;

      case 'STEP_10': {
        setCurrentRole('DELIVERY');
        const availableJob = orders.find(o => o.orderType === 'DELIVERY' && ['ACCEPTED', 'READY'].includes(o.status) && !o.deliveryPartnerId);
        if (availableJob) {
          assignDeliveryPartner(availableJob.id, activePartner.id);
          updateOrderStatus(availableJob.id, 'PICKUP PENDING');
          showToast(`Step 10: Delivery partner accepted #${availableJob.id}`, "success");
        } else {
          showToast("Step 10: Delivery partner assigned", "info");
        }
        break;
      }

      case 'STEP_11': {
        setCurrentRole('DELIVERY');
        const partnerJob = orders.find(o => o.deliveryPartnerId === activePartner.id && o.status !== 'DELIVERED');
        if (partnerJob) {
          if (partnerJob.status === 'PICKUP PENDING' || partnerJob.status === 'READY') {
            updateOrderStatus(partnerJob.id, 'PICKED UP');
            showToast(`Step 11: Picked up #${partnerJob.id} from seller`, "info");
          } else if (partnerJob.status === 'PICKED UP') {
            updateOrderStatus(partnerJob.id, 'OUT_FOR_DELIVERY');
            showToast(`Step 11: Out for delivery to customer destination`, "info");
          }
        }
        break;
      }

      case 'STEP_12': {
        setCurrentRole('DELIVERY');
        const activeJob = orders.find(o => o.deliveryPartnerId === activePartner.id && o.status !== 'DELIVERED');
        if (activeJob) {
          updateOrderStatus(activeJob.id, 'DELIVERED');
          showToast(`Step 12: Order #${activeJob.id} confirmed DELIVERED!`, "success");
        }
        break;
      }

      case 'STEP_13':
        setCurrentRole('SELLER');
        setActiveSellerId('seller-1');
        showToast("Step 13: Seller dashboard monthly earnings & ledger updated", "info");
        break;

      case 'STEP_14':
        setCurrentRole('SELLER');
        setActiveSellerId('seller-1');
        setSellerStatus('seller-1', 'TEMPORARILY CLOSED', 'Temporarily closed until 15 October due to family function.');
        showToast("Step 14: Seller set status to TEMPORARILY CLOSED", "warning");
        break;

      case 'STEP_15':
        setCurrentRole('CUSTOMER');
        setSelectedSeller(lakshmi);
        showToast("Step 15: Customer views unavailable notice (orders blocked)", "warning");
        break;

      case 'STEP_16':
        setCurrentRole('SELLER');
        setActiveSellerId('seller-1');
        setSelectedSeller(null);
        setSellerStatus('seller-1', 'OPEN', '');
        createFestivalOffer('seller-1', {
          festivalName: 'Deepavali Special',
          title: 'Deepavali Holige & Savoury Combo',
          discountDesc: '₹250 → ₹220 per box of 10 Holige',
          originalPrice: 250,
          offerPrice: 220,
          validUntil: '2026-11-20'
        });
        showToast("Step 16: Seller published Deepavali Special offer", "success");
        break;

      case 'STEP_17': {
        setCurrentRole('SELLER');
        setActiveSellerId('seller-1');
        const offer = (lakshmi.festivalOffers && lakshmi.festivalOffers[0]) || {
          festivalName: 'Deepavali Special',
          title: 'Deepavali Holige Combo',
          discountDesc: '₹250 → ₹220 per box',
          originalPrice: 250,
          offerPrice: 220
        };
        setPosterContext({ seller: lakshmi, offer });
        setShowPosterModal(true);
        showToast("Step 17: Generated shareable marketing poster", "info");
        break;
      }

      case 'STEP_18': {
        setCurrentRole('CUSTOMER');
        setShowPosterModal(false);
        const text = encodeURIComponent(
          `Check out Lakshmi Home Foods on Namma Siri!\n\n` +
          `*Dharwad Bele Holige (Puran Poli)*\n` +
          `Price: ₹250 (Pack of 10)\n` +
          `Location: Vidyanagar, Hubballi-Dharwad\n\n` +
          `View product: https://nammasiri.hubballi/s/seller-1`
        );
        window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
        showToast("Step 18: Shared product on WhatsApp!", "success");
        break;
      }

      default:
        break;
    }
  };

  return (
    <div className="app-container">
      {/* Main Header with Navigation & Role Switcher */}
      <Header
        onOpenRoadmap={() => setShowRoadmap(true)}
        onOpenAbout={() => setShowAbout(true)}
        onOpenSupport={() => setShowSupportModal(true)}
        onOpenVoiceModal={() => setShowVoiceModal(true)}
        onOpenAuth={(mode) => {
          setAuthMode(mode || 'login');
          setShowAuthModal(true);
        }}
      />

      {/* DISTINCT COMPARTMENT NAVIGATOR (CUSTOMER SIDE vs BUSINESS OWNER vs SISTERHOOD vs DELIVERY) */}
      <CompartmentSwitcher />

      {/* Customer Quick Order Status Drawer Button */}
      {currentRole === 'CUSTOMER' && (
        <div style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid var(--border-color)',
          padding: '0.5rem 1rem'
        }}>
          <div style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8125rem'
          }}>
            <span style={{ color: 'var(--text-muted)' }}>
              Browsing as <strong>Customer (Hubballi-Dharwad)</strong>
            </span>

            <button
              onClick={() => setShowCustomerOrders(!showCustomerOrders)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <ShoppingBag size={13} color="var(--accent)" />
              <span>My Orders & UPI Receipts ({orders.length})</span>
            </button>
          </div>
        </div>
      )}

      {/* Customer Orders Drawer */}
      {currentRole === 'CUSTOMER' && showCustomerOrders && (
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          padding: '1rem'
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Recent Order Requests & UPI Receipts</h3>
              <button onClick={() => setShowCustomerOrders(false)} className="close-btn"><X size={16} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
              {orders.slice(0, 4).map(o => (
                <div key={o.id} className="card" style={{ fontSize: '0.8125rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <strong>#{o.id}</strong>
                    <span className={`badge ${o.status === 'DELIVERED' ? 'badge-open' : o.status === 'ACCEPTED' ? 'badge-accent' : 'badge-neutral'}`}>
                      {o.status}
                    </span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    {o.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.4rem' }}>
                    <span>Amount: <strong>₹{o.totalAmount}</strong></span>
                    {o.paymentStatus === 'PAID' ? (
                      <span className="badge badge-open">Paid via UPI</span>
                    ) : (
                      <button
                        onClick={() => setSelectedOrderForPayment(o)}
                        className="btn btn-primary btn-sm"
                        style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                      >
                        Pay ₹{o.totalAmount} (UPI)
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Body depending on active role */}
      <main className="main-content">
        {currentRole === 'CUSTOMER' && (
          <CustomerDiscovery
            onSelectProduct={handleSelectProduct}
            onSelectSeller={handleSelectSeller}
            externalSearchQuery={customerSearchQuery}
            onOpenVoiceModal={() => setShowVoiceModal(true)}
            onOpenAuth={(mode) => {
              setAuthMode(mode || 'register');
              setShowAuthModal(true);
            }}
          />
        )}

        {currentRole === 'SELLER' && (
          <SellerDashboard />
        )}

        {currentRole === 'COMMUNITY' && (
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '1.5rem 1rem' }}>
            <CommunitySection />
          </div>
        )}

        {currentRole === 'DELIVERY' && (
          <DeliveryDashboard />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        backgroundColor: '#ffffff',
        padding: '1.5rem 1rem',
        marginTop: 'auto',
        fontSize: '0.8125rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <strong>Namma Siri</strong> • Digital Commerce Infrastructure for Women-Led Local Businesses
            <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.2rem' }}>
              Built for Hubballi-Dharwad • Connecting home food, Kasuti craft, tailoring, and celebration services
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={() => setShowRoadmap(true)}
              style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 600 }}
            >
              Future Vision Roadmap &rarr;
            </button>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {selectedSeller && (
        <SellerProfileModal
          seller={selectedSeller}
          onClose={() => setSelectedSeller(null)}
          onOrderClick={(prod, sel) => {
            setSelectedSeller(null);
            handleSelectProduct(prod, sel);
          }}
        />
      )}

      {selectedProduct && (
        <OrderModal
          product={selectedProduct.product}
          seller={selectedProduct.seller}
          onClose={() => setSelectedProduct(null)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {selectedOrderForPayment && (
        <PaymentModal
          order={selectedOrderForPayment}
          onClose={() => setSelectedOrderForPayment(null)}
        />
      )}

      {showRoadmap && (
        <FutureVisionModal
          onClose={() => setShowRoadmap(false)}
        />
      )}

      {showAbout && (
        <AboutUsModal
          onClose={() => setShowAbout(false)}
        />
      )}

      {showSupportModal && (
        <CustomerSupportModal
          onClose={() => setShowSupportModal(false)}
        />
      )}

      {showAuthModal && (
        <AuthModal
          initialMode={authMode}
          onClose={() => setShowAuthModal(false)}
          onOpenVoiceModal={() => {
            setShowAuthModal(false);
            setShowVoiceModal(true);
          }}
          onLogin={(user, newSeller) => {
            loginUser(user, newSeller);
            setShowAuthModal(false);
          }}
        />
      )}

      {showVoiceModal && (
        <VoiceRegistrationModal
          onClose={() => setShowVoiceModal(false)}
          onRegisterSuccess={(user, newSeller) => {
            loginUser(user, newSeller);
            setShowVoiceModal(false);
          }}
        />
      )}

      {showPosterModal && posterContext && (
        <PosterGeneratorModal
          seller={posterContext.seller}
          product={posterContext.product}
          offer={posterContext.offer}
          onClose={() => setShowPosterModal(false)}
        />
      )}

      {/* Floating Sakhi Help Desk Button */}
      <button
        onClick={() => setShowSupportModal(true)}
        style={{
          position: 'fixed',
          bottom: '1.25rem',
          right: '1.25rem',
          zIndex: 999,
          backgroundColor: '#be185d',
          color: '#ffffff',
          border: 'none',
          borderRadius: '2rem',
          padding: '0.6rem 1.15rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 4px 14px rgba(190, 24, 93, 0.45)',
          cursor: 'pointer',
          fontWeight: 700,
          fontSize: '0.825rem',
          transition: 'transform 0.15s ease'
        }}
        title="Need help? Chat with Sakhi Support"
      >
        <span style={{ fontSize: '1.1rem' }}>🌸</span>
        <span>Sakhi Help Desk</span>
      </button>

      {/* Floating Toast Notifications */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
