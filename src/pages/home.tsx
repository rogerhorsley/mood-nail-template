import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { ArrowRight, Star, Check, Play, ShoppingBag, Sparkles } from 'lucide-react';
import { addToCart } from '../core/cart';

const Home: React.FC = () => {
  const products = window.App?.store?.products || [];
  const reviews = window.App?.store?.reviews || [];
  const featuredProducts = products.slice(0, 4);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const handleQuickAdd = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    addToCart(productId, 1);
    setAddedProductId(productId);
    setTimeout(() => setAddedProductId(null), 1500);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gray-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-60">
          <img
            src="https://user-assert.oss-us-east-1.aliyuncs.com/images/5df83cf2c24bd408328509a3505a034a.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.52)' }}
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
            SALON QUALITY.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">SECONDS TO APPLY.</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 font-medium max-w-2xl mx-auto">
            The viral reusable manicure that fits perfectly and lasts up to 2 weeks. No damage, no glue mess.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.App.transitionTo('shop-all')}
              className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
            >
              SHOP THE DROP
            </button>
            <button
              onClick={() => window.App.transitionTo('subscription-landing')}
              className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <Play size={20} fill="currentColor" />
              WATCH TUTORIAL
            </button>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-12 bg-black text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4 text-accent">
              <Star size={24} fill="currentColor" />
            </div>
            <h3 className="font-bold text-lg mb-2">Salon Quality</h3>
            <p className="text-gray-400 text-sm">Hand-painted designs that look just like acrylics.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4 text-accent">
              <Check size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">Damage Free</h3>
            <p className="text-gray-400 text-sm">Pop them off in seconds without ruining your natural nails.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4 text-accent">
              <ArrowRight size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">Reusable</h3>
            <p className="text-gray-400 text-sm">Wear them for a night or a week. Reapply up to 5 times.</p>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-black tracking-tight">TRENDING NOW</h2>
          <button
            onClick={() => window.App.transitionTo('shop-all')}
            className="font-bold border-b-2 border-black pb-1 hover:text-primary hover:border-primary transition-colors"
          >
            VIEW ALL
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product: any) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => window.App.transitionTo('product-detail', { selectedId: product.id })}
            >
              <div className="relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden mb-4 border border-transparent group-hover:border-black transition-all">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-accent text-black text-xs font-bold px-3 py-1 rounded-full">
                    NEW DROP
                  </span>
                )}
                <button
                  onClick={(e) => handleQuickAdd(e, product.id)}
                  className={`absolute bottom-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
                    addedProductId === product.id
                      ? 'bg-green-500 text-white opacity-100 translate-y-0'
                      : 'bg-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 hover:bg-primary hover:text-white'
                  }`}
                >
                  {addedProductId === product.id ? <Check size={20} /> : <ShoppingBag size={20} />}
                </button>
              </div>
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-gray-500">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz Teaser */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
           <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
           <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 border border-white/30 px-4 py-1 rounded-full text-sm font-bold mb-8 backdrop-blur-sm">
            <Sparkles size={16} className="text-primary" />
            <span>DON'T KNOW YOUR VIBE?</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
            MEET YOUR <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">SOUL MATTE.</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-xl mx-auto">
            Not sure where to start? Take our 30-second quiz to find the set that matches your energy.
          </p>
          <button
            onClick={() => window.App.transitionTo('quiz-intro')}
            className="bg-white text-black px-10 py-4 rounded-full font-black text-xl hover:bg-primary transition-colors hover:scale-105 duration-300"
          >
            START THE QUIZ
          </button>
        </div>
      </section>

      {/* Subscription Teaser */}
      <section className="py-20 bg-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="inline-block bg-black text-white px-4 py-1 rounded-full text-sm font-bold mb-6">THE NAIL CLUB</span>
            <h2 className="text-5xl font-black mb-6 leading-none">NEVER HAVE NAKED NAILS AGAIN.</h2>
            <p className="text-xl mb-8 opacity-90">Get 2 exclusive sets delivered to your door every month. Save 20% and skip anytime.</p>
            <button
              onClick={() => window.App.transitionTo('subscription-landing')}
              className="bg-accent text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              JOIN THE CLUB ($15/MO)
            </button>
          </div>
          <div className="flex-1 relative">
            <div className="relative z-10 bg-white p-6 rounded-2xl rotate-3 shadow-2xl">
              <img src="https://plus.unsplash.com/premium_photo-1723722170029-3576210580b1?q=80&w=600&auto=format&fit=crop" alt="Box" className="rounded-lg" />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-black/20 rounded-2xl -rotate-3 scale-95"></div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-black text-center mb-12">SEEN ON THE GRAM</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review: any) => (
            <div key={review.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <img src={review.image} alt={review.user} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-bold">{review.user}</div>
                  <div className="flex text-primary">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{review.content}"</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
