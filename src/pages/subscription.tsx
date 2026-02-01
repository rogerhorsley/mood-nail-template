import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Check, Gift, Calendar, Heart, X, PartyPopper, ArrowRight } from 'lucide-react';

const Subscription: React.FC = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showQuizPrompt, setShowQuizPrompt] = useState(false);

  const handleStartTrial = () => {
    // Check if user is logged in (mock check)
    const user = window.App?.store?.user;

    if (user) {
      // User already has active subscription
      if (user.subscriptionStatus === 'active') {
        window.App.transitionTo('account-subscription', { tab: 'subscription' });
        return;
      }
    }

    // Show success modal
    setShowSuccessModal(true);

    // Update user subscription status
    if (window.App?.store?.user) {
      window.App.store.user.subscriptionStatus = 'active';
      window.App.store.user.nextBoxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    setShowQuizPrompt(true);
  };

  const handleTakeQuiz = () => {
    setShowQuizPrompt(false);
    window.App.transitionTo('quiz-intro');
  };

  const handleSkipQuiz = () => {
    setShowQuizPrompt(false);
    window.App.transitionTo('account-subscription', { tab: 'subscription' });
  };

  return (
    <Layout>
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full text-center relative">
            <button
              onClick={handleSuccessClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <PartyPopper size={48} className="text-primary" />
            </div>

            <h2 className="text-3xl font-black mb-4">WELCOME TO THE CLUB!</h2>

            <p className="text-gray-500 mb-6">
              You're now a member of The Nail Club! Your first box will ship within 3-5 business days.
            </p>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-left">
              <h3 className="font-bold mb-3">Your membership includes:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-primary" /> 2 Premium Nail Sets Monthly
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-primary" /> Free US Shipping
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-primary" /> Early Access to New Drops
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-primary" /> 10% Off All Orders
                </li>
              </ul>
            </div>

            <button
              onClick={handleSuccessClose}
              className="w-full bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              CONTINUE <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Quiz Prompt Modal */}
      {showQuizPrompt && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Heart size={40} className="text-black" />
            </div>

            <h2 className="text-3xl font-black mb-4">ONE MORE THING...</h2>

            <p className="text-gray-500 mb-8">
              Take our quick style quiz so we can personalize your monthly boxes with styles you'll love!
            </p>

            <div className="space-y-3">
              <button
                onClick={handleTakeQuiz}
                className="w-full bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 transition-colors"
              >
                TAKE THE QUIZ (30 sec)
              </button>
              <button
                onClick={handleSkipQuiz}
                className="w-full text-gray-500 font-bold py-2 hover:text-black transition-colors"
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="bg-primary text-white py-20 text-center px-4">
        <h1 className="text-6xl font-black mb-6 tracking-tighter">THE NAIL CLUB</h1>
        <p className="text-2xl mb-8 max-w-2xl mx-auto font-medium">Join the coolest club on the internet. Get exclusive drops, huge savings, and never have naked nails again.</p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm font-bold tracking-widest uppercase mb-12">
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
              <div className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-bold mb-4">MOST POPULAR</div>
              <h3 className="text-3xl font-black mb-4">MONTHLY PASS</h3>
              <div className="text-5xl font-black text-primary mb-2">$15<span className="text-xl text-black font-bold">/mo</span></div>
              <p className="text-gray-400 text-sm mb-6">Billed monthly. Cancel anytime.</p>
              <ul className="space-y-4 mb-8 font-medium">
                <li className="flex items-center gap-3"><Check className="text-primary" /> 2 Premium Nail Sets</li>
                <li className="flex items-center gap-3"><Check className="text-primary" /> Free Shipping (US)</li>
                <li className="flex items-center gap-3"><Check className="text-primary" /> Early Access to Drops</li>
                <li className="flex items-center gap-3"><Check className="text-primary" /> 10% Off Storewide</li>
              </ul>
              <button
                onClick={handleStartTrial}
                className="w-full bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(204,255,0,1)] active:translate-y-1 active:shadow-none"
              >
                START YOUR TRIAL
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">
                First box ships in 3-5 days. Cancel or skip anytime.
              </p>
            </div>
            <div className="flex-1">
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop" className="rounded-2xl border-2 border-black" alt="Subscription Box" />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-black text-center mb-12">QUESTIONS?</h2>
        <div className="space-y-4">
          {[
            {
              q: "Can I cancel anytime?",
              a: "Yes! You can cancel or pause your subscription at any time from your account dashboard. No questions asked."
            },
            {
              q: "When will my box ship?",
              a: "Boxes ship on the 1st of each month. Your first box ships within 3-5 business days of signing up."
            },
            {
              q: "Can I choose what's in my box?",
              a: "You tell us your style preferences and we curate the best sets for you. You can also swap items before shipping!"
            },
            {
              q: "Do you ship internationally?",
              a: "Currently we only ship within the US, but international shipping is coming soon!"
            }
          ].map((faq, i) => (
            <details key={i} className="group border-2 border-gray-200 rounded-2xl overflow-hidden">
              <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-lg hover:bg-gray-50 transition-colors">
                {faq.q}
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Subscription;
