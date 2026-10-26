// Wholesale Hub Mock Data Store & Master Catalog (Authentic Nigerian FMCG Products)

export const INITIAL_CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'ShoppingBag' },
  { id: 'rice-grains', name: 'Rice & Grains', icon: 'Wheat' },
  { id: 'swallows-flour', name: 'Semolina & Swallows', icon: 'Utensils' },
  { id: 'packaged-foods', name: 'Packaged Foods', icon: 'Package' },
  { id: 'kitchen-utensils', name: 'Kitchen & Utensils', icon: 'UtensilsCrossed' },
  { id: 'pantries', name: 'Pantries & Provisions', icon: 'Boxes' },
  { id: 'electronics', name: 'Appliances & Electronics', icon: 'Tv' },
  { id: 'baby-care', name: 'Baby Diapers & Care', icon: 'Baby' },
  { id: 'beverages', name: 'Beverages', icon: 'Coffee' },
  { id: 'cooking-ingredients', name: 'Cooking Ingredients', icon: 'Flame' },
  { id: 'snacks', name: 'Snacks & Biscuits', icon: 'Cookie' },
  { id: 'household-provisions', name: 'Household Cleaning', icon: 'Sparkles' }
];

export const LAGOS_ZONES = [
  { id: 'ikeja', name: 'Ikeja & Mainland Central', fee: 2500, freeThreshold: 150000, estimatedTime: '2 - 4 hours' },
  { id: 'surulere', name: 'Surulere, Yaba & Ebute Metta', fee: 2500, freeThreshold: 150000, estimatedTime: '3 - 5 hours' },
  { id: 'island', name: 'Victoria Island, Ikoyi & Lagos Island', fee: 3500, freeThreshold: 180000, estimatedTime: '3 - 5 hours' },
  { id: 'lekki', name: 'Lekki Phase 1 to Chevron / Ajah', fee: 4000, freeThreshold: 200000, estimatedTime: '4 - 6 hours' },
  { id: 'alimosho', name: 'Alimosho, Egbeda, Agege & Ipaja', fee: 3000, freeThreshold: 160000, estimatedTime: '3 - 5 hours' },
  { id: 'festac', name: 'Festac, Amuwo Odofin & Trade Fair', fee: 3500, freeThreshold: 180000, estimatedTime: '3 - 5 hours' },
  { id: 'ikorodu', name: 'Ketu, Ojota, Maryland & Ikorodu', fee: 4500, freeThreshold: 220000, estimatedTime: 'Same Day' }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: "Mama's Pride Parboiled Rice 50kg",
    category: 'rice-grains',
    packSize: '50kg Bag (Premium Nigerian Long Grain)',
    unit: 'Bag',
    retailPrice: 82000,
    wholesalePrice: 77500,
    wholesaleMinQty: 2,
    stock: 45,
    images: [
      'https://www-konga-com-res.cloudinary.com/media/catalog/product/T/S/221661_1766198982.jpg',
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80'
    ],
    image: 'https://www-konga-com-res.cloudinary.com/media/catalog/product/T/S/221661_1766198982.jpg',
    badge: 'Best Seller',
    featured: true,
    description: 'Stone-free, high-yielding parboiled long grain Nigerian rice, freshly bagged from quality mills.'
  },
  {
    id: 'prod-2',
    name: 'Indomie Instant Noodles (Chicken Flavour - 70g)',
    category: 'packaged-foods',
    packSize: 'Carton of 40 packs x 70g (Original Pack)',
    unit: 'Carton',
    retailPrice: 19500,
    wholesalePrice: 18200,
    wholesaleMinQty: 3,
    stock: 120,
    images: [
      'https://www-konga-com-res.cloudinary.com/media/catalog/product/K/M/243425_1755718857.jpg',
      'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&q=80'
    ],
    image: 'https://www-konga-com-res.cloudinary.com/media/catalog/product/K/M/243425_1755718857.jpg',
    badge: 'High Turnover',
    featured: true,
    description: "Original Nigerian chicken taste with aromatic spice and chili oil sachets. Nigeria's staple family carton."
  },
  {
    id: 'prod-3',
    name: "Devon King's Pure Vegetable Cooking Oil 25L",
    category: 'cooking-ingredients',
    packSize: '25 Litres Sealed Food-Grade Jerrycan',
    unit: 'Keg',
    retailPrice: 58000,
    wholesalePrice: 54500,
    wholesaleMinQty: 2,
    stock: 35,
    images: [
      'https://www-konga-com-res.cloudinary.com/media/catalog/product/M/P/224392_1751709659.jpg',
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80'
    ],
    image: 'https://www-konga-com-res.cloudinary.com/media/catalog/product/M/P/224392_1751709659.jpg',
    badge: 'Cholesterol Free',
    featured: true,
    description: 'Triple-refined clear vegetable cooking oil fortified with Vitamin A. Clear, odorless, and perfect for industrial and domestic frying.'
  },
  {
    id: 'prod-4',
    name: 'MasterChef Non-Stick Granistone Cookware Set (7-Piece)',
    category: 'kitchen-utensils',
    packSize: 'Complete 7-Piece Premium Box with Tempered Glass Lids',
    unit: 'Box',
    retailPrice: 46000,
    wholesalePrice: 39500,
    wholesaleMinQty: 2,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1584990347449-39908cfd145c?w=600&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1584990347449-39908cfd145c?w=600&q=80',
    badge: 'Supermarket Special',
    featured: true,
    description: 'Heavy gauge forged aluminum cookware with granite non-stick coating. Induction bottom and heat-resistant silicone handles.'
  }
];

