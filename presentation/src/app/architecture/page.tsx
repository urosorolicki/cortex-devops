"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  Server, 
  Shield, 
  Database, 
  Monitor, 
  GitBranch, 
  Network,
  Cpu,
  Lock,
  Globe,
  Settings,
  ArrowRight,
  Info
} from "lucide-react"

const architectureComponents = [
  {
    id: "ingress",
    title: "Ingress Load Balancer",
    description: "WAF, DDoS protection, SSL termination with MetalLB",
    icon: Network,
    position: { x: 5, y: 5 },
    color: "bg-green-500",
    details: "Nginx Ingress Controller with SSL termination, rate limiting, and DDoS protection. MetalLB provides LoadBalancer services in on-premise environment."
  },
  {
    id: "control-plane",
    title: "K8s Control Plane", 
    description: "3-node HA cluster with etcd",
    icon: Server,
    position: { x: 5, y: 25 },
    color: "bg-blue-500",
    details: "High availability control plane with 3 master nodes, distributed etcd cluster, and automatic failover capabilities."
  },
  {
    id: "gpu-nodes",
    title: "GPU Worker Nodes",
    description: "NVIDIA GPU nodes with Triton Server",
    icon: Cpu,
    position: { x: 55, y: 25 },
    color: "bg-purple-500",
    details: "Dedicated GPU nodes with NVIDIA V100/A100 GPUs, Triton Inference Server, and GPU operator for resource management."
  },
  {
    id: "cpu-nodes",
    title: "CPU Worker Nodes", 
    description: "Application workloads and services",
    icon: Server,
    position: { x: 5, y: 45 },
    color: "bg-blue-400",
    details: "CPU-optimized worker nodes running application services, databases, and support infrastructure."
  },
  {
    id: "security",
    title: "Security Stack",
    description: "Vault, OPA, Falco, mTLS",
    icon: Shield,
    position: { x: 55, y: 45 },
    color: "bg-red-500",
    details: "HashiCorp Vault for secrets, OPA Gatekeeper for policies, Falco for runtime security, and Istio service mesh for mTLS."
  },
  {
    id: "monitoring",
    title: "Monitoring Stack",
    description: "Prometheus, Grafana, Jaeger",
    icon: Monitor,
    position: { x: 5, y: 65 },
    color: "bg-yellow-500",
    details: "Prometheus metrics collection, Grafana dashboards, Jaeger distributed tracing, and AlertManager for notifications."
  },
  {
    id: "cicd",
    title: "CI/CD Pipeline",
    description: "GitLab CI, ArgoCD, Harbor",
    icon: GitBranch,
    position: { x: 55, y: 65 },
    color: "bg-indigo-500",
    details: "GitLab CI/CD pipelines, ArgoCD for GitOps deployments, Harbor container registry with vulnerability scanning."
  },
  {
    id: "storage",
    title: "Persistent Storage",
    description: "Ceph, Longhorn, NFS",
    icon: Database,
    position: { x: 30, y: 85 },
    color: "bg-green-600",
    details: "Distributed storage with Ceph/Longhorn, NFS for shared storage, automated backups with Velero."
  }
]

