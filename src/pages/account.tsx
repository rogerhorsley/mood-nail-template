import React from 'react';
import { Layout } from '../components/Layout';
import { Package, Settings, Calendar, PauseCircle, XCircle } from 'lucide-react';

const Account: React.FC = () => {
  const user = window.App?.store?.user;
  const currentTab = window.App?.currentState?.params?.tab || 'dashboard';

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Package },
    { id: 'subscription', label: 'My Subscription', icon: Calendar },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" />
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
                    <div key={order} className="border border-gray-200 rounded-2xl p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="font-bold text-lg">Order #MD-{202300 + order}</p>
                          <p className="text-gray-500 text-sm">Placed on Oct {10 + order}, 2023</p>
                        </div>
                        <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">DELIVERED</span>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1648844421753-351afd50486a?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1587393794661-ef05657e10b9?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentTab === 'subscription' && (
              <div>
                <h1 className="text-3xl font-black mb-8">MY SUBSCRIPTION</h1>
                
                <div className="bg-primary/5 border border-primary rounded-2xl p-8 mb-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold mb-1">The Nail Club (Monthly)</h3>
                      <p className="text-gray-500">Next box ships on {user?.nextBoxDate}</p>
                    </div>
                    <span className="bg-primary text-white font-bold px-3 py-1 rounded-full text-sm">ACTIVE</span>
                  </div>
                  
                  <div className="flex gap-4 mb-8">
                    <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-bold text-sm hover:border-black transition-colors">
                      Edit Style Profile
                    </button>
                    <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-bold text-sm hover:border-black transition-colors">
                      Update Payment
                    </button>
                  </div>

                  <div className="border-t border-primary/20 pt-6">
                    <h4 className="font-bold mb-4">Need a break?</h4>
                    <div className="flex gap-4">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-black font-bold">
                        <PauseCircle size={20} /> Skip Next Month
                      </button>
                      <button className="flex items-center gap-2 text-red-500 hover:text-red-700 font-bold">
                        <XCircle size={20} /> Cancel Subscription
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