export const INITIAL_USER = {
  id: 'usr-lagos-842',
  fullName: 'Alhaji Musa Adeleke',
  email: 'musa.adeleke@lagoscommerce.ng',
  phone: '+234 803 456 7890',
  businessName: 'Adeleke Mega Provisions & Superstores',
  accountTier: 'Verified Wholesale Distributor',
  savedAddresses: [
    {
      id: 'addr-1',
      title: 'Main Ikeja Provision Hub',
      street: '42 Toyin Street, opposite First Bank',
      landmark: 'Near Allen Avenue junction',
      zoneId: 'ikeja',
      zoneName: 'Ikeja & Mainland Central',
      phone: '+234 803 456 7890',
      isDefault: true
    },
    {
      id: 'addr-2',
      title: 'Lekki Residence & Store',
      street: 'Plot 14 Admiralty Way, Block B',
      landmark: 'Beside Farm City',
      zoneId: 'lekki',
      zoneName: 'Lekki Phase 1 to Chevron / Ajah',
      phone: '+234 802 998 1122',
      isDefault: false
    }
  ]
};

export const INITIAL_ORDERS = [
  {
    id: 'WH-88412',
    date: '2026-10-20T10:30:00Z',
    customerName: 'Alhaji Musa Adeleke',
    phone: '+234 803 456 7890',
    deliveryAddress: '42 Toyin Street, Ikeja, Lagos',
    zoneName: 'Ikeja & Mainland Central',
    items: [
      {
        id: 'prod-1',
        name: "Mama's Pride Parboiled Rice 50kg",
        packSize: '50kg Bag',
        price: 77500,
        qty: 3,
        isWholesale: true,
        image: 'https://www-konga-com-res.cloudinary.com/media/catalog/product/T/S/221661_1766198982.jpg'
      },
      {
        id: 'prod-2',
        name: 'Indomie Instant Noodles (Super Pack)',
        packSize: 'Carton of 40x120g',
        price: 18100,
        qty: 5,
        isWholesale: true,
        image: 'https://www-konga-com-res.cloudinary.com/media/catalog/product/K/M/243425_1755718857.jpg'
      }
    ],
    subtotal: 323000,
    wholesaleSavings: 20500,
    deliveryFee: 0,
    total: 323000,
    paymentMethod: 'Paystack Card Online',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    driverContact: 'Sunday Babatunde (Van #LAG-422-EK)'
  },
  {
    id: 'WH-89104',
    date: '2026-10-22T09:15:00Z',
    customerName: 'Alhaji Musa Adeleke',
    phone: '+234 803 456 7890',
    deliveryAddress: 'Plot 14 Admiralty Way, Lekki Phase 1',
    zoneName: 'Lekki Phase 1 to Chevron / Ajah',
    items: [
      {
        id: 'prod-3',
        name: "Devon King's Pure Vegetable Cooking Oil",
        packSize: '25 Litres Keg',
        price: 54500,
        qty: 2,
        isWholesale: true,
        image: 'https://www-konga-com-res.cloudinary.com/media/catalog/product/M/P/224392_1751709659.jpg'
      },
      {
        id: 'prod-21',
        name: 'Molfix Baby Diapers Jumbo Pack (Size 3 & 4)',
        packSize: 'Carton of 4 Jumbo Packs',
        price: 34900,
        qty: 2,
        isWholesale: true,
        image: 'https://www-konga-com-res.cloudinary.com/media/catalog/product/H/D/249452_1785709170.jpg'
      },
      {
        id: 'prod-17',
        name: 'Golden Penny Semovita 10kg Bag',
        packSize: '10kg Bag',
        price: 22600,
        qty: 3,
        isWholesale: true,
        image: 'https://www-konga-com-res.cloudinary.com/media/catalog/product/F/C/210346_1687741576.jpg'
      }
    ],
    subtotal: 246500,
    wholesaleSavings: 19800,
    deliveryFee: 0,
    total: 246500,
    paymentMethod: 'Direct Bank Transfer (Confirmed)',
    paymentStatus: 'Paid',
    orderStatus: 'Dispatched',
    driverContact: 'Emeka Okafor (Truck #IKJ-903-LG)'
  }
];

export const PAYMENT_METHODS = [
  {
    id: 'paystack',
    name: 'Debit Card / Bank Transfer (Paystack)',
    description: 'Instant verification with Visa, Mastercard, Verve, or OPay',
    badge: 'Instant & Secure',
    icon: 'CreditCard'
  },
  {
    id: 'bank-transfer',
    name: 'Direct Distribution Bank Transfer',
    description: 'Transfer directly to Wholesale Hub corporate account (Providus / Zenith Bank)',
    badge: 'Popular for Wholesale',
    icon: 'Building2',
    accountDetails: {
      bankName: 'Providus Bank Nigeria',
      accountName: 'WHOLESALE HUB DISTRIBUTION LTD',
      accountNumber: '5401928491'
    }
  },
  {
    id: 'pay-on-delivery',
    name: 'Payment on Dispatch (Verified Buyers Only)',
    description: 'POS swipe or instant transfer when our Lagos logistics fleet arrives',
    badge: 'Lagos Only',
    icon: 'Truck'
  }
];

export const DEMO_WHOLESALER = {
  id: 'ws-001',
  businessName: 'Tosino Wholesale Distributors',
  ownerName: 'Tosino Adewale',
  email: 'tosino@wholesalehub.ng',
  phone: '+234 812 345 6789',
  status: 'approved',
  joinedDate: '2026-01-15',
  productsCount: 12,
  totalSales: 2850000,
  avatar: null,
  description: 'Premium FMCG distributor serving Lagos and environs since 2020.',
  tier: 'Gold Wholesaler'
};
