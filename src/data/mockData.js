// Opeyemi Foods Mock Data Store & Master Catalog

export const INITIAL_CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'ShoppingBag' },
  { id: 'rice-grains', name: 'Rice & Grains', icon: 'Wheat' },
  { id: 'packaged-foods', name: 'Packaged Foods', icon: 'Package' },
  { id: 'beverages', name: 'Beverages', icon: 'Coffee' },
  { id: 'cooking-ingredients', name: 'Cooking Ingredients', icon: 'Flame' },
  { id: 'snacks', name: 'Snacks & Biscuits', icon: 'Cookie' },
  { id: 'household-provisions', name: 'Household Provisions', icon: 'Sparkles' }
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
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    badge: 'Best Seller',
    featured: true,
    description: 'Stone-free, high-yielding parboiled long grain Nigerian rice, freshly bagged from quality mills.'
  },
  {
    id: 'prod-2',
    name: 'Indomie Instant Noodles (Super Pack)',
    category: 'packaged-foods',
    packSize: 'Carton of 40 packs x 120g',
    unit: 'Carton',
    retailPrice: 19500,
    wholesalePrice: 18100,
    wholesaleMinQty: 3,
    stock: 140,
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80',
    badge: 'Fast Mover',
    featured: true,
    description: 'Everyday household staple Indomie chicken flavour. Instant preparation with authentic seasoning.'
  },
  {
    id: 'prod-3',
    name: "Devon King's Pure Vegetable Cooking Oil",
    category: 'cooking-ingredients',
    packSize: '25 Litres Tamper-proof Jerrycan',
    unit: 'Keg',
    retailPrice: 58000,
    wholesalePrice: 54500,
    wholesaleMinQty: 2,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    badge: 'Wholesale Deal',
    featured: true,
    description: 'Naturally cholesterol-free, heart-friendly fortified vegetable cooking oil for home and commercial catering.'
  },
  {
    id: 'prod-4',
    name: 'Hollandia Evaporated Full Cream Milk',
    category: 'beverages',
    packSize: 'Carton of 24 cans x 190g',
    unit: 'Carton',
    retailPrice: 17800,
    wholesalePrice: 16200,
    wholesaleMinQty: 3,
    stock: 85,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    badge: 'Breakfast Essential',
    featured: true,
    description: 'Creamy, highly soluble evaporated milk packed with Vitamin A & D for teas, cereals, and coffees.'
  },
  {
    id: 'prod-5',
    name: 'Hypo Super Bleach & Disinfectant',
    category: 'household-provisions',
    packSize: 'Carton of 24 bottles x 500ml',
    unit: 'Carton',
    retailPrice: 18500,
    wholesalePrice: 16800,
    wholesaleMinQty: 2,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80',
    badge: 'Provisions',
    featured: false,
    description: 'Powerful surface disinfectant and fabric brightener. Destroys 99.9% of bacteria and viral germs.'
  },
  {
    id: 'prod-6',
    name: 'Golden Penny Spaghetti Cartons',
    category: 'packaged-foods',
    packSize: 'Carton of 20 packs x 500g',
    unit: 'Carton',
    retailPrice: 22000,
    wholesalePrice: 20400,
    wholesaleMinQty: 3,
    stock: 90,
    image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=600&q=80',
    badge: 'Wholesale Special',
    featured: true,
    description: 'Non-sticky durum wheat pasta rich in dietary fiber and carbohydrates for balanced family meals.'
  },
  {
    id: 'prod-7',
    name: 'Dangote Fortified Granulated Sugar',
    category: 'cooking-ingredients',
    packSize: '50kg Original Factory Sealed Bag',
    unit: 'Bag',
    retailPrice: 76000,
    wholesalePrice: 71800,
    wholesaleMinQty: 2,
    stock: 28,
    image: 'https://images.unsplash.com/photo-1622484214152-3269ca84742f?auto=format&fit=crop&w=600&q=80',
    badge: 'Factory Bag',
    featured: false,
    description: 'Pure white vitamin A fortified refined cane sugar suitable for commercial bakery and home consumption.'
  },
  {
    id: 'prod-8',
    name: 'Golden Morn Maize & Soya Cereal',
    category: 'packaged-foods',
    packSize: 'Carton of 10 bags x 800g (Family Pack)',
    unit: 'Carton',
    retailPrice: 24500,
    wholesalePrice: 22600,
    wholesaleMinQty: 2,
    stock: 52,
    image: 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=600&q=80',
    badge: 'High Protein',
    featured: false,
    description: 'Nutritious whole grain cereal fortified with iron and calcium for growing children and active adults.'
  },
  {
    id: 'prod-9',
    name: 'Milo Choco Malt Energy Drink',
    category: 'beverages',
    packSize: 'Carton of 12 refill packs x 800g',
    unit: 'Carton',
    retailPrice: 44000,
    wholesalePrice: 41200,
    wholesaleMinQty: 2,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    badge: 'Wholesale Top Pick',
    featured: true,
    description: 'The champion beverage nourishing Nigerian homes with Activ-Go, malt barley, vitamins and minerals.'
  },
  {
    id: 'prod-10',
    name: 'Gino Peppe & Onion Tomato Paste',
    category: 'cooking-ingredients',
    packSize: 'Carton of 50 sachets x 70g',
    unit: 'Carton',
    retailPrice: 14500,
    wholesalePrice: 13100,
    wholesaleMinQty: 3,
    stock: 110,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80',
    badge: 'Jollof Favorite',
    featured: true,
    description: 'Rich tomato puree infused with traditional pepper and onion spices for rich Nigerian jollof stew.'
  },
  {
    id: 'prod-11',
    name: 'Sunlight 2-in-1 Clean & Fresh Detergent',
    category: 'household-provisions',
    packSize: 'Carton of 10 packs x 900g',
    unit: 'Carton',
    retailPrice: 16000,
    wholesalePrice: 14400,
    wholesaleMinQty: 2,
    stock: 75,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80',
    badge: 'Laundry Choice',
    featured: false,
    description: 'Spring sensation laundry detergent with gentle fabric conditioner and long-lasting floral fragrance.'
  },
  {
    id: 'prod-12',
    name: 'Minimie Chin Chin Crunchy Snack',
    category: 'snacks',
    packSize: 'Display Carton of 48 packs x 45g',
    unit: 'Carton',
    retailPrice: 11000,
    wholesalePrice: 9750,
    wholesaleMinQty: 3,
    stock: 95,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80',
    badge: 'School & Office',
    featured: false,
    description: 'Crunchy sweet chin chin bites in hygienic individual packs, perfect for retail resale or party snacking.'
  },
  {
    id: 'prod-13',
    name: 'Crispy White Ijebu Garri (Grade A)',
    category: 'rice-grains',
    packSize: '50kg Bag (Sour & Clean)',
    unit: 'Bag',
    retailPrice: 38000,
    wholesalePrice: 34800,
    wholesaleMinQty: 2,
    stock: 65,
    image: 'https://images.unsplash.com/photo-1607672632458-9eb56696346b?auto=format&fit=crop&w=600&q=80',
    badge: 'Original Ijebu',
    featured: false,
    description: 'Authentic fermented Ijebu cassava flakes. Extremely crisp, fine-grained, with signature mild tangy taste.'
  },
  {
    id: 'prod-14',
    name: 'Morning Fresh Dishwashing Liquid',
    category: 'household-provisions',
    packSize: 'Carton of 12 bottles x 1 Litre (Zesty Lemon)',
    unit: 'Carton',
    retailPrice: 21000,
    wholesalePrice: 19100,
    wholesaleMinQty: 2,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1585830812416-a6c86bb14576?auto=format&fit=crop&w=600&q=80',
    badge: 'Top Cleaning',
    featured: false,
    description: 'Superior grease-cutting formula. One drop produces rich cleansing lather for tough kitchen stains.'
  }
];

