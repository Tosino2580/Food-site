// Utility formatting functions for Nigerian Naira and dates

export const formatNaira = (amount) => {
  if (amount === undefined || amount === null) return '₦0';
  return '₦' + Math.round(amount).toLocaleString('en-NG');
};

export const formatDate = (isoString) => {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return isoString;
  }
};

// Computes item unit price based on quantity or wholesale status
export const getItemEffectivePrice = (product, quantity, forceWholesale = false) => {
  const isWholesale = forceWholesale || quantity >= (product.wholesaleMinQty || 2);
  return {
    isWholesale,
    unitPrice: isWholesale ? product.wholesalePrice : product.retailPrice,
    regularPrice: product.retailPrice,
    unitSavings: isWholesale ? Math.max(0, product.retailPrice - product.wholesalePrice) : 0
  };
};

// Calculate whole cart metrics
export const calculateCartTotals = (cartItems, selectedZone, forceWholesale = false) => {
  let subtotal = 0;
  let totalRetail = 0;
  let totalItemsCount = 0;

  cartItems.forEach((item) => {
    const { unitPrice, regularPrice } = getItemEffectivePrice(item, item.qty, forceWholesale);
    subtotal += unitPrice * item.qty;
    totalRetail += regularPrice * item.qty;
    totalItemsCount += item.qty;
  });

  const totalWholesaleSavings = Math.max(0, totalRetail - subtotal);

  // Delivery calculation
  let deliveryFee = 0;
  let isFreeDelivery = false;
  let freeThreshold = 150000;

  if (selectedZone) {
    freeThreshold = selectedZone.freeThreshold || 150000;
    if (subtotal >= freeThreshold) {
      deliveryFee = 0;
      isFreeDelivery = true;
    } else {
      deliveryFee = selectedZone.fee;
      isFreeDelivery = false;
    }
  }

  const finalTotal = subtotal + deliveryFee;
  const progressToFreeDelivery = Math.min(100, (subtotal / freeThreshold) * 100);
  const remainingForFreeDelivery = Math.max(0, freeThreshold - subtotal);

  return {
    subtotal,
    totalRetail,
    totalWholesaleSavings,
    deliveryFee,
    isFreeDelivery,
    finalTotal,
    totalItemsCount,
    freeThreshold,
    progressToFreeDelivery,
    remainingForFreeDelivery
  };
};
