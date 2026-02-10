import React from 'react';
import { Share2, Zap, Shield, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blue-950/20 to-zinc-950">
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#3b82f615_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 animate-fade-in-up">
          <Share2 size={16} />
          <span>Decentralized AI Inference</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-400 mb-6 tracking-tight">
          HyperCluster
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-400 mb-8 leading-relaxed max-w-2xl mx-auto">
          Running massive language models on consumer devices by creating a <span className="text-blue-400 font-semibold">peer-to-peer computational ring</span>.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <FeatureBadge icon={<Zap size={18} />} text="Coordinator-Free" />
          <FeatureBadge icon={<Share2 size={18} />} text="Dynamic Sharding" />
          <FeatureBadge icon={<Shield size={18} />} text="Privacy Preserving" />
        </div>

        <button 
          onClick={() => document.getElementById('simulation')?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-blue-600 px-8 font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-900"
        >
          <span>See How It Works</span>
        </button>
      </div>

      <div className="absolute bottom-10 animate-bounce text-zinc-600">
        <ChevronDown size={32} />
      </div>
    </div>
  );
};

const FeatureBadge: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg text-zinc-300">
    {icon}
    <span>{text}</span>
  </div>
);

export default Hero;