const InteractiveDiagram = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null)
  
  // Dodaj CSS animacije za grid
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gridMove {
        0% { transform: translate(0, 0); }
        100% { transform: translate(40px, 40px); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-8">
        {/* Diagram */}
        <div className="relative h-[600px] bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-xl p-6 overflow-hidden border border-slate-600 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xl font-semibold text-white">Interactive System Architecture</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300">99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-300">8 GPU Nodes</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-500/20 px-3 py-1 rounded-lg">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-purple-300">2.5K req/s</span>
              </div>
            </div>
          </div>
          <div className="relative w-full h-[500px]">
            {architectureComponents.map((component) => (
              <motion.div
                key={component.id}
                className={`absolute w-20 h-20 rounded-xl ${component.color} cursor-pointer flex flex-col items-center justify-center shadow-2xl border-2 border-white/30 backdrop-blur-sm`}
                style={{
                  left: `${component.position.x}%`,
                  top: `${component.position.y}%`,
                  filter: selectedComponent === component.id ? 'brightness(1.2)' : 'brightness(1)',
                }}
                whileHover={{ 
                  scale: 1.2, 
                  zIndex: 10,
                  rotateY: 10,
                  rotateX: 5,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
                whileTap={{ scale: 0.9, rotateY: -5 }}
                animate={{
                  boxShadow: selectedComponent === component.id 
                    ? '0 0 20px rgba(59, 130, 246, 0.6)'
                    : '0 10px 25px rgba(0, 0, 0, 0.3)'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onHoverStart={() => setHoveredComponent(component.id)}
                onHoverEnd={() => setHoveredComponent(null)}
                onClick={() => setSelectedComponent(
                  selectedComponent === component.id ? null : component.id
                )}
              >
                <motion.div
                  animate={{
                    scale: selectedComponent === component.id ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 1, repeat: selectedComponent === component.id ? Infinity : 0 }}
                >
                  <component.icon className={`h-7 w-7 text-white mb-1 ${
                    selectedComponent === component.id ? 'drop-shadow-lg' : ''
                  }`} />
                </motion.div>
                <span className="text-xs text-white font-medium text-center leading-tight px-1 drop-shadow-md">
                  {component.title.split(' ').slice(0, 2).join(' ')}
                </span>
                {selectedComponent === component.id && (
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl opacity-30 blur-sm"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
            
            {/* Floating Data Particles - kreativni pristup bez linija */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* API Gateway particles */}
              <div className="absolute top-[15%] left-[40%] w-2 h-2 bg-blue-400 rounded-full animate-ping" 
                   style={{animationDelay: '0s', animationDuration: '2s'}}></div>
              <div className="absolute top-[20%] left-[35%] w-1 h-1 bg-blue-300 rounded-full animate-bounce" 
                   style={{animationDelay: '0.5s', animationDuration: '1.5s'}}></div>
              
              {/* LLM Service particles */}
              <div className="absolute top-[25%] left-[20%] w-2 h-2 bg-green-400 rounded-full animate-pulse" 
                   style={{animationDelay: '1s', animationDuration: '2.2s'}}></div>
              <div className="absolute top-[30%] left-[15%] w-1 h-1 bg-green-300 rounded-full animate-ping" 
                   style={{animationDelay: '1.5s', animationDuration: '1.8s'}}></div>
              
              {/* Document Intelligence particles */}
              <div className="absolute top-[25%] left-[60%] w-2 h-2 bg-purple-400 rounded-full animate-bounce" 
                   style={{animationDelay: '0.8s', animationDuration: '2.5s'}}></div>
              <div className="absolute top-[30%] left-[65%] w-1 h-1 bg-purple-300 rounded-full animate-pulse" 
                   style={{animationDelay: '2s', animationDuration: '1.7s'}}></div>
              
              {/* Control Plane particles */}
              <div className="absolute top-[35%] left-[40%] w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-70" 
                   style={{animationDelay: '0.3s', animationDuration: '3s'}}></div>
              <div className="absolute top-[38%] left-[42%] w-1 h-1 bg-yellow-300 rounded-full animate-bounce" 
                   style={{animationDelay: '1.8s', animationDuration: '1.4s'}}></div>
              
              {/* Workers particles */}
              <div className="absolute top-[45%] left-[25%] w-2 h-2 bg-indigo-400 rounded-full animate-pulse" 
                   style={{animationDelay: '1.2s', animationDuration: '2.1s'}}></div>
              <div className="absolute top-[45%] left-[55%] w-2 h-2 bg-cyan-400 rounded-full animate-ping" 
                   style={{animationDelay: '0.7s', animationDuration: '2.3s'}}></div>
              
              {/* Security particles */}
              <div className="absolute top-[55%] left-[65%] w-2 h-2 bg-red-400 rounded-full animate-bounce opacity-80" 
                   style={{animationDelay: '1.6s', animationDuration: '1.9s'}}></div>
              <div className="absolute top-[60%] left-[60%] w-1 h-1 bg-red-300 rounded-full animate-pulse" 
                   style={{animationDelay: '2.2s', animationDuration: '1.6s'}}></div>
              
              {/* Monitoring & CI/CD particles */}
              <div className="absolute top-[75%] left-[15%] w-2 h-2 bg-orange-400 rounded-full animate-ping" 
                   style={{animationDelay: '0.9s', animationDuration: '2.4s'}}></div>
              <div className="absolute top-[75%] left-[65%] w-2 h-2 bg-teal-400 rounded-full animate-bounce" 
                   style={{animationDelay: '1.4s', animationDuration: '2s'}}></div>
              
              {/* Storage particles */}
              <div className="absolute top-[85%] left-[40%] w-3 h-3 bg-emerald-400 rounded-full animate-pulse opacity-90" 
                   style={{animationDelay: '0.5s', animationDuration: '2.8s'}}></div>
              <div className="absolute top-[88%] left-[38%] w-1 h-1 bg-emerald-300 rounded-full animate-ping" 
                   style={{animationDelay: '2.5s', animationDuration: '1.3s'}}></div>
              
              {/* Floating gradient orbs za ambient efekat */}
              <div className="absolute top-[20%] left-[10%] w-8 h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-sm animate-pulse" 
                   style={{animationDelay: '3s', animationDuration: '4s'}}></div>
              <div className="absolute top-[60%] left-[75%] w-6 h-6 bg-gradient-to-r from-green-500/20 to-yellow-500/20 rounded-full blur-sm animate-bounce" 
                   style={{animationDelay: '1s', animationDuration: '3.5s'}}></div>
              <div className="absolute top-[80%] left-[20%] w-10 h-10 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-md animate-ping" 
                   style={{animationDelay: '2s', animationDuration: '5s'}}></div>
            </div>
            
            {/* Holographic Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                animation: 'gridMove 20s linear infinite'
              }}></div>
            </div>
            
            {/* Wave Animations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
              <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
              <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" 
                   style={{animationDelay: '1s'}}></div>
              <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" 
                   style={{animationDelay: '2s'}}></div>
            </div>
            
            {/* Digital Rain Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
              {[...Array(8)].map((_, i) => (
                <div key={i} 
                     className="absolute w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse"
                     style={{
                       left: `${12.5 * (i + 1)}%`,
                       height: '100%',
                       animationDelay: `${i * 0.3}s`,
                       animationDuration: '3s'
                     }}>
                </div>
              ))}
            </div>
            
            {/* Status indicators */}
            <div className="absolute bottom-4 left-4 text-xs font-mono">
              <span className="text-green-400 animate-pulse">● ONLINE</span>
            </div>
            <div className="absolute bottom-4 right-4 text-xs font-mono">
              <span className="text-blue-400 animate-pulse">⚡ ACTIVE</span>
            </div>
            
            {/* Labels for diagram sections */}
            <div className="absolute top-2 left-4 text-xs text-slate-300 font-medium">External Access</div>
            <div className="absolute top-24 left-4 text-xs text-slate-300 font-medium">Control Plane</div>
            <div className="absolute top-24 right-4 text-xs text-slate-300 font-medium">GPU Nodes</div>
            <div className="absolute bottom-24 left-4 text-xs text-slate-300 font-medium">Services</div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-slate-300 font-medium">Storage Layer</div>
            
            {/* Connection Legend */}
            <div className="absolute bottom-2 right-4 bg-slate-800/90 backdrop-blur-md rounded-lg p-3 text-xs border border-slate-600 shadow-xl">
              <div className="text-white font-medium mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Data Flow Legend
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-0.5 bg-blue-500 animate-pulse"></div>
                <span className="text-slate-300">Control Traffic</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-0.5 bg-green-500"></div>
                <span className="text-slate-300">Service Mesh</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-purple-500"></div>
                <span className="text-slate-300">Storage Access</span>
              </div>
            </div>
            
            {/* Hover tooltip */}
            {hoveredComponent && !selectedComponent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute top-4 right-4 bg-black/90 backdrop-blur-md text-white p-4 rounded-xl text-sm max-w-xs z-30 border border-blue-500/30 shadow-2xl"
              >
                {(() => {
                  const component = architectureComponents.find(c => c.id === hoveredComponent)
                  return component ? (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-1.5 rounded-lg ${component.color}`}>
                          <component.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="font-semibold text-blue-300">{component.title}</div>
                      </div>
                      <div className="text-xs text-slate-300 mb-3">{component.description}</div>
                      <div className="flex items-center gap-1 text-xs text-green-400">
                        <span className="animate-pulse">💡</span>
                        Click for detailed specs
                      </div>
                    </>
                  ) : null
                })()}
              </motion.div>
            )}
          </div>
        </div>

        {/* Component Details */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            Component Details
          </h3>
          {selectedComponent || hoveredComponent ? (
            <motion.div
              key={selectedComponent || hoveredComponent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg"
            >
              {(() => {
                const component = architectureComponents.find(
                  c => c.id === (selectedComponent || hoveredComponent)
                )
                return component ? (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl ${component.color} shadow-lg`}>
                        <component.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">
                          {component.title}
                        </h4>
                        <p className="text-sm text-slate-400">
                          Component ID: {component.id}
                        </p>
                      </div>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-4 mb-4">
                      <h5 className="font-medium text-white mb-2">Description</h5>
                      <p className="text-slate-300 text-sm">
                        {component.description}
                      </p>
                    </div>
                    <div className="bg-blue-900/20 rounded-lg p-4">
                      <h5 className="font-medium text-blue-200 mb-2">Technical Details</h5>
                      <p className="text-sm text-blue-300">
                        {component.details}
                      </p>
                    </div>
                  </>
                ) : null
              })()}
            </motion.div>
          ) : (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border-2 border-dashed border-slate-700 text-center">
              <Info className="h-12 w-12 mx-auto text-slate-400 mb-4" />
              <h4 className="font-semibold text-slate-300 mb-2">Interactive Architecture</h4>
              <p className="text-slate-400">
                Click or hover over any component to explore its details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Architecture() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              System Architecture
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Interactive overview of the Cortex AI Platform infrastructure
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Diagram Section */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <InteractiveDiagram />
          </motion.div>
        </div>
      </section>

      {/* Architecture Layers */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Architecture Layers
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-300">
              Detailed breakdown of each infrastructure layer
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                title: "Network & Security Layer",
                description: "External access control, firewall protection, and load balancing",
                components: ["DMZ Zone", "WAF/Proxy", "API Gateway", "Firewall", "Load Balancer"],
                color: "border-l-green-500"
              },
              {
                title: "Kubernetes Control Plane", 
                description: "High availability cluster management and orchestration",
                components: ["3x Master Nodes", "etcd Cluster", "API Server", "Scheduler", "Controller Manager"],
                color: "border-l-blue-500"
              },
              {
                title: "Compute Layer",
                description: "Specialized worker nodes for different workload types",
                components: ["GPU Worker Nodes", "CPU Worker Nodes", "GPU Operators", "Node Affinity"],
                color: "border-l-purple-500"
              },
              {
                title: "Application Layer",
                description: "AI services, APIs, and support applications",
                components: ["Document Intelligence", "LLM Services", "Court APIs", "Web Frontend", "Cache Layer"],
                color: "border-l-indigo-500"
              },
              {
                title: "Infrastructure Services",
                description: "Monitoring, logging, security, and storage services",
                components: ["Prometheus/Grafana", "ELK Stack", "Vault/OPA", "Ceph/Longhorn", "Backup Services"],
                color: "border-l-yellow-500"
              }
            ].map((layer, index) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-slate-900 rounded-lg p-4 border-l-4 ${layer.color} shadow-sm`}
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {layer.title}
                </h3>
                <p className="text-sm text-slate-300 mb-3">
                  {layer.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {layer.components.map((component) => (
                    <span
                      key={component}
                      className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm"
                    >
                      {component}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl mb-6">
              Explore More Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                { title: "Security", href: "/security", icon: Shield, description: "Zero-trust security model" },
                { title: "CI/CD", href: "/cicd", icon: GitBranch, description: "GitOps deployment pipeline" },
                { title: "Monitoring", href: "/monitoring", icon: Monitor, description: "Observability stack" }
              ].map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -5 }}
                  className="bg-slate-900 rounded-lg p-5 shadow-sm border border-slate-800 hover:border-blue-700 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-900 rounded-lg">
                      <item.icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-slate-300 mb-4">
                    {item.description}
                  </p>
                  <motion.a
                    href={item.href}
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-blue-400 font-medium"
                  >
                    Learn more <ArrowRight className="h-4 w-4" />
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}