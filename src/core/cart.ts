// Cart utility functions for managing shopping cart state
// These functions work with window.App.store.cart

export interface CartItem {
  productId: string;
  quantity: number;
  isSubscription?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  subscriptionPrice: number;
  image: string;
  shape: string;
  isNew: boolean;
  description: string;
}

// Get current cart items
export const getCart = (): CartItem[] => {
  return window.App?.store?.cart || [];
};

// Get cart item count
export const getCartCount = (): number => {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
};

// Add item to cart
export const addToCart = (productId: string, quantity: number = 1, isSubscription: boolean = false): void => {
  if (!window.App?.store) return;

  if (!window.App.store.cart) {
    window.App.store.cart = [];
  }

  const existingItem = window.App.store.cart.find(
    (item: CartItem) => item.productId === productId && item.isSubscription === isSubscription
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    window.App.store.cart.push({ productId, quantity, isSubscription });
  }

  // Dispatch custom event for UI updates
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart: window.App.store.cart } }));
};

// Update item quantity
export const updateQuantity = (productId: string, quantity: number, isSubscription?: boolean): void => {
  if (!window.App?.store?.cart) return;

  const item = window.App.store.cart.find(
    (item: CartItem) => item.productId === productId && (isSubscription === undefined || item.isSubscription === isSubscription)
  );

  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId, isSubscription);
    } else {
      item.quantity = quantity;
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart: window.App.store.cart } }));
    }
  }
};

// Remove item from cart
export const removeFromCart = (productId: string, isSubscription?: boolean): void => {
  if (!window.App?.store?.cart) return;

  window.App.store.cart = window.App.store.cart.filter(
    (item: CartItem) => !(item.productId === productId && (isSubscription === undefined || item.isSubscription === isSubscription))
  );

  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart: window.App.store.cart } }));
};

// Clear entire cart
export const clearCart = (): void => {
  if (!window.App?.store) return;

  window.App.store.cart = [];
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart: [] } }));
};

// Calculate cart subtotal
export const getCartSubtotal = (): number => {
  const cart = getCart();
  const products = window.App?.store?.products || [];

  return cart.reduce((sum, item) => {
    const product = products.find((p: Product) => p.id === item.productId);
    if (!product) return sum;
    const price = item.isSubscription ? product.subscriptionPrice : product.price;
    return sum + (price * item.quantity);
  }, 0);
};

// Check if product is in cart
export const isInCart = (productId: string): boolean => {
  const cart = getCart();
  return cart.some(item => item.productId === productId);
};

// Custom hook for React components to use cart with reactivity
export const useCartListener = (callback: () => void): void => {
  if (typeof window !== 'undefined') {
    window.addEventListener('cartUpdated', callback);
  }
};

export const removeCartListener = (callback: () => void): void => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('cartUpdated', callback);
  }
};
