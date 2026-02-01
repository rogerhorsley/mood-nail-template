import React from 'react';
import { ShoppingBag, User, Menu, X } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background text-text font-sans selection:bg-accent selection:text-black">
      {/* Announcement Bar */}
      <div className="bg-black text-white text-xs font-bold text-center py-2 tracking-widest uppercase">
        Free Shipping on Orders Over $50 ⚡️
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
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {window.App?.store?.cart?.length || 0}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 absolute w-full">
            <div className="px-4 pt-2 pb-4 space-y-2 font-bold">
              <button onClick={() => window.App.transitionTo('shop-all')} className="block w-full text-left py-3 border-b border-gray-50">SHOP ALL</button>
              <button onClick={() => window.App.transitionTo('subscription-landing')} className="block w-full text-left py-3 border-b border-gray-50 text-primary">THE NAIL CLUB</button>
              <button onClick={() => window.App.transitionTo('quiz-intro')} className="block w-full text-left py-3">STYLE QUIZ</button>
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
              <li>New Arrivals</li>
              <li>Best Sellers</li>
              <li>Solid Colors</li>
              <li>Designs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">HELP</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Shipping & Returns</li>
              <li>Sizing Guide</li>
              <li>FAQ</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">STAY IN THE LOOP</h4>
            <div className="flex">
              <input type="email" placeholder="Enter email" className="bg-gray-800 text-white px-4 py-2 rounded-l-full w-full focus:outline-none" />
              <button className="bg-primary px-6 py-2 rounded-r-full font-bold hover:bg-primary-hover transition-colors">JOIN</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
