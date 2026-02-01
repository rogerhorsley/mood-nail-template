import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Menu, X, Check } from 'lucide-react';
import { getCartCount } from '../core/cart';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Initialize cart count and listen for updates
  useEffect(() => {
    // Set initial count
    setCartCount(getCartCount());

    // Listen for cart updates
    const handleCartUpdate = () => {
      setCartCount(getCartCount());
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const handleEmailSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Please enter your email');
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    // Simulate subscription
    setIsSubscribed(true);
    setEmail('');

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background text-text font-sans selection:bg-accent selection:text-black">
      {/* Announcement Bar */}
      <div className="bg-black text-white text-xs font-bold text-center py-2 tracking-widest uppercase">
        Free Shipping on Orders Over $50
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <div
              className="text-2xl font-black tracking-tighter cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => window.App.transitionTo('home-default')}
            >
              MOOD.
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8 font-bold text-sm tracking-wide">
              <button onClick={() => window.App.transitionTo('shop-all')} className="hover:text-primary transition-colors">SHOP ALL</button>
              <button onClick={() => window.App.transitionTo('subscription-landing')} className="hover:text-primary transition-colors">NAIL CLUB</button>
              <button onClick={() => window.App.transitionTo('quiz-intro')} className="hover:text-primary transition-colors">STYLE QUIZ</button>
              <button className="hover:text-primary transition-colors">SIZING GUIDE</button>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.App.transitionTo('account-dashboard')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <User size={20} />
              </button>
              <button
                onClick={() => window.App.transitionTo('cart-view')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 absolute w-full animate-in slide-in-from-top duration-200">
            <div className="px-4 pt-2 pb-4 space-y-2 font-bold">
              <button
                onClick={() => {
                  window.App.transitionTo('shop-all');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-3 border-b border-gray-50"
              >
                SHOP ALL
              </button>
              <button
                onClick={() => {
                  window.App.transitionTo('subscription-landing');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-3 border-b border-gray-50 text-primary"
              >
                THE NAIL CLUB
              </button>
              <button
                onClick={() => {
                  window.App.transitionTo('quiz-intro');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-3"
              >
                STYLE QUIZ
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-black mb-4">MOOD.</h3>
            <p className="text-gray-400 text-sm">Fast fashion for your fingertips. Salon quality, seconds to apply.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">SHOP</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => window.App.transitionTo('shop-all')}>New Arrivals</li>
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => window.App.transitionTo('shop-all')}>Best Sellers</li>
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => window.App.transitionTo('shop-all')}>Solid Colors</li>
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => window.App.transitionTo('shop-all')}>Designs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">HELP</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="cursor-pointer hover:text-white transition-colors">Shipping & Returns</li>
              <li className="cursor-pointer hover:text-white transition-colors">Sizing Guide</li>
              <li className="cursor-pointer hover:text-white transition-colors">FAQ</li>
              <li className="cursor-pointer hover:text-white transition-colors">Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">STAY IN THE LOOP</h4>
            <form onSubmit={handleEmailSubscribe}>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  placeholder="Enter email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-full w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isSubscribed}
                />
                <button
                  type="submit"
                  disabled={isSubscribed}
                  className={`px-6 py-2 rounded-r-full font-bold transition-colors ${
                    isSubscribed
                      ? 'bg-green-500 text-white'
                      : 'bg-primary hover:bg-primary-hover'
                  }`}
                >
                  {isSubscribed ? <Check size={20} /> : 'JOIN'}
                </button>
              </div>
              {emailError && (
                <p className="text-red-400 text-xs mt-2">{emailError}</p>
              )}
              {isSubscribed && (
                <p className="text-green-400 text-xs mt-2">Thanks for subscribing!</p>
              )}
            </form>
            <p className="text-gray-500 text-xs mt-3">
              Get 10% off your first order + early access to drops.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} MOOD. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
