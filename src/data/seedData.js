export const INITIAL_SELLERS = [
  {
    id: "seller-1",
    name: "Lakshmi Home Foods",
    ownerName: "Lakshmi Patil",
    category: "Food",
    location: "Vidyanagar",
    address: "Opp. BVB College Main Gate, Vidyanagar, Hubballi",
    phone: "+91 98451 23456",
    upiId: "lakshmi.patil@okhdfcbank",
    description: "Authentic North Karnataka home-cooked delicacies, pure cow ghee Holige, and stone-ground chutneypudis made with mother's traditional recipes.",
    workingHours: "8:00 AM - 8:00 PM (Mon-Sat)",
    deliveryAvailable: true,
    pickupAvailable: true,
    status: "OPEN", // "OPEN" | "LIMITED ORDERS" | "TEMPORARILY CLOSED"
    unavailableNotice: "",
    rating: 4.9,
    reviewsCount: 84,
    festivalOffers: [
      {
        id: "fest-1",
        festivalName: "Deepavali Special",
        title: "Deepavali Holige & Savoury Combo",
        discountDesc: "₹250 → ₹220 per box (10 Holige + Shenga Chutney)",
        originalPrice: 250,
        offerPrice: 220,
        validUntil: "2026-11-15",
        active: true
      }
    ]
  },
  {
    id: "seller-2",
    name: "Anu's Bake House",
    ownerName: "Anuradha Kulkarni",
    category: "Baking",
    location: "Shirur Park",
    address: "Plot 42, 3rd Cross, Shirur Park, Hubballi",
    phone: "+91 97412 88921",
    upiId: "anuradha.bakes@icici",
    description: "Fresh eggless artisan cakes, tea cakes, festive hampers, and handcrafted brownies baked fresh on order.",
    workingHours: "10:00 AM - 7:00 PM (All days)",
    deliveryAvailable: true,
    pickupAvailable: true,
    status: "OPEN",
    unavailableNotice: "",
    rating: 4.8,
    reviewsCount: 62,
    festivalOffers: []
  },
  {
    id: "seller-3",
    name: "Shobha Kasuti Crafts",
    ownerName: "Shobha Hiremath",
    category: "Kasuti / Embroidery",
    location: "Keshwapur",
    address: "Near Railway Colony, Keshwapur, Hubballi",
    phone: "+91 99805 44123",
    upiId: "shobha.kasuti@sbi",
    description: "GI-tagged authentic Dharwad Kasuti hand embroidery on pure Ilkal sarees, dupattas, blouses, and kurtas. Preserving heritage stitches.",
    workingHours: "10:30 AM - 6:30 PM (Mon-Fri)",
    deliveryAvailable: true,
    pickupAvailable: true,
    status: "OPEN",
    unavailableNotice: "",
    rating: 5.0,
    reviewsCount: 95,
    festivalOffers: [
      {
        id: "fest-2",
        festivalName: "Dasara Special",
        title: "Heritage Ilkal Kasuti Saree Festive Discount",
        discountDesc: "15% off on handmade festive Ilkal sarees",
        originalPrice: 2800,
        offerPrice: 2380,
        validUntil: "2026-10-25",
        active: true
      }
    ]
  },
  {
    id: "seller-4",
    name: "Meena Tailors & Boutique",
    ownerName: "Meena Joshi",
    category: "Tailoring",
    location: "Gokul Road",
    address: "Shop 4, Near Industrial Estate, Gokul Road, Hubballi",
    phone: "+91 94481 99201",
    upiId: "meenajoshi.tailor@ybl",
    description: "Custom designer bridal blouses, maggam work, lehenga stitching, and perfect fitting for all festive occasions.",
    workingHours: "10:00 AM - 8:30 PM (Mon-Sat)",
    deliveryAvailable: false,
    pickupAvailable: true,
    status: "LIMITED ORDERS",
    unavailableNotice: "Accepting limited orders due to wedding season rush.",
    rating: 4.7,
    reviewsCount: 48,
    festivalOffers: []
  },
  {
    id: "seller-5",
    name: "Kavya Creations",
    ownerName: "Kavya Hegde",
    category: "Jewellery",
    location: "Dharwad",
    address: "Line Bazaar, Near Shivaji Circle, Dharwad",
    phone: "+91 96110 33819",
    upiId: "kavya.creations@axisbank",
    description: "Handcrafted traditional temple jewellery, silk thread bangles, terracotta accessories, and festive hair adornments.",
    workingHours: "11:00 AM - 7:00 PM (Tue-Sun)",
    deliveryAvailable: true,
    pickupAvailable: true,
    status: "OPEN",
    unavailableNotice: "",
    rating: 4.9,
    reviewsCount: 51,
    festivalOffers: []
  },
  {
    id: "seller-6",
    name: "Sakhi Catering Services",
    ownerName: "Sunita Deshpande",
    category: "Catering",
    location: "Old Hubballi",
    address: "Durgadbail Circle, Old Hubballi",
    phone: "+91 98862 11099",
    upiId: "sakhicaterers@paytm",
    description: "Hygienic traditional Brahmin & North Karnataka catering for Gruhapravesha, Seemantha, small gatherings, and festival get-togethers.",
    workingHours: "7:00 AM - 9:00 PM (All days)",
    deliveryAvailable: true,
    pickupAvailable: false,
    status: "OPEN",
    unavailableNotice: "",
    rating: 4.8,
    reviewsCount: 112,
    festivalOffers: []
  }
];

