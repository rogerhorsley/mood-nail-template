import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { ArrowRight, Sparkles, RefreshCw, Share2, X, Download, Instagram, Star } from 'lucide-react';

const Quiz: React.FC = () => {
  const step = window.App?.currentState?.params?.step || 'intro';
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showSharePoster, setShowSharePoster] = useState(false);
  const [posterFormat, setPosterFormat] = useState<'story' | 'landscape'>('story');

  const questions = [
    {
      id: 'vibe',
      question: "What's your current vibe?",
      options: [
        { label: "Clean Girl Aesthetic", value: "clean", icon: "✨" },
        { label: "Y2K Baddie", value: "y2k", icon: "🦋" },
        { label: "Dark Feminine", value: "dark", icon: "🖤" },
        { label: "Soft & Dreamy", value: "soft", icon: "☁️" }
      ]
    },
    {
      id: 'shape',
      question: "Pick your go-to shape.",
      options: [
        { label: "Almond", value: "almond", icon: "💅" },
        { label: "Coffin", value: "coffin", icon: "⚰️" },
        { label: "Stiletto", value: "stiletto", icon: "🗡️" },
        { label: "Square", value: "square", icon: "⬜" }
      ]
    },
    {
      id: 'length',
      question: "How long do you like them?",
      options: [
        { label: "Short & Practical", value: "short", icon: "👌" },
        { label: "Medium", value: "medium", icon: "✌️" },
        { label: "Extra Long", value: "long", icon: "🔥" }
      ]
    }
  ];

  const handleStart = () => {
    window.App.transitionTo('quiz-question', { step: 'question' });
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestionIndex].id]: value };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Finish
      window.App.transitionTo('quiz-result', { step: 'result', ...newAnswers });
    }
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    window.App.transitionTo('quiz-intro', { step: 'intro' });
  };

  // Mock result logic
  const getResultProduct = () => {
    const products = window.App?.store?.products || [];
    // Simple logic: if Y2K -> Cyber Heart, else -> Glazed Donut
    if (answers['vibe'] === 'y2k' || answers['vibe'] === 'dark') {
      return products.find((p: any) => p.name === 'Cyber Heart') || products[1];
    }
    if (answers['vibe'] === 'clean') {
      return products.find((p: any) => p.name === 'Glazed Donut') || products[0];
    }
    return products[2] || products[0];
  };

  const getVibeName = () => {
    const vibeOption = questions[0].options.find(o => o.value === answers['vibe']);
    return vibeOption ? vibeOption.label : "MYSTERY VIBE";
  };

  return (
    <Layout>
      {/* Share Poster Modal */}
      {showSharePoster && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className={`relative w-full flex flex-col items-center my-auto transition-all duration-300 ${posterFormat === 'story' ? 'max-w-md' : 'max-w-4xl'}`}>
            <button 
              onClick={() => setShowSharePoster(false)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
            >
              <X size={32} />
            </button>
            
            <div className="flex items-center gap-4 mb-6">
               <div className="text-white font-bold animate-pulse">
                 ✨ SCREENSHOT TO SHARE ✨
               </div>
               <div className="bg-gray-800 p-1 rounded-full flex">
                 <button 
                   onClick={() => setPosterFormat('story')}
                   className={`px-4 py-1 rounded-full text-xs font-bold transition-colors ${posterFormat === 'story' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                 >
                   STORY (9:16)
                 </button>
                 <button 
                   onClick={() => setPosterFormat('landscape')}
                   className={`px-4 py-1 rounded-full text-xs font-bold transition-colors ${posterFormat === 'landscape' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                 >
                   DESKTOP (16:9)
                 </button>
               </div>
            </div>

            {/* The Poster Canvas */}
            <div className={`w-full bg-gradient-to-br from-primary via-white to-accent p-4 shadow-2xl relative overflow-hidden group select-none border-8 border-white transition-all duration-300 ${posterFormat === 'story' ? 'aspect-[9/16]' : 'aspect-[16/9]'}`}>
              {/* Background Noise/Texture */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 w-16 h-16 border-2 border-black rounded-full flex items-center justify-center animate-spin-slow">
                <Sparkles size={32} className="text-black" />
              </div>
              <div className="absolute top-10 right-10 text-6xl rotate-12 opacity-50">🦋</div>
              <div className="absolute bottom-20 left-[-20px] text-8xl -rotate-12 opacity-20">💅</div>
              
              {/* Content */}
              <div className={`relative z-10 h-full flex justify-between border-2 border-black p-6 bg-white/30 backdrop-blur-sm ${posterFormat === 'story' ? 'flex-col' : 'flex-row gap-8'}`}>
                
                {/* Header Section */}
                <div className={`text-center border-black ${posterFormat === 'story' ? 'border-b-2 pb-4' : 'border-r-2 pr-8 flex flex-col justify-center w-1/3'}`}>
                  <div className="font-black text-xl tracking-widest">OFFICIAL VIBE CHECK</div>
                  <div className="text-xs font-mono mt-1">{new Date().toLocaleDateString()} // MOOD.TEST.V1</div>
                  {posterFormat === 'landscape' && (
                     <div className="mt-8">
                        <div className="font-black text-4xl tracking-tighter mb-2">MOOD.</div>
                        <div className="text-sm font-bold">GET YOURS AT MOODNAILS.COM</div>
                        <div className="flex justify-center gap-1 mt-4">
                          {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="black" />)}
                        </div>
                     </div>
                  )}
                </div>

                {/* Main Content */}
                <div className={`flex-1 flex items-center justify-center ${posterFormat === 'story' ? 'flex-col gap-6' : 'flex-row gap-12'}`}>
                  <div className="flex flex-col items-center">
                    <div className="bg-black text-white px-6 py-2 rotate-[-2deg] shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] mb-4">
                      <span className="font-black text-3xl uppercase">I AM A</span>
                    </div>
                    
                    <h2 className={`font-black text-center leading-none text-transparent bg-clip-text bg-gradient-to-r from-black to-purple-900 drop-shadow-sm uppercase break-words w-full ${posterFormat === 'story' ? 'text-5xl md:text-6xl' : 'text-6xl md:text-7xl'}`}>
                      {getVibeName()}
                    </h2>
                  </div>

                  <div className={`relative ${posterFormat === 'story' ? 'w-48 h-48' : 'w-64 h-64'}`}>
                    <div className="absolute inset-0 bg-black rotate-3 rounded-xl"></div>
                    <img 
                      src={getResultProduct().image} 
                      className="absolute inset-0 w-full h-full object-cover border-2 border-black -rotate-3 rounded-xl bg-white"
                      alt="Product"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-accent text-black font-bold px-3 py-1 border border-black rounded-full text-xs">
                      MATCH: {getResultProduct().name}
                    </div>
                  </div>
                </div>

                {/* Footer Section (Only for Story) */}
                {posterFormat === 'story' && (
                  <div className="text-center border-t-2 border-black pt-4">
                    <div className="font-black text-2xl tracking-tighter">MOOD.</div>
                    <div className="text-xs font-bold mt-1">GET YOURS AT MOODNAILS.COM</div>
                    <div className="flex justify-center gap-1 mt-2">
                      {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="black" />)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex gap-4 w-full max-w-md">
              <button className="flex-1 bg-white text-black font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-100">
                <Instagram size={20} /> SHARE TO STORY
              </button>
              <button className="flex-1 bg-gray-800 text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-700">
                <Download size={20} /> SAVE IMAGE
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
        
        {/* INTRO STEP */}
        {step === 'intro' && (
          <div className="max-w-2xl w-full bg-white rounded-3xl p-8 md:p-16 text-center shadow-xl border border-gray-100">
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
              <Sparkles size={40} className="text-black" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6">FIND YOUR PERFECT SET</h1>
            <p className="text-xl text-gray-500 mb-10">
              Overwhelmed by choices? Take our 30-second quiz to find the nails that match your soul (and your outfit).
            </p>
            <button 
              onClick={handleStart}
              className="bg-black text-white text-xl font-bold px-12 py-5 rounded-full hover:scale-105 transition-transform shadow-[6px_6px_0px_0px_rgba(204,255,0,1)]"
            >
              START QUIZ
            </button>
          </div>
        )}

        {/* QUESTION STEP */}
        {step === 'question' && (
          <div className="max-w-2xl w-full">
            <div className="mb-8 flex justify-between items-center text-sm font-bold text-gray-400">
              <span>QUESTION {currentQuestionIndex + 1}/{questions.length}</span>
              <span>{(currentQuestionIndex / questions.length * 100).toFixed(0)}% COMPLETED</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-2 rounded-full mb-12 overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-500 ease-out"
                style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
              />
            </div>

            <h2 className="text-4xl font-black mb-12 text-center">{questions[currentQuestionIndex].question}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[currentQuestionIndex].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="bg-white border-2 border-gray-100 p-6 rounded-2xl hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all text-left flex items-center gap-4 group"
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform">{option.icon}</span>
                  <span className="font-bold text-lg">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULT STEP */}
        {step === 'result' && (
          <div className="max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-gray-100 relative">
              <img src={getResultProduct().image} className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-full font-bold text-sm shadow-md">
                YOUR MATCH
              </div>
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-2 text-primary font-bold tracking-widest uppercase text-sm">Based on your vibe</div>
              <h2 className="text-4xl font-black mb-4">{getResultProduct().name}</h2>
              <p className="text-gray-500 text-lg mb-8">{getResultProduct().description}</p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => window.App.transitionTo('product-detail', { selectedId: getResultProduct().id })}
                  className="w-full bg-black text-white text-lg font-bold py-4 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  SHOP NOW - ${getResultProduct().price} <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => setShowSharePoster(true)}
                  className="w-full bg-accent border-2 border-black text-black text-lg font-bold py-4 rounded-full hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Share2 size={20} /> SHARE MY VIBE
                </button>
                <button 
                  onClick={handleRetake}
                  className="w-full bg-white border-2 border-gray-200 text-black text-lg font-bold py-4 rounded-full hover:border-black transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw size={20} /> RETAKE QUIZ
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Quiz;
