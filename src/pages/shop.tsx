import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Filter, X, Check, ChevronDown } from 'lucide-react';
import { addToCart } from '../core/cart';

const Shop: React.FC = () => {
  const products = window.App?.store?.products || [];
  const [showFilter, setShowFilter] = useState(false);
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'newest'>('default');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Get unique shapes
  const shapes = Array.from(new Set<string>(products.map((p: any) => p.shape)));

  // Filter and sort products
  let filteredProducts = [...products];

  if (selectedShape) {
    filteredProducts = filteredProducts.filter((p: any) => p.shape === selectedShape);
  }

  switch (sortBy) {
    case 'price-low':
      filteredProducts.sort((a: any, b: any) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a: any, b: any) => b.price - a.price);
      break;
    case 'newest':
      filteredProducts.sort((a: any, b: any) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
  }

  const handleQuickAdd = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    addToCart(productId, 1);
    setAddedProductId(productId);
    setTimeout(() => setAddedProductId(null), 1500);
  };

  const clearFilters = () => {
    setSelectedShape(null);
    setSortBy('default');
  };

  const hasActiveFilters = selectedShape !== null || sortBy !== 'default';

  return (
    <Layout>
      <div className="pt-12 pb-8 max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-black mb-4">ALL NAILS</h1>
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <p className="text-gray-500">{filteredProducts.length} products</p>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center gap-2 font-bold transition-colors ${showFilter ? 'text-primary' : 'hover:text-primary'}`}
          >
            <Filter size={20} /> FILTER
            {hasActiveFilters && (
              <span className="bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {(selectedShape ? 1 : 0) + (sortBy !== 'default' ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilter && (
          <div className="py-6 border-b border-gray-200 animate-in slide-in-from-top duration-200">
            <div className="flex flex-wrap gap-8">
              {/* Shape Filter */}
              <div>
                <h3 className="font-bold text-sm mb-3 text-gray-500">SHAPE</h3>
                <div className="flex flex-wrap gap-2">
                  {shapes.map((shape: string) => (
                    <button
                      key={shape}
                      onClick={() => setSelectedShape(selectedShape === shape ? null : shape)}
                      className={`px-4 py-2 rounded-full border-2 font-bold text-sm transition-all ${
                        selectedShape === shape
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 hover:border-black'
                      }`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="font-bold text-sm mb-3 text-gray-500">SORT BY</h3>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="appearance-none bg-white border-2 border-gray-200 rounded-full px-4 py-2 pr-10 font-bold text-sm cursor-pointer hover:border-black transition-colors focus:outline-none focus:border-black"
                  >
                    <option value="default">Featured</option>
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-gray-500 hover:text-black font-bold text-sm"
                  >
                    <X size={16} /> Clear All
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl font-bold text-gray-400 mb-4">No products found</p>
            <button
              onClick={clearFilters}
              className="text-primary font-bold hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProducts.map((product: any) => (
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
                    <button
                      onClick={(e) => handleQuickAdd(e, product.id)}
                      className={`w-full font-bold py-3 rounded-full shadow-lg transition-all ${
                        addedProductId === product.id
                          ? 'bg-green-500 text-white'
                          : 'bg-white text-black hover:bg-primary hover:text-white'
                      }`}
                    >
                      {addedProductId === product.id ? (
                        <span className="flex items-center justify-center gap-2">
                          <Check size={18} /> ADDED!
                        </span>
                      ) : (
                        'QUICK ADD'
                      )}
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
        )}
      </div>
    </Layout>
  );
};

export default Shop;
