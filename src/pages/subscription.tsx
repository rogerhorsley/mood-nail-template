import React from 'react';
import { Layout } from '../components/Layout';
import { Check, Gift, Calendar, Heart } from 'lucide-react';

const Subscription: React.FC = () => {
  return (
    <Layout>
      {/* Hero */}
      <div className="bg-primary text-white py-20 text-center px-4">
        <h1 className="text-6xl font-black mb-6 tracking-tighter">THE NAIL CLUB</h1>
        <p className="text-2xl mb-8 max-w-2xl mx-auto font-medium">Join the coolest club on the internet. Get exclusive drops, huge savings, and never have naked nails again.</p>
        <div className="flex justify-center gap-8 text-sm font-bold tracking-widest uppercase mb-12">
          <span className="flex items-center gap-2"><Check size={16} /> Cancel Anytime</span>
          <span className="flex items-center gap-2"><Check size={16} /> Free Shipping</span>
          <span className="flex items-center gap-2"><Check size={16} /> Exclusive Styles</span>
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-black text-center mb-16">HOW IT WORKS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Heart size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">1. Pick Your Vibe</h3>
            <p className="text-gray-500">Tell us your shape and style preferences. We curate the best for you.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Calendar size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">2. Set Schedule</h3>
            <p className="text-gray-500">Choose monthly or bi-monthly delivery. Skip or pause whenever.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mb-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(204,255,0,1)]">
              <Gift size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">3. Unbox Joy</h3>
            <p className="text-gray-500">Get 2 sets delivered to your door. Happiness guaranteed.</p>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 md:p-12 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h3 className="text-3xl font-black mb-4">MONTHLY PASS</h3>
              <div className="text-5xl font-black text-primary mb-6">$15<span className="text-xl text-black font-bold">/mo</span></div>
              <ul className="space-y-4 mb-8 font-medium">
                <li className="flex items-center gap-3"><Check className="text-primary" /> 2 Premium Nail Sets</li>
                <li className="flex items-center gap-3"><Check className="text-primary" /> Free Shipping (US)</li>
                <li className="flex items-center gap-3"><Check className="text-primary" /> Early Access to Drops</li>
                <li className="flex items-center gap-3"><Check className="text-primary" /> 10% Off Storewide</li>
              </ul>
              <button className="w-full bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 transition-colors">
                START YOUR TRIAL
              </button>
            </div>
            <div className="flex-1">
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop" className="rounded-2xl border-2 border-black" alt="Box" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Subscription;
