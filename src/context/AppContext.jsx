import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_SELLERS,
  INITIAL_PRODUCTS,
  INITIAL_DELIVERY_PARTNERS,
  INITIAL_ORDERS,
  INITIAL_METRICS
} from '../data/seedData';
import { TRANSLATIONS } from '../utils/translations';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Load from localStorage or seed
  const [sellers, setSellers] = useState(() => {
    const saved = localStorage.getItem('sakhi_sellers');
    return saved ? JSON.parse(saved) : INITIAL_SELLERS;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('sakhi_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('sakhi_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [deliveryPartners, setDeliveryPartners] = useState(() => {
    const saved = localStorage.getItem('sakhi_delivery_partners');
    return saved ? JSON.parse(saved) : INITIAL_DELIVERY_PARTNERS;
  });

  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('sakhi_role') || 'CUSTOMER'; // CUSTOMER, SELLER, DELIVERY
  });

  const [activeSellerId, setActiveSellerId] = useState('seller-1'); // Default: Lakshmi Home Foods
  const [activeDeliveryPartnerId, setActiveDeliveryPartnerId] = useState('partner-1'); // Default: Basavaraj
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [toasts, setToasts] = useState([]);

  // Auth state
  const [currentUser, setCurrentUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ns_current_user') || 'null'); } catch { return null; }
  });

  // Persist state changes
  useEffect(() => {
    localStorage.setItem('sakhi_sellers', JSON.stringify(sellers));
  }, [sellers]);

  useEffect(() => {
    localStorage.setItem('sakhi_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sakhi_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('sakhi_delivery_partners', JSON.stringify(deliveryPartners));
  }, [deliveryPartners]);

  useEffect(() => {
    localStorage.setItem('sakhi_role', currentRole);
  }, [currentRole]);

  // Festival Demand Intelligence State
  const [festivalDemandState, setFestivalDemandState] = useState(() => {
    try {
      const saved = localStorage.getItem('sakhi_festival_demand');
      return saved ? JSON.parse(saved) : {
        festivalName: 'DASARA 2026',
        daysRemaining: 12,
        demandForecastPct: 82,
        expectedOrders: 120,
        inventoryCapacity: 75,
        recommendedInventory: 45,
        potentialShortfall: 45,
        preOrdersCount: 0,
        campaignLaunched: false,
        inventoryPrepared: false
      };
    } catch {
      return {
        festivalName: 'DASARA 2026',
        daysRemaining: 12,
        demandForecastPct: 82,
        expectedOrders: 120,
        inventoryCapacity: 75,
        recommendedInventory: 45,
        potentialShortfall: 45,
        preOrdersCount: 0,
        campaignLaunched: false,
        inventoryPrepared: false
      };
    }
  });

  useEffect(() => {
    localStorage.setItem('sakhi_festival_demand', JSON.stringify(festivalDemandState));
  }, [festivalDemandState]);

  const updateFestivalDemandState = (updates) => {
    setFestivalDemandState(prev => ({ ...prev, ...updates }));
  };

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Auth operations
  const loginUser = (user, newSeller) => {
    setCurrentUser(user);
    localStorage.setItem('ns_current_user', JSON.stringify(user));
    if (newSeller) {
      setSellers(prev => {
        const exists = prev.find(s => s.id === newSeller.id);
        return exists ? prev : [newSeller, ...prev];
      });
    }
    const sellerId = newSeller?.id || user.sellerId;
    if (sellerId) setActiveSellerId(sellerId);
    setCurrentRole('SELLER');
    showToast(`Welcome, ${user.fullName}! Your seller hub is ready.`, 'success');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('ns_current_user');
    setCurrentRole('CUSTOMER');
    setActiveSellerId('seller-1');
    showToast('Logged out successfully.', 'info');
  };

  // Seller Operations
  const updateSeller = (sellerId, updates) => {
    setSellers(prev => prev.map(s => s.id === sellerId ? { ...s, ...updates } : s));
    showToast("Seller profile updated successfully.", "success");
  };

  const setSellerStatus = (sellerId, status, notice = "") => {
    setSellers(prev => prev.map(s => {
      if (s.id === sellerId) {
        return {
          ...s,
          status,
          unavailableNotice: notice
        };
      }
      return s;
    }));
    showToast(`Status set to ${status}. ${notice ? `Notice: ${notice}` : ''}`, "info");
  };

  const createFestivalOffer = (sellerId, offer) => {
    const newOffer = {
      id: `fest-${Date.now()}`,
      active: true,
      ...offer
    };
    setSellers(prev => prev.map(s => {
      if (s.id === sellerId) {
        const offers = s.festivalOffers ? [...s.festivalOffers, newOffer] : [newOffer];
        return { ...s, festivalOffers: offers };
      }
      return s;
    }));
    showToast(`Festival offer for "${offer.festivalName}" published!`, "success");
    return newOffer;
  };

  // Product Operations
  const addProduct = (productData) => {
    const newProd = {
      id: `prod-${Date.now()}`,
      availability: true,
      sellerId: activeSellerId,
      ...productData
    };
    setProducts(prev => [newProd, ...prev]);
    showToast(`Added "${newProd.name}" to catalogue.`, "success");
    return newProd;
  };

  const updateProduct = (productId, updates) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, ...updates } : p));
    showToast("Product updated.", "info");
  };

  const toggleProductAvailability = (productId) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const next = !p.availability;
        showToast(`${p.name} marked as ${next ? 'Available' : 'Out of Stock'}.`, 'info');
        return { ...p, availability: next };
      }
      return p;
    }));
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast("Product removed from catalogue.", "info");
  };

  // Order Operations
  const createOrder = (orderPayload) => {
    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: `ORD-${orderNumber}`,
      createdAt: new Date().toISOString(),
      status: "REQUESTED", // REQUESTED, ACCEPTED, REJECTED, READY, OUT_FOR_DELIVERY, DELIVERED, CANCELLED
      paymentStatus: "PENDING", // PENDING, PAID
      paymentMethod: "UPI",
      deliveryPartnerId: null,
      deliveryPartnerName: null,
      deliveryPartnerPhone: null,
      ...orderPayload
    };

    setOrders(prev => [newOrder, ...prev]);
    showToast(`Order request #${newOrder.id} sent to seller for approval!`, "success");
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus, extraNotes = "") => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: newStatus,
          statusNotes: extraNotes || o.statusNotes,
          updatedAt: new Date().toISOString()
        };
      }
      return o;
    }));
    showToast(`Order #${orderId} marked as ${newStatus}`, "info");
  };

  const markPaymentCompleted = (orderId) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          paymentStatus: "PAID",
          paidAt: new Date().toISOString()
        };
      }
      return o;
    }));
    showToast(`Payment recorded for #${orderId}.`, "success");
  };

  const assignDeliveryPartner = (orderId, partnerId) => {
    const partner = deliveryPartners.find(p => p.id === partnerId);
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: "OUT_FOR_DELIVERY",
          deliveryPartnerId: partnerId,
          deliveryPartnerName: partner ? partner.name : "Local Partner",
          deliveryPartnerPhone: partner ? partner.phone : ""
        };
      }
      return o;
    }));
    showToast(`Delivery partner ${partner?.name || ''} assigned to #${orderId}`, "success");
  };

  const updateDeliveryPartnerStatus = (partnerId, status) => {
    setDeliveryPartners(prev => prev.map(p => p.id === partnerId ? { ...p, status } : p));
    showToast(`Partner status set to ${status}`, "info");
  };

  const registerDeliveryPartner = (data) => {
    const newPartner = {
      id: `partner-${Date.now()}`,
      status: 'AVAILABLE',
      completedDeliveries: 0,
      rating: 5.0,
      ...data
    };
    setDeliveryPartners(prev => [...prev, newPartner]);
    showToast("Delivery partner registered successfully!", "success");
    return newPartner;
  };

  // Reset to original demo data
  const resetDemoData = () => {
    localStorage.removeItem('sakhi_sellers');
    localStorage.removeItem('sakhi_products');
    localStorage.removeItem('sakhi_orders');
    localStorage.removeItem('sakhi_delivery_partners');
    setSellers(INITIAL_SELLERS);
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setDeliveryPartners(INITIAL_DELIVERY_PARTNERS);
    setActiveSellerId('seller-1');
    setActiveDeliveryPartnerId('partner-1');
    showToast("Reset to initial Hubballi-Dharwad demo dataset.", "info");
  };

  // Dynamic calculations for Active Seller metrics
  const activeSeller = sellers.find(s => s.id === activeSellerId) || sellers[0];
  const activeSellerOrders = orders.filter(o => o.sellerId === activeSellerId);
  const activePartner = deliveryPartners.find(p => p.id === activeDeliveryPartnerId) || deliveryPartners[0];

  // Base metrics combined with live order changes
  const liveCompletedOrders = activeSellerOrders.filter(o => o.status === "DELIVERED");
  const livePendingOrders = activeSellerOrders.filter(o => o.status !== "DELIVERED" && o.status !== "REJECTED" && o.status !== "CANCELLED");
  const liveTotalSales = activeSellerOrders
    .filter(o => o.status === "DELIVERED")
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  // Combine seeded historical metrics with live dynamic data
  const calculatedMetrics = {
    monthlySales: INITIAL_METRICS.monthlySales + (liveTotalSales > 1180 ? liveTotalSales - 1180 : 0),
    monthlyOrders: INITIAL_METRICS.monthlyOrders + Math.max(0, activeSellerOrders.length - 2),
    completedOrders: INITIAL_METRICS.completedOrders + Math.max(0, liveCompletedOrders.length - 2),
    pendingOrders: livePendingOrders.length,
    todayOrders: livePendingOrders.length + 2,
    todaySales: 1180 + liveTotalSales
  };

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  return (
    <AppContext.Provider value={{
      currentUser,
      loginUser,
      logoutUser,
      sellers,
      products,
      orders,
      deliveryPartners,
      currentRole,
      setCurrentRole,
      activeSellerId,
      setActiveSellerId,
      activeSeller,
      activePartner,
      activeDeliveryPartnerId,
      setActiveDeliveryPartnerId,
      currentLanguage,
      setCurrentLanguage,
      t,
      toasts,
      showToast,
      updateSeller,
      setSellerStatus,
      createFestivalOffer,
      addProduct,
      updateProduct,
      toggleProductAvailability,
      deleteProduct,
      createOrder,
      updateOrderStatus,
      markPaymentCompleted,
      assignDeliveryPartner,
      updateDeliveryPartnerStatus,
      registerDeliveryPartner,
      resetDemoData,
      calculatedMetrics,
      festivalDemandState,
      updateFestivalDemandState
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