export const INITIAL_PRODUCTS = [
  // Lakshmi Home Foods
  {
    id: "prod-1",
    sellerId: "seller-1",
    name: "Dharwad Bele Holige (Puran Poli)",
    description: "Mouth-melting thin jaggery and chana dal stuffed sweet bread served with pure desi ghee. Signature Hubballi recipe.",
    price: 250,
    unit: "Pack of 10",
    category: "Food",
    availability: true,
    isQuoteBased: false,
    imageTag: "holige"
  },
  {
    id: "prod-2",
    sellerId: "seller-1",
    name: "Stone-Ground Shenga Chutney Pudi",
    description: "Crispy roasted peanut chutney powder with dry garlic and Byadagi chilli. Perfect accompaniment for Jolada Rotti.",
    price: 140,
    unit: "250g Jar",
    category: "Food",
    availability: true,
    isQuoteBased: false,
    imageTag: "chutney"
  },
  {
    id: "prod-3",
    sellerId: "seller-1",
    name: "Traditional Jolada Rotti Meal Pack",
    description: "4 Hot soft Jowar Rottis + Ennegayi (stuffed brinjal) + Shenga Chutney + curd bowl. Daily fresh home-cooked dinner.",
    price: 180,
    unit: "1 Thali Pack",
    category: "Food",
    availability: true,
    isQuoteBased: false,
    imageTag: "rotti"
  },
  {
    id: "prod-4",
    sellerId: "seller-1",
    name: "Besan Ladoo (Pure Ghee)",
    description: "Aromatic golden gram flour ladoos with roasted cashews, cardamom and pure country ghee.",
    price: 320,
    unit: "500g Box",
    category: "Festive Products",
    availability: true,
    isQuoteBased: false,
    imageTag: "ladoo"
  },

  // Anu's Bake House
  {
    id: "prod-5",
    sellerId: "seller-2",
    name: "Cardamom & Pistachio Mawa Cake",
    description: "Traditional Parsi style rich mawa cake infused with freshly crushed cardamom and Iranian pistachios. 100% Eggless.",
    price: 450,
    unit: "500g Loaf",
    category: "Baking",
    availability: true,
    isQuoteBased: false,
    imageTag: "cake"
  },
  {
    id: "prod-6",
    sellerId: "seller-2",
    name: "Custom Theme Celebration Cake",
    description: "Fresh cream or buttercream designer cake customized for birthdays, anniversaries, and family celebrations.",
    price: 650,
    unit: "1 kg Starting",
    category: "Baking",
    availability: true,
    isQuoteBased: true,
    imageTag: "customcake"
  },

  // Shobha Kasuti Crafts
  {
    id: "prod-7",
    sellerId: "seller-3",
    name: "Authentic Kasuti Hand-Embroidered Ilkal Saree",
    description: "Handcrafted intricate chariots, peacocks, and temple gopuram motifs using traditional Gavanti and Murgi stitches on pure cotton-silk Ilkal saree with Tope Teni pallu.",
    price: 2800,
    unit: "1 Saree with Blouse",
    category: "Kasuti / Embroidery",
    availability: true,
    isQuoteBased: false,
    imageTag: "saree"
  },
  {
    id: "prod-8",
    sellerId: "seller-3",
    name: "Custom Kasuti Embroidery on Client Garment",
    description: "Send your favourite plain kurta, dupatta, or blouse piece to get traditional Dharwad Kasuti motifs hand embroidered by master artisans.",
    price: 800,
    unit: "Starting per piece",
    category: "Kasuti / Embroidery",
    availability: true,
    isQuoteBased: true,
    imageTag: "embroidery"
  },

  // Meena Tailors
  {
    id: "prod-9",
    sellerId: "seller-4",
    name: "Designer Bridal Blouse Stitching",
    description: "Princess cut, deep back neck, padded, piping finish with custom latkan tassels. Perfect bridal fitting.",
    price: 550,
    unit: "1 Blouse",
    category: "Tailoring",
    availability: true,
    isQuoteBased: true,
    imageTag: "blouse"
  },
  {
    id: "prod-10",
    sellerId: "seller-4",
    name: "Salwar Kameez & Anarkali Custom Stitching",
    description: "Boutique stitching for daily or party wear suits with pant/churidar tailoring.",
    price: 450,
    unit: "1 Set",
    category: "Tailoring",
    availability: true,
    isQuoteBased: false,
    imageTag: "salwar"
  },

  // Kavya Creations
  {
    id: "prod-11",
    sellerId: "seller-5",
    name: "Handmade Temple Kemp Jewellery Choker Set",
    description: "Antique matte gold finished kemp stone choker necklace with matching jhumkas. Ideal for weddings and festivals.",
    price: 850,
    unit: "1 Set",
    category: "Jewellery",
    availability: true,
    isQuoteBased: false,
    imageTag: "jewellery"
  },
  {
    id: "prod-12",
    sellerId: "seller-5",
    name: "Silk Thread Festive Bangles Set",
    description: "Customized color silk thread bangles with Kundan stones to match your festive saree.",
    price: 350,
    unit: "Set of 4 pairs",
    category: "Jewellery",
    availability: true,
    isQuoteBased: false,
    imageTag: "bangles"
  },

  // Sakhi Catering
  {
    id: "prod-13",
    sellerId: "seller-6",
    name: "North Karnataka Festive Feast (Catering)",
    description: "Traditional banana leaf meal: Jolada Rotti, Yennegai, Shenga Holige, Kosambari, Palya, Saaru, Majjige Huli, Rice, and Curd.",
    price: 280,
    unit: "Per Person (Min 15 persons)",
    category: "Catering",
    availability: true,
    isQuoteBased: true,
    imageTag: "catering"
  }
];