export const INITIAL_USER = {
  id: 'usr-lagos-842',
  fullName: 'Alhaji Opeyemi Adeleke',
  email: 'opeyemi.adeleke@lagoscommerce.ng',
  phone: '+234 803 456 7890',
  businessName: 'Adeleke Mega Retailers & Kitchens',
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
      title: 'Lekki Residence & Cafe',
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
    id: 'OPY-88412',
    date: '2026-10-20T10:30:00Z',
    customerName: 'Alhaji Opeyemi Adeleke',
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
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'prod-2',
        name: 'Indomie Instant Noodles (Super Pack)',
        packSize: 'Carton of 40x120g',
        price: 18100,
        qty: 5,
        isWholesale: true,
        image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 323000,
    wholesaleSavings: 20500,
    deliveryFee: 0, // Free over threshold
    total: 323000,
    paymentMethod: 'Paystack Card Online',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered', // Delivered, Dispatched, Processing
    driverContact: 'Sunday Babatunde (Van #LAG-422-EK)'
  },
  {
    id: 'OPY-89104',
    date: '2026-10-22T09:15:00Z',
    customerName: 'Alhaji Opeyemi Adeleke',
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
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'prod-4',
        name: 'Hollandia Evaporated Full Cream Milk',
        packSize: 'Carton of 24 cans',
        price: 16200,
        qty: 4,
        isWholesale: true,
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'prod-10',
        name: 'Gino Peppe & Onion Tomato Paste',
        packSize: 'Carton of 50 sachets',
        price: 13100,
        qty: 3,
        isWholesale: true,
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 213100,
    wholesaleSavings: 17600,
    deliveryFee: 0,
    total: 213100,
    paymentMethod: 'Direct Bank Transfer (Confirmed)',
    paymentStatus: 'Paid',
    orderStatus: 'Dispatched',
    driverContact: 'Emeka Eze (Delivery Van #KJA-918-XU)'
  }
];

export const PAYMENT_METHODS = [
  {
    id: 'paystack',
    name: 'Paystack Gateway',
    description: 'Pay instantly with Debit Card, USSD (*737#, *966#), Bank Transfer, or Apple Pay',
    badge: 'Instant Auto-Verify',
    icon: 'CreditCard'
  },
  {
    id: 'flutterwave',
    name: 'Flutterwave',
    description: 'Debit Card, Barter, Paga, Google Pay, or QR code payment',
    badge: 'Instant Processing',
    icon: 'Zap'
  },
  {
    id: 'bank-transfer',
    name: 'Direct Distribution Bank Transfer',
    description: 'Transfer directly to Opeyemi Foods corporate account (Providus / Zenith Bank)',
    badge: 'Popular for Wholesale',
    icon: 'Building2',
    accountDetails: {
      bankName: 'Providus Bank Nigeria',
      accountName: 'OPEYEMI FOODS & WHOLESALE DIST. LTD',
      accountNumber: '5401928491'
    }
  },
  {
    id: 'pod',
    name: 'Pay on Delivery (Verified Lagos Locations)',
    description: 'Pay via POS Terminal or Cash upon dispatch inspection by driver',
    badge: 'Lagos Mainland & Island Only',
    icon: 'Truck'
  }
];
