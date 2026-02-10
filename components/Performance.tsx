import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { PerformanceData } from '../types';

const llamaData: PerformanceData[] = [
  { nodes: '1 Node (Local)', throughput: 6.96, ttft: 942 },
  { nodes: '2 Nodes', throughput: 0.99, ttft: 10505 },
  { nodes: '3 Nodes', throughput: 0.89, ttft: 10507 },
];

const qwenData: PerformanceData[] = [
  { nodes: '1 Node (Local)', throughput: 8.06, ttft: 661 },
  { nodes: '2 Nodes', throughput: 1.70, ttft: 2096 },
  { nodes: '3 Nodes', throughput: 1.36, ttft: 3028 },
];

const Performance: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Performance Reality Check</h2>
          <p className="text-zinc-400 max-w-3xl">
            While HyperCluster enables running models that are too big for a single device, the decentralized approach introduces significant latency due to network communication overhead.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Chart 1: Throughput */}
          <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-semibold text-zinc-200 mb-6 flex items-center justify-between">
              <span>Throughput (Tokens/sec)</span>
              <span className="text-xs px-2 py-1 bg-zinc-800 rounded text-zinc-400">Higher is better</span>
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={llamaData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="nodes" stroke="#71717a" tick={{fill: '#71717a', fontSize: 12}} />
                  <YAxis stroke="#71717a" tick={{fill: '#71717a', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#e4e4e7' }}
                    itemStyle={{ color: '#e4e4e7' }}
                  />
                  <Legend />
                  <Bar dataKey="throughput" name="Llama-3.2 1B (Tokens/s)" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                     <LabelList dataKey="throughput" position="top" fill="#60a5fa" fontSize={12} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-zinc-500">
              * Note the significant drop when moving from 1 to 2 nodes. This is the cost of network round-trips over consumer internet.
            </div>
          </div>

          {/* Chart 2: Latency */}
          <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800">
             <h3 className="text-xl font-semibold text-zinc-200 mb-6 flex items-center justify-between">
              <span>Time To First Token (ms)</span>
              <span className="text-xs px-2 py-1 bg-zinc-800 rounded text-zinc-400">Lower is better</span>
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={qwenData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="nodes" stroke="#71717a" tick={{fill: '#71717a', fontSize: 12}} />
                  <YAxis stroke="#71717a" tick={{fill: '#71717a', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#e4e4e7' }}
                    itemStyle={{ color: '#e4e4e7' }}
                  />
                  <Legend />
                  <Bar dataKey="ttft" name="Qwen3 0.6B (ms)" fill="#ef4444" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="ttft" position="top" fill="#f87171" fontSize={12} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
             <div className="mt-4 text-sm text-zinc-500">
              * Initial setup and synchronization across the ring adds considerable latency before the first token is generated.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Performance;