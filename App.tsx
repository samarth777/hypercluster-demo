import React from 'react';
import Hero from './components/Hero';
import Simulation from './components/Simulation';
import KeyConcepts from './components/KeyConcepts';
import Performance from './components/Performance';
import { Github, FileText } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-500/30">
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
            HyperCluster
          </span>
          <div className="flex items-center gap-4">
             <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Paper</a>
             <a href="#" className="p-2 text-zinc-400 hover:text-white transition-colors">
               <Github size={20} />
             </a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <KeyConcepts />
        <Simulation />
        <Performance />
        
        {/* Footer / Paper Reference */}
        <section className="py-20 px-4 border-t border-zinc-800 bg-zinc-950">
           <div className="max-w-4xl mx-auto text-center">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 mb-6">
               <FileText size={32} className="text-zinc-500" />
             </div>
             <h2 className="text-2xl font-bold text-white mb-4">Read the Full Research</h2>
             <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
               This interactive visualization is based on the paper <span className="text-zinc-200 italic">"HyperCluster: Decentralized Large Language Model Inference over Peer-to-Peer Wireless Networks"</span> by Vyoman Jain et al.
             </p>
             
             <div className="grid md:grid-cols-2 gap-4 text-left bg-zinc-900 p-6 rounded-lg border border-zinc-800">
               <div>
                  <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-2">Authors</h4>
                  <p className="text-zinc-400 text-sm">Vyoman Jain, Samarth P, Akepati Ramya Sri, Sanjiv Raghunandan, Richa Sharma</p>
                  <p className="text-zinc-500 text-xs mt-1">PES University, Bengaluru, India</p>
               </div>
               <div>
                  <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-2">Key Tech</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">Hugging Face Transformers</span>
                    <span className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">Iroh P2P</span>
                    <span className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">Llama-3.2</span>
                  </div>
               </div>
             </div>
           </div>
        </section>
      </main>

    </div>
  );
};

export default App;