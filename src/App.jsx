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
import DemoWalkthroughBar from './components/DemoWalkthroughBar';
import { ShoppingBag, CreditCard, Clock, CheckCircle2, ChevronRight, X } from 'lucide-react';

export default function App() {
  const {
    currentRole,
    sellers,
    products,
    orders,
    activeSeller,
    setActiveSellerId,
    setCurrentRole,
    toasts
  } = useApp();

  // Modals state
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrderForPayment, setSelectedOrderForPayment] = useState(null);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showCustomerOrders, setShowCustomerOrders] = useState(false);

  // Customer placed orders (for customer view tracking)
  const customerOrders = orders.filter(o => o.customerPhone === '+91 98450 11223' || o.id === 'ORD-9412' || o.id === 'ORD-9413');

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

  // Automated action triggers from demo bar
  const handleTriggerDemoAction = (action) => {
    if (action === 'PLACE_ORDER') {
      const lakshmi = sellers.find(s => s.id === 'seller-1');
      const holige = products.find(p => p.id === 'prod-1');
      if (lakshmi && holige) {
        setSelectedProduct({ product: holige, seller: lakshmi });
      }
    } else if (action === 'OPEN_CATALOGUE') {
      const lakshmi = sellers.find(s => s.id === 'seller-1');
      if (lakshmi) setSelectedSeller(lakshmi);
    } else if (action === 'PAY_UPI') {
      const pendingOrder = orders.find(o => o.status === 'ACCEPTED' || o.status === 'REQUESTED');
      if (pendingOrder) setSelectedOrderForPayment(pendingOrder);
    }
  };

  return (
    <div className="app-container">
      {/* 18-Step Live Demo Scenario Navigation */}
      <DemoWalkthroughBar onTriggerDemoAction={handleTriggerDemoAction} />

      {/* Main Header with Role Switcher */}
      <Header onOpenRoadmap={() => setShowRoadmap(true)} />

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

      {/* Customer Orders Drawer / Panel */}
      {currentRole === 'CUSTOMER' && showCustomerOrders && (
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          padding: '1rem'
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Recent Order Requests & UPI Status</h3>
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
          />
        )}

        {currentRole === 'SELLER' && (
          <SellerDashboard />
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
            <strong>Sakhi Market</strong> • Digital Commerce Infrastructure for Women-Led Local Businesses
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
