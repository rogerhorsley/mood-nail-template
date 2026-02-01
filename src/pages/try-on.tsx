import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, AlertCircle, Camera } from 'lucide-react';

const VirtualTryOn: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Get products from store
  const products = window.App?.store?.products || [];
  
  // Initialize with the product passed in params, or the first one
  useEffect(() => {
    const paramId = window.App?.currentState?.params?.selectedId;
    const initialProduct = products.find((p: any) => p.id === paramId) || products[0];
    setSelectedProduct(initialProduct);
  }, []);

  // Start Camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Camera error:", err);
        setError("Unable to access camera. Please ensure you have granted permission.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        setIsCaptured(true);
      }
    }
  };

  const handleRetake = () => {
    setIsCaptured(false);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
        <button 
          onClick={() => window.App.transitionTo('product-detail', { selectedId: selectedProduct?.id })}
          className="text-white p-2 bg-white/10 backdrop-blur-md rounded-full"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="text-white font-bold tracking-widest text-sm bg-black/30 px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
          VIRTUAL TRY-ON BETA
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Main Viewport */}
      <div className="flex-1 relative overflow-hidden bg-gray-900">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
            <AlertCircle size={48} className="text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Camera Access Denied</h3>
            <p className="text-gray-400">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 bg-white text-black px-6 py-2 rounded-full font-bold"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Video Feed */}
            <video 
              ref={videoRef}
              autoPlay 
              playsInline 
              muted
              className={`w-full h-full object-cover ${isCaptured ? 'hidden' : 'block'}`}
            />
            
            {/* Captured Image Canvas */}
            <canvas 
              ref={canvasRef}
              className={`w-full h-full object-cover ${isCaptured ? 'block' : 'hidden'}`}
            />

            {/* AR Overlay (The "Fake" Nails) */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {/* Hand Guide Outline - CSS based fallback */}
              <div className="absolute w-64 h-96 border-4 border-white/50 border-dashed rounded-[3rem] opacity-50"></div>
              <div className="absolute w-64 h-96 border-4 border-primary/30 rounded-[3rem] animate-pulse"></div>
              
              {/* The Nails Overlay - Positioned to match a generic hand holding phone or flat hand */}
              {/* This is a simplified visual representation for the prototype */}
              <div className="relative w-64 h-80 opacity-90 animate-pulse-slow">
                 {/* Thumb */}
                 <div className="absolute bottom-10 left-[-20px] w-14 h-16 bg-cover rounded-full rotate-[-45deg] shadow-xl" style={{ backgroundImage: `url(${selectedProduct?.image})` }}></div>
                 {/* Index */}
                 <div className="absolute top-10 left-10 w-14 h-20 bg-cover rounded-full rotate-[-10deg] shadow-xl" style={{ backgroundImage: `url(${selectedProduct?.image})` }}></div>
                 {/* Middle */}
                 <div className="absolute top-0 left-[70px] w-15 h-22 bg-cover rounded-full rotate-[0deg] shadow-xl" style={{ backgroundImage: `url(${selectedProduct?.image})` }}></div>
                 {/* Ring */}
                 <div className="absolute top-10 right-[50px] w-14 h-20 bg-cover rounded-full rotate-[10deg] shadow-xl" style={{ backgroundImage: `url(${selectedProduct?.image})` }}></div>
                 {/* Pinky */}
                 <div className="absolute bottom-20 right-[-10px] w-12 h-16 bg-cover rounded-full rotate-[25deg] shadow-xl" style={{ backgroundImage: `url(${selectedProduct?.image})` }}></div>
              </div>
              
              <div className="absolute bottom-40 text-white/80 text-sm font-bold animate-bounce">
                ALIGN YOUR HAND HERE
              </div>
            </div>
          </>
        )}
      </div>

      {/* Controls */}
      <div className="bg-black text-white p-6 pb-8 rounded-t-3xl -mt-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <h3 className="font-bold text-lg">{selectedProduct?.name}</h3>
            <p className="text-gray-400 text-sm">${selectedProduct?.price.toFixed(2)}</p>
          </div>
          {!isCaptured ? (
            <button 
              onClick={handleCapture}
              className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center bg-white/20 active:scale-95 transition-transform"
            >
              <Camera size={32} className="text-white" />
            </button>
          ) : (
            <div className="flex gap-2">
               <button 
                onClick={handleRetake}
                className="px-4 py-2 bg-gray-800 rounded-full font-bold text-sm"
              >
                RETAKE
              </button>
              <button 
                onClick={() => window.App.transitionTo('cart-view')} // Simplified add to cart flow
                className="px-4 py-2 bg-primary text-black rounded-full font-bold text-sm"
              >
                ADD TO CART
              </button>
            </div>
          )}
          <div className="flex-1 flex justify-end">
             {/* Product Switcher Mini */}
             <div className="flex -space-x-2 overflow-hidden">
                {products.slice(0,3).map((p: any) => (
                  <div 
                    key={p.id}
                    onClick={() => setSelectedProduct(p)}
                    className={`w-10 h-10 rounded-full border-2 border-white bg-gray-800 cursor-pointer overflow-hidden ${selectedProduct?.id === p.id ? 'ring-2 ring-primary z-10' : 'opacity-50'}`}
                  >
                    <img src={p.image} className="w-full h-full object-cover" />
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