export const INITIAL_DELIVERY_PARTNERS = [
  {
    id: "partner-1",
    name: "Basavaraj Korishettar",
    phone: "+91 97314 55210",
    vehicleType: "Bike", // Walk, Bike, Scooter, Auto
    assignedArea: "Vidyanagar",
    status: "AVAILABLE", // AVAILABLE, BUSY, OFFLINE
    completedDeliveries: 42,
    rating: 4.9
  },
  {
    id: "partner-2",
    name: "Pooja Hallur",
    phone: "+91 98801 77412",
    vehicleType: "Scooter",
    assignedArea: "Shirur Park",
    status: "AVAILABLE",
    completedDeliveries: 28,
    rating: 4.8
  },
  {
    id: "partner-3",
    name: "Manjunath Shettar",
    phone: "+91 94498 33201",
    vehicleType: "Auto",
    assignedArea: "Dharwad",
    status: "AVAILABLE",
    completedDeliveries: 65,
    rating: 4.9
  },
  {
    id: "partner-4",
    name: "Ravi Kumbar",
    phone: "+91 96112 40019",
    vehicleType: "Walk",
    assignedArea: "Keshwapur",
    status: "BUSY",
    completedDeliveries: 19,
    rating: 4.7
  }
];

export const INITIAL_ORDERS = [
  {
    id: "ORD-9412",
    sellerId: "seller-1",
    customerName: "Radha Deshpande",
    customerPhone: "+91 98440 12890",
    customerAddress: "Flat 204, Sriniketan Apts, Vidyanagar, Hubballi",
    items: [
      {
        productId: "prod-1",
        name: "Dharwad Bele Holige (Puran Poli)",
        price: 250,
        quantity: 2,
        unit: "Pack of 10"
      },
      {
        productId: "prod-2",
        name: "Stone-Ground Shenga Chutney Pudi",
        price: 140,
        quantity: 1,
        unit: "250g Jar"
      }
    ],
    orderType: "DELIVERY", // DELIVERY or PICKUP
    deliveryAddress: "Flat 204, Sriniketan Apts, Vidyanagar, Hubballi",
    notes: "Please deliver warm before 6 PM for evening puja.",
    status: "DELIVERED",
    totalAmount: 640,
    deliveryFee: 30,
    createdAt: "2026-10-06T14:30:00Z",
    paymentStatus: "PAID",
    paymentMethod: "UPI",
    deliveryPartnerId: "partner-1",
    deliveryPartnerName: "Basavaraj Korishettar",
    deliveryPartnerPhone: "+91 97314 55210"
  },
  {
    id: "ORD-9413",
    sellerId: "seller-1",
    customerName: "Suma Kulkarni",
    customerPhone: "+91 94480 55123",
    customerAddress: "House 12, Behind Urban Oasis Mall, Gokul Road",
    items: [
      {
        productId: "prod-3",
        name: "Traditional Jolada Rotti Meal Pack",
        price: 180,
        quantity: 3,
        unit: "1 Thali Pack"
      }
    ],
    orderType: "DELIVERY",
    deliveryAddress: "House 12, Behind Urban Oasis Mall, Gokul Road",
    notes: "Extra curd requested.",
    status: "DELIVERED",
    totalAmount: 540,
    deliveryFee: 30,
    createdAt: "2026-10-06T19:15:00Z",
    paymentStatus: "PAID",
    paymentMethod: "UPI",
    deliveryPartnerId: "partner-1",
    deliveryPartnerName: "Basavaraj Korishettar",
    deliveryPartnerPhone: "+91 97314 55210"
  },
  {
    id: "ORD-9414",
    sellerId: "seller-3",
    customerName: "Deepa Patil",
    customerPhone: "+91 98860 90211",
    customerAddress: "Near KIMS Hospital, Vidyanagar, Hubballi",
    items: [
      {
        productId: "prod-7",
        name: "Authentic Kasuti Hand-Embroidered Ilkal Saree",
        price: 2800,
        quantity: 1,
        unit: "1 Saree with Blouse"
      }
    ],
    orderType: "PICKUP",
    deliveryAddress: "Pickup from Keshwapur workshop",
    notes: "Gift packaging for wedding gift.",
    status: "DELIVERED",
    totalAmount: 2800,
    deliveryFee: 0,
    createdAt: "2026-10-05T11:00:00Z",
    paymentStatus: "PAID",
    paymentMethod: "UPI",
    deliveryPartnerId: null
  }
];

// Historical metrics seeded to fulfill the requirement:
// Monthly Sales: ₹18,450
// Orders: 127
// Completed: 121
// Pending: 6
export const INITIAL_METRICS = {
  monthlySales: 18450,
  monthlyOrders: 127,
  completedOrders: 121,
  pendingOrders: 6,
  todayOrders: 4,
  todaySales: 1180
};

export const CATEGORIES = [
  "All",
  "Food",
  "Baking",
  "Catering",
  "Tailoring",
  "Kasuti / Embroidery",
  "Handicrafts",
  "Jewellery",
  "Fashion",
  "Festive Products",
  "Other Services"
];

export const LOCATIONS = [
  "All",
  "Vidyanagar",
  "Gokul Road",
  "Keshwapur",
  "Shirur Park",
  "Dharwad",
  "Old Hubballi"
];

export const FESTIVAL_OPTIONS = [
  "Deepavali",
  "Dasara",
  "Ganesh Chaturthi",
  "Wedding Season",
  "Karaga",
  "Sankranti",
  "Local Festivals"
];
