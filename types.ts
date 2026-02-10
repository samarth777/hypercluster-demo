export interface Device {
  id: string;
  name: string;
  memory: number; // in GB
  type: 'laptop' | 'desktop' | 'mobile';
}

export interface SimulationStep {
  activeNodeIndex: number;
  message: string;
  phase: 'idle' | 'prefill' | 'generation';
}

export interface PerformanceData {
  nodes: string;
  ttft: number; // Time to first token (ms)
  throughput: number; // Tokens per second
}