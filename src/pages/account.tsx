import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Package, Settings, Calendar, PauseCircle, XCircle, X, Check, AlertTriangle, CreditCard, Palette, ChevronRight, Eye } from 'lucide-react';

const Account: React.FC = () => {
  const user = window.App?.store?.user;
  const currentTab = window.App?.currentState?.params?.tab || 'dashboard';
  const products = window.App?.store?.products || [];

  const [showStyleModal, setShowStyleModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Style preferences state
  const [stylePrefs, setStylePrefs] = useState({
    shapes: ['Almond', 'Coffin'],
    vibes: ['Clean Girl', 'Y2K'],
    length: 'Medium'
  });

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Package },
    { id: 'subscription', label: 'My Subscription', icon: Calendar },
  ];

  const handleSkipMonth = () => {
    setShowSkipModal(false);
    if (window.App?.store?.user) {
      // Add 30 days to next box date
      const currentDate = new Date(window.App.store.user.nextBoxDate);
      currentDate.setDate(currentDate.getDate() + 30);
      window.App.store.user.nextBoxDate = currentDate.toISOString().split('T')[0];
    }
    setActionSuccess('Next month skipped! Your next box will ship in 2 months.');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleCancelSubscription = () => {
    setShowCancelModal(false);
    if (window.App?.store?.user) {
      window.App.store.user.subscriptionStatus = 'cancelled';
    }
    setActionSuccess('Subscription cancelled. We\'re sad to see you go!');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleSaveStyles = () => {
    setShowStyleModal(false);
    setActionSuccess('Style preferences updated!');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleSavePayment = () => {
    setShowPaymentModal(false);
    setActionSuccess('Payment method updated!');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const toggleShapePreference = (shape: string) => {
    setStylePrefs(prev => ({
      ...prev,
      shapes: prev.shapes.includes(shape)
        ? prev.shapes.filter(s => s !== shape)
        : [...prev.shapes, shape]
    }));
  };

  const toggleVibePreference = (vibe: string) => {
    setStylePrefs(prev => ({
      ...prev,
      vibes: prev.vibes.includes(vibe)
        ? prev.vibes.filter(v => v !== vibe)
        : [...prev.vibes, vibe]
    }));
  };

  return (
    <Layout>
      {/* Success Toast */}
      {actionSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[10000] bg-green-500 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 animate-in slide-in-from-top shadow-lg">
          <Check size={18} /> {actionSuccess}
        </div>
      )}

      {/* Style Profile Modal */}
      {showStyleModal && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white rounded-t-3xl">
              <h2 className="text-2xl font-black">EDIT STYLE PROFILE</h2>
              <button onClick={() => setShowStyleModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-bold mb-3">Preferred Shapes</h3>
                <div className="flex flex-wrap gap-2">
                  {['Almond', 'Coffin', 'Stiletto', 'Square', 'Round'].map(shape => (
                    <button
                      key={shape}
                      onClick={() => toggleShapePreference(shape)}
                      className={`px-4 py-2 rounded-full border-2 font-bold text-sm transition-all ${
                        stylePrefs.shapes.includes(shape)
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3">Your Vibes</h3>
                <div className="flex flex-wrap gap-2">
                  {['Clean Girl', 'Y2K', 'Dark Feminine', 'Soft & Dreamy', 'Bold & Bright'].map(vibe => (
                    <button
                      key={vibe}
                      onClick={() => toggleVibePreference(vibe)}
                      className={`px-4 py-2 rounded-full border-2 font-bold text-sm transition-all ${
                        stylePrefs.vibes.includes(vibe)
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {vibe}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3">Preferred Length</h3>
                <div className="flex gap-2">
                  {['Short', 'Medium', 'Long'].map(length => (
                    <button
                      key={length}
                      onClick={() => setStylePrefs(prev => ({ ...prev, length }))}
                      className={`flex-1 py-3 rounded-full border-2 font-bold text-sm transition-all ${
                        stylePrefs.length === length
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {length}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSaveStyles}
                className="w-full bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 transition-colors"
              >
                SAVE PREFERENCES
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-black">UPDATE PAYMENT</h2>
              <button onClick={() => setShowPaymentModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div>
                  <p className="font-bold">**** **** **** 4242</p>
                  <p className="text-sm text-gray-500">Expires 12/25</p>
                </div>
                <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">CURRENT</span>
              </div>

              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-gray-300 transition-colors">
                <CreditCard size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="font-bold mb-1">Add New Card</p>
                <p className="text-sm text-gray-500">Securely add a new payment method</p>
              </div>

              <button
                onClick={handleSavePayment}
                className="w-full bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 transition-colors"
              >
                SAVE CHANGES
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skip Month Modal */}
      {showSkipModal && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PauseCircle size={32} className="text-yellow-600" />
            </div>
            <h2 className="text-2xl font-black mb-2">SKIP NEXT MONTH?</h2>
            <p className="text-gray-500 mb-6">
              Your next box was scheduled for {user?.nextBoxDate}. If you skip, it will ship a month later instead.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSkipModal(false)}
                className="flex-1 border-2 border-gray-200 font-bold py-3 rounded-full hover:border-black transition-colors"
              >
                KEEP IT
              </button>
              <button
                onClick={handleSkipMonth}
                className="flex-1 bg-black text-white font-bold py-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                SKIP MONTH
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} className="text-red-600" />
            </div>
            <h2 className="text-2xl font-black mb-2">CANCEL SUBSCRIPTION?</h2>
            <p className="text-gray-500 mb-6">
              You'll lose access to member-only perks including 10% off, free shipping, and early access to drops. Are you sure?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 bg-black text-white font-bold py-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                KEEP MEMBERSHIP
              </button>
              <button
                onClick={handleCancelSubscription}
                className="flex-1 border-2 border-red-500 text-red-500 font-bold py-3 rounded-full hover:bg-red-50 transition-colors"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt={user?.name} />
              </div>
              <div>
                <h2 className="font-bold text-lg">Hi, {user?.name}</h2>
                <p className="text-sm text-gray-500">Member since 2023</p>
              </div>
            </div>

            <nav className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => window.App.transitionTo(`account-${tab.id}`, { tab: tab.id })}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${currentTab === tab.id ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-gray-500 hover:bg-gray-100">
                <Settings size={20} />
                Settings
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            {currentTab === 'dashboard' && (
              <div>
                <h1 className="text-3xl font-black mb-8">ORDER HISTORY</h1>
                <div className="space-y-6">
                  {[1, 2].map(order => (
                    <div key={order} className="border border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition-colors">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="font-bold text-lg">Order #MD-{202300 + order}</p>
                          <p className="text-gray-500 text-sm">Placed on Oct {10 + order}, 2023</p>
                        </div>
                        <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">DELIVERED</span>
                      </div>
                      <div className="flex gap-4 mb-4">
                        {products.slice(0, 2).map((product: any, i: number) => (
                          <div
                            key={i}
                            className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => window.App.transitionTo('product-detail', { selectedId: product.id })}
                          >
                            <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                          </div>
                        ))}
                      </div>
                      <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                        <Eye size={16} /> View Order Details <ChevronRight size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentTab === 'subscription' && (
              <div>
                <h1 className="text-3xl font-black mb-8">MY SUBSCRIPTION</h1>

                {user?.subscriptionStatus === 'cancelled' ? (
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
                    <p className="text-xl font-bold mb-4">No Active Subscription</p>
                    <p className="text-gray-500 mb-6">You don't have an active subscription. Join The Nail Club to get exclusive perks!</p>
                    <button
                      onClick={() => window.App.transitionTo('subscription-landing')}
                      className="bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-primary-hover transition-colors"
                    >
                      JOIN THE NAIL CLUB
                    </button>
                  </div>
                ) : (
                  <div className="bg-primary/5 border border-primary rounded-2xl p-8 mb-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-bold mb-1">The Nail Club (Monthly)</h3>
                        <p className="text-gray-500">Next box ships on {user?.nextBoxDate}</p>
                      </div>
                      <span className="bg-primary text-white font-bold px-3 py-1 rounded-full text-sm">ACTIVE</span>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-8">
                      <button
                        onClick={() => setShowStyleModal(true)}
                        className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-bold text-sm hover:border-black transition-colors flex items-center gap-2"
                      >
                        <Palette size={16} /> Edit Style Profile
                      </button>
                      <button
                        onClick={() => setShowPaymentModal(true)}
                        className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-bold text-sm hover:border-black transition-colors flex items-center gap-2"
                      >
                        <CreditCard size={16} /> Update Payment
                      </button>
                    </div>

                    <div className="border-t border-primary/20 pt-6">
                      <h4 className="font-bold mb-4">Need a break?</h4>
                      <div className="flex flex-wrap gap-4">
                        <button
                          onClick={() => setShowSkipModal(true)}
                          className="flex items-center gap-2 text-gray-600 hover:text-black font-bold transition-colors"
                        >
                          <PauseCircle size={20} /> Skip Next Month
                        </button>
                        <button
                          onClick={() => setShowCancelModal(true)}
                          className="flex items-center gap-2 text-red-500 hover:text-red-700 font-bold transition-colors"
                        >
                          <XCircle size={20} /> Cancel Subscription
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Subscription Benefits */}
                {user?.subscriptionStatus !== 'cancelled' && (
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="font-bold mb-4">Your Member Benefits</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <Check className="text-primary" size={20} />
                        <span className="text-gray-600">10% off all orders</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="text-primary" size={20} />
                        <span className="text-gray-600">Free US shipping</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="text-primary" size={20} />
                        <span className="text-gray-600">Early access to drops</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="text-primary" size={20} />
                        <span className="text-gray-600">Exclusive designs</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
