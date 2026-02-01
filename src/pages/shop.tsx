import React from 'react';
import { Layout } from '../components/Layout';
import { Filter } from 'lucide-react';

const Shop: React.FC = () => {
  const products = window.App?.store?.products || [];

  return (
    <Layout>
      <div className="pt-12 pb-8 max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-black mb-4">ALL NAILS</h1>
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <p className="text-gray-500">{products.length} products</p>
          <button className="flex items-center gap-2 font-bold hover:text-primary">
            <Filter size={20} /> FILTER
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product: any) => (
            <div 
              key={product.id} 
              className="group cursor-pointer"
              onClick={() => window.App.transitionTo('product-detail', { selectedId: product.id })}
            >
              <div className="relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-accent text-black text-xs font-bold px-3 py-1 rounded-full">
                    NEW
                  </span>
                )}
                <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full bg-white text-black font-bold py-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors">
                    QUICK ADD
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.shape}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
                  <p className="text-xs text-primary font-bold">Or ${product.subscriptionPrice.toFixed(2)} with Club</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
