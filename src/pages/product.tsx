import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Star, Truck, ShieldCheck, Ruler, Minus, Plus, Camera, Check, X } from 'lucide-react';
import { addToCart } from '../core/cart';

const Product: React.FC = () => {
  const selectedId = window.App?.currentState?.params?.selectedId;
  const products = window.App?.store?.products || [];
  const product = products.find((p: any) => p.id === selectedId) || products[0];

  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscription'>('subscription');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Mock multiple images (in real app, product would have an images array)
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const currentPrice = purchaseType === 'subscription' ? product.subscriptionPrice : product.price;

  const handleAddToCart = () => {
    addToCart(product.id, quantity, purchaseType === 'subscription');
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      window.App.transitionTo('cart-view');
    }, 800);
  };

  return (
    <Layout>
      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white rounded-t-3xl">
              <h2 className="text-2xl font-black">SIZE GUIDE</h2>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4">How to Measure</h3>
                <ol className="space-y-3 text-gray-600">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <span>Measure the widest part of your nail bed (cuticle to tip)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    <span>Use a flexible measuring tape or ruler in millimeters</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    <span>Match your measurement to the sizes below</span>
                  </li>
                </ol>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">Size Chart</h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-bold">Size</th>
                      <th className="text-left py-2 font-bold">Width (mm)</th>
                      <th className="text-left py-2 font-bold">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-100">
                      <td className="py-2">XS</td>
                      <td className="py-2">10-11mm</td>
                      <td className="py-2">Pinky</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">S</td>
                      <td className="py-2">12-13mm</td>
                      <td className="py-2">Ring finger</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">M</td>
                      <td className="py-2">14-15mm</td>
                      <td className="py-2">Middle finger</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">L</td>
                      <td className="py-2">16-17mm</td>
                      <td className="py-2">Index finger</td>
                    </tr>
                    <tr>
                      <td className="py-2">XL</td>
                      <td className="py-2">18-19mm</td>
                      <td className="py-2">Thumb</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-accent/20 rounded-xl">
                <p className="font-bold text-sm">
                  <span className="text-primary">PRO TIP:</span> Each set includes 24 nails in 12 sizes, so you'll always find your perfect fit!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 group">
            <img
              src={productImages[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />

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
            {productImages.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer transition-all ${
                  selectedImageIndex === index
                    ? 'ring-2 ring-black ring-offset-2'
                    : 'hover:opacity-80'
                }`}
              >
                <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
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
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:text-primary transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="font-bold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:text-primary transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`flex-1 font-bold text-lg rounded-full py-4 transition-all active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 ${
                isAdded
                  ? 'bg-green-500 text-white shadow-none'
                  : 'bg-black text-white hover:bg-gray-800 shadow-[4px_4px_0px_0px_rgba(204,255,0,1)]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={20} /> ADDED!
                </>
              ) : (
                `ADD TO CART - $${(currentPrice * quantity).toFixed(2)}`
              )}
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
            <div
              onClick={() => setShowSizeGuide(true)}
              className="flex flex-col items-center gap-2 cursor-pointer hover:text-primary transition-colors"
            >
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
