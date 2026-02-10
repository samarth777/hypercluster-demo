import React, { useState, useEffect, useRef } from 'react';
import { Laptop, Smartphone, Monitor, Play, RotateCcw, Plus, Trash2 } from 'lucide-react';
import { Device, SimulationStep } from '../types';

const INITIAL_DEVICES: Device[] = [
  { id: '1', name: 'MacBook Air', memory: 16, type: 'laptop' },
  { id: '2', name: 'Linux Desktop', memory: 8, type: 'desktop' },
  { id: '3', name: 'Pixel Phone', memory: 4, type: 'mobile' },
];

const Simulation: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [sortedDevices, setSortedDevices] = useState<Device[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState<SimulationStep>({ activeNodeIndex: -1, message: 'Ready to start', phase: 'idle' });
  
  // Sort devices by memory (HyperCluster logic) whenever devices change
  useEffect(() => {
    const sorted = [...devices].sort((a, b) => b.memory - a.memory);
    setSortedDevices(sorted);
  }, [devices]);

  const addDevice = () => {
    const types: Device['type'][] = ['laptop', 'desktop', 'mobile'];
    const type = types[Math.floor(Math.random() * types.length)];
    const memory = [4, 8, 16, 32][Math.floor(Math.random() * 4)];
    const newDevice: Device = {
      id: Math.random().toString(36).substr(2, 9),
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      memory,
      type
    };
    setDevices(prev => [...prev, newDevice]);
  };

  const removeDevice = (id: string) => {
    if (devices.length > 2) {
      setDevices(prev => prev.filter(d => d.id !== id));
      resetSimulation();
    }
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setCurrentStep({ activeNodeIndex: -1, message: 'Ready to start', phase: 'idle' });
  };

  const runSimulation = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    
    const steps: SimulationStep[] = [];
    
    // Prefill Phase
    steps.push({ activeNodeIndex: -1, message: 'Initializing Ring Topology...', phase: 'prefill' });
    
    sortedDevices.forEach((_, idx) => {
      steps.push({ 
        activeNodeIndex: idx, 
        message: `Node ${idx} processing layers (Prefill)`, 
        phase: 'prefill' 
      });
    });

    // Generation Phase (Token 1)
    steps.push({ activeNodeIndex: -1, message: 'Generating Token 1...', phase: 'generation' });
     sortedDevices.forEach((_, idx) => {
      steps.push({ 
        activeNodeIndex: idx, 
        message: `Node ${idx} passing hidden states (Gen 1)`, 
        phase: 'generation' 
      });
    });
    
    // Final Token Logic
    steps.push({ activeNodeIndex: sortedDevices.length - 1, message: 'Final Node computes Logits & Samples', phase: 'generation' });

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex >= steps.length) {
        setIsPlaying(false);
        clearInterval(interval);
        setCurrentStep({ activeNodeIndex: -1, message: 'Inference Complete', phase: 'idle' });
        return;
      }
      setCurrentStep(steps[stepIndex]);
      stepIndex++;
    }, 1200);
  };

  // Helper to place nodes in a circle
  const getPosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // Start at top
    return {
      x: radius * Math.cos(angle) + 50, // 50 is center percentage
      y: radius * Math.sin(angle) + 50,
    };
  };

  const totalMemory = sortedDevices.reduce((acc, d) => acc + d.memory, 0);

  return (
    <section id="simulation" className="py-20 px-4 bg-zinc-900 border-y border-zinc-800">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Interactive Ring Pipeline</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            HyperCluster organizes devices into a ring based on available memory. 
            The model layers are sharded proportionally. Watch how a token passes through the system.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 shadow-xl h-fit">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Monitor size={20} className="text-blue-500" />
              Network Configuration
            </h3>
            
            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
              {devices.map((device) => (
                <div key={device.id} className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                  <div className="flex items-center gap-3">
                    {device.type === 'laptop' && <Laptop size={16} className="text-zinc-400" />}
                    {device.type === 'desktop' && <Monitor size={16} className="text-zinc-400" />}
                    {device.type === 'mobile' && <Smartphone size={16} className="text-zinc-400" />}
                    <div>
                      <div className="text-sm font-medium text-zinc-200">{device.name}</div>
                      <div className="text-xs text-zinc-500">{device.memory}GB RAM</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeDevice(device.id)}
                    className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                    disabled={devices.length <= 2}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <button 
              onClick={addDevice}
              className="w-full py-2 mb-6 border border-dashed border-zinc-700 text-zinc-400 rounded-lg hover:bg-zinc-900 hover:text-zinc-200 hover:border-zinc-600 transition-all flex items-center justify-center gap-2 text-sm"
              disabled={isPlaying}
            >
              <Plus size={16} /> Add Device
            </button>

            <div className="border-t border-zinc-800 pt-6">
              <div className="flex gap-3">
                <button
                  onClick={runSimulation}
                  disabled={isPlaying}
                  className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                    isPlaying ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  <Play size={18} fill="currentColor" />
                  {isPlaying ? 'Running...' : 'Start Inference'}
                </button>
                <button
                  onClick={resetSimulation}
                  disabled={isPlaying}
                  className="p-3 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors disabled:opacity-50"
                >
                  <RotateCcw size={18} />
                </button>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
              <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Status</div>
              <div className="text-sm text-blue-400 font-mono animate-pulse">
                {currentStep.message}
              </div>
            </div>
          </div>

          {/* Visualization Stage */}
          <div className="lg:col-span-2 bg-zinc-950 rounded-xl border border-zinc-800 shadow-xl relative min-h-[500px] flex items-center justify-center overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            <div className="relative w-full max-w-[500px] aspect-square">
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                   <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                {sortedDevices.map((_, i) => {
                  const start = getPosition(i, sortedDevices.length, 35); // radius 35%
                  const nextIndex = (i + 1) % sortedDevices.length;
                  const end = getPosition(nextIndex, sortedDevices.length, 35);
                  
                  const isActivePath = currentStep.activeNodeIndex === i;
                  
                  return (
                    <g key={`line-${i}`}>
                      <line
                        x1={`${start.x}%`}
                        y1={`${start.y}%`}
                        x2={`${end.x}%`}
                        y2={`${end.y}%`}
                        stroke={isActivePath ? "#60a5fa" : "#27272a"}
                        strokeWidth={isActivePath ? "4" : "2"}
                        className="transition-all duration-300"
                        strokeDasharray={isActivePath ? "10 5" : "0"}
                      />
                      {/* Flow Particle */}
                      {isActivePath && (
                        <circle r="4" fill="#60a5fa">
                          <animateMotion 
                            dur="1.2s" 
                            repeatCount="1"
                            path={`M${start.x*5} ${start.y*5} L${end.x*5} ${end.y*5}`} 
                            // *5 because SVG coord system vs percentage is tricky, handling via CSS simpler usually
                            // Simplified: Just highlight the line for this demo
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Nodes */}
              {sortedDevices.map((device, i) => {
                const pos = getPosition(i, sortedDevices.length, 35);
                const isActive = currentStep.activeNodeIndex === i;
                const memoryShare = (device.memory / totalMemory) * 100;

                return (
                  <div
                    key={`node-${device.id}`}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500`}
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  >
                    <div className={`
                      relative flex flex-col items-center
                      ${isActive ? 'scale-110 z-10' : 'scale-100 z-0'}
                    `}>
                      {/* Label Badge */}
                      <div className={`
                        mb-2 px-2 py-1 rounded text-xs font-mono whitespace-nowrap
                        ${isActive ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'}
                      `}>
                        Rank {i}
                      </div>

                      {/* Device Icon */}
                      <div className={`
                        w-16 h-16 rounded-full flex items-center justify-center
                        border-2 shadow-[0_0_20px_rgba(0,0,0,0.5)]
                        ${isActive 
                          ? 'bg-zinc-800 border-blue-500 shadow-blue-500/20' 
                          : 'bg-zinc-900 border-zinc-700'
                        }
                        transition-colors duration-300
                      `}>
                        {device.type === 'laptop' && <Laptop size={24} className={isActive ? 'text-blue-400' : 'text-zinc-500'} />}
                        {device.type === 'desktop' && <Monitor size={24} className={isActive ? 'text-blue-400' : 'text-zinc-500'} />}
                        {device.type === 'mobile' && <Smartphone size={24} className={isActive ? 'text-blue-400' : 'text-zinc-500'} />}
                      </div>

                      {/* Info Card */}
                      <div className="mt-3 text-center bg-zinc-900/80 backdrop-blur-sm p-2 rounded-lg border border-zinc-800">
                        <div className="font-semibold text-zinc-200 text-sm">{device.name}</div>
                        <div className="text-xs text-zinc-500">{device.memory}GB RAM</div>
                        {/* Shard Size Visualization */}
                        <div className="mt-1 w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-full" 
                            style={{ width: `${memoryShare}%` }} 
                          />
                        </div>
                        <div className="text-[10px] text-emerald-500 mt-0.5">
                          {Math.round(memoryShare)}% of Model
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Simulation;