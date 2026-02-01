import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Star, Truck, ShieldCheck, Ruler, Minus, Plus, Camera } from 'lucide-react';

const Product: React.FC = () => {
  const selectedId = window.App?.currentState?.params?.selectedId;
  const products = window.App?.store?.products || [];
  const product = products.find((p: any) => p.id === selectedId) || products[0];
  
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscription'>('subscription');
  const [quantity, setQuantity] = useState(1);

  const currentPrice = purchaseType === 'subscription' ? product.subscriptionPrice : product.price;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 group">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            
            {/* AR Try-On Button Overlay */}
            <button 
              onClick={() => window.App.transitionTo('virtual-try-on', { selectedId: product.id })}
              className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 hover:bg-black hover:text-white transition-all transform hover:scale-105"
            >
              <Camera size={16} />
              VIRTUAL TRY-ON
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80">
                <img src={product.image} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded">BEST SELLER</span>
            <div className="flex text-primary">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <span className="text-sm text-gray-500">(128 reviews)</span>
          </div>

          <h1 className="text-5xl font-black mb-2">{product.name}</h1>
          <p className="text-xl text-gray-500 mb-6">{product.shape} Shape</p>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description} Includes 24 nails in 12 sizes, nail glue, adhesive tabs, file, and cuticle stick. Everything you need for a perfect application.
          </p>

          {/* Purchase Options */}
          <div className="space-y-4 mb-8">
            {/* Subscription Option */}
            <div 
              className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${purchaseType === 'subscription' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
              onClick={() => setPurchaseType('subscription')}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${purchaseType === 'subscription' ? 'border-primary' : 'border-gray-300'}`}>
                    {purchaseType === 'subscription' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                  <span className="font-bold text-lg">Subscribe & Save</span>
                </div>
                <span className="font-bold text-lg text-primary">${product.subscriptionPrice.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-500 ml-8">Save 20% • Cancel anytime • Free shipping</p>
            </div>

            {/* One-time Option */}
            <div 
              className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${purchaseType === 'one-time' ? 'border-black' : 'border-gray-200 hover:border-gray-300'}`}
              onClick={() => setPurchaseType('one-time')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${purchaseType === 'one-time' ? 'border-black' : 'border-gray-300'}`}>
                    {purchaseType === 'one-time' && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
                  </div>
                  <span className="font-bold text-lg">One-time Purchase</span>
                </div>
                <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <div className="flex items-center border-2 border-gray-200 rounded-full px-4">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-primary"><Minus size={16} /></button>
              <span className="font-bold w-8 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:text-primary"><Plus size={16} /></button>
            </div>
            <button 
              className="flex-1 bg-black text-white font-bold text-lg rounded-full py-4 hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(204,255,0,1)] active:translate-y-1 active:shadow-none"
              onClick={() => window.App.transitionTo('cart-view')}
            >
              ADD TO CART - ${(currentPrice * quantity).toFixed(2)}
            </button>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-3 gap-4 text-center text-xs font-bold text-gray-500 border-t border-gray-100 pt-6">
            <div className="flex flex-col items-center gap-2">
              <Truck size={20} />
              <span>FREE SHIPPING<br/>OVER $50</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck size={20} />
              <span>100% SATISFACTION<br/>GUARANTEE</span>
            </div>
            <div className="flex flex-col items-center gap-2 cursor-pointer hover:text-primary">
              <Ruler size={20} />
              <span>SIZE GUIDE<br/>& HELP</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
