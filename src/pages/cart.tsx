import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { Trash2, ArrowRight, Truck, Gift, Sparkles, CheckCircle, Minus, Plus, ShoppingBag, PartyPopper } from 'lucide-react';
import { updateQuantity, removeFromCart, clearCart, getCart } from '../core/cart';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState(getCart());
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
  const products = window.App?.store?.products || [];

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      setCartItems([...getCart()]);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  // Hydrate cart items
  const items = cartItems.map((item: any) => {
    const product = products.find((p: any) => p.id === item.productId);
    return { ...item, product };
  }).filter((item: any) => item.product);

  const subtotal = items.reduce((acc: number, item: any) => {
    const price = item.isSubscription ? item.product.subscriptionPrice : item.product.price;
    return acc + (price * item.quantity);
  }, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  // Gift Tiers
  const tiers = [
    { amount: 50, label: "FREE SHIPPING", icon: <Truck size={16} /> },
    { amount: 75, label: "MYSTERY STICKERS", icon: <Gift size={16} /> },
    { amount: 100, label: "ESSENTIAL KIT", icon: <Sparkles size={16} /> }
  ];

  const nextTier = tiers.find(t => subtotal < t.amount);
  const maxAmount = 100;
  const progressPercent = Math.min(100, (subtotal / maxAmount) * 100);

  const handleUpdateQuantity = (productId: string, newQuantity: number, isSubscription?: boolean) => {
    updateQuantity(productId, newQuantity, isSubscription);
  };

  const handleRemoveItem = (productId: string, isSubscription?: boolean) => {
    removeFromCart(productId, isSubscription);
  };

  const handleCheckout = () => {
    setShowCheckoutSuccess(true);
    clearCart();
    setTimeout(() => {
      setShowCheckoutSuccess(false);
      window.App.transitionTo('home-default');
    }, 3000);
  };

  return (
    <Layout>
      {/* Checkout Success Modal */}
      {showCheckoutSuccess && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-12 max-w-md w-full text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <PartyPopper size={48} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-black mb-4">ORDER CONFIRMED!</h2>
            <p className="text-gray-500 mb-6">
              Thank you for your order! We'll send you a confirmation email with tracking details soon.
            </p>
            <div className="flex items-center justify-center gap-2 text-primary font-bold">
              <span className="animate-pulse">Redirecting to home...</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-black mb-8">YOUR BAG ({items.reduce((sum: number, item: any) => sum + item.quantity, 0)})</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-gray-400" />
            </div>
            <p className="text-xl font-bold mb-4">Your bag is empty.</p>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
            <button
              onClick={() => window.App.transitionTo('shop-all')}
              className="bg-black text-white font-bold px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              START SHOPPING
            </button>
          </div>
        ) : (
          <>
            {/* Multi-tier Progress Bar */}
            <div className="bg-gray-50 p-6 rounded-2xl mb-8 border-2 border-gray-100">
              <div className="flex justify-between text-xs font-bold mb-2 text-gray-400">
                <span>$0</span>
                <span>$50</span>
                <span>$75</span>
                <span>$100+</span>
              </div>

              <div className="relative h-4 bg-gray-200 rounded-full mb-6">
                {/* The Bar */}
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />

                {/* The Markers */}
                {tiers.map((tier) => (
                  <div
                    key={tier.amount}
                    className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all z-10
                      ${subtotal >= tier.amount ? 'bg-black border-black text-primary scale-110' : 'bg-white border-gray-300 text-gray-300'}`}
                    style={{ left: `${(tier.amount / maxAmount) * 100}%`, transform: `translate(-50%, -50%) ${subtotal >= tier.amount ? 'scale(1.1)' : ''}` }}
                  >
                    {subtotal >= tier.amount ? <CheckCircle size={16} /> : tier.icon}
                  </div>
                ))}
              </div>

              <div className="text-center">
                {nextTier ? (
                  <p className="text-sm font-bold">
                    Add <span className="text-primary">${(nextTier.amount - subtotal).toFixed(2)}</span> to unlock <span className="text-black uppercase">{nextTier.label}</span>!
                  </p>
                ) : (
                  <p className="text-sm font-bold text-primary animate-bounce">
                    CONGRATS! YOU'VE UNLOCKED ALL GIFTS!
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6 mb-12">
              {items.map((item: any) => (
                <div key={`${item.productId}-${item.isSubscription}`} className="flex gap-4 border-b border-gray-100 pb-6">
                  <div
                    className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => window.App.transitionTo('product-detail', { selectedId: item.productId })}
                  >
                    <img src={item.product.image} className="w-full h-full object-cover" alt={item.product.name} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{item.product.name}</h3>
                        {item.isSubscription && (
                          <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                            SUBSCRIPTION
                          </span>
                        )}
                      </div>
                      <p className="font-bold">
                        ${((item.isSubscription ? item.product.subscriptionPrice : item.product.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">{item.product.shape}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center border border-gray-200 rounded-full">
                        <button
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1, item.isSubscription)}
                          className="p-2 hover:text-primary transition-colors disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-bold px-3">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1, item.isSubscription)}
                          className="p-2 hover:text-primary transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.productId, item.isSubscription)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl space-y-4 mb-8">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className={`font-bold ${shipping === 0 ? 'text-green-600' : ''}`}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {subtotal < 50 && (
                <p className="text-xs text-gray-400">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}
              <div className="border-t border-gray-200 pt-4 flex justify-between text-xl font-black">
                <span>TOTAL</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-primary text-white font-bold text-xl py-5 rounded-full hover:bg-primary-hover transition-colors shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              CHECKOUT <ArrowRight size={24} />
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              Secure checkout powered by Stripe. 30-day money-back guarantee.
            </p>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
