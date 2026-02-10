import React from 'react';
import { Network, Database, Layers, RefreshCw } from 'lucide-react';

const concepts = [
  {
    title: "Memory-Weighted Sharding",
    icon: <Database className="text-emerald-400" size={24} />,
    description: "Unlike traditional even splitting, HyperCluster analyzes the available RAM of each peer. A device with 16GB RAM will take a larger chunk of the model layers than a device with 8GB, ensuring no single node bottlenecks due to memory constraints.",
    color: "emerald"
  },
  {
    title: "Ring-Pipeline Protocol",
    icon: <RefreshCw className="text-blue-400" size={24} />,
    description: "Nodes self-organize into a logical ring. During inference, intermediate states (activations) are passed directly from peer to peer. While Node A computes layer 1-10, Node B waits, then receives data to compute 11-20.",
    color: "blue"
  },
  {
    title: "Decentralized Discovery",
    icon: <Network className="text-purple-400" size={24} />,
    description: "Built on Iroh, the system uses a Kademlia DHT for peer discovery and NAT traversal. There is no central server coordinating the cluster; nodes advertise their capabilities and find each other autonomously.",
    color: "purple"
  },
  {
    title: "Dynamic Wrapping",
    icon: <Layers className="text-orange-400" size={24} />,
    description: "The system hooks into Hugging Face Transformers. It wraps the standard model class, intercepting the forward pass to execute only the locally assigned layers before transmitting the output to the next peer.",
    color: "orange"
  }
];

const KeyConcepts: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Core Innovations</h2>
          <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {concepts.map((concept, idx) => (
            <div 
              key={idx}
              className="group p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg bg-zinc-950 flex items-center justify-center mb-4 border border-zinc-800 group-hover:scale-110 transition-transform`}>
                {concept.icon}
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 mb-3">{concept.title}</h3>
              <p className="text-zinc-400 leading-relaxed">
                {concept.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyConcepts;