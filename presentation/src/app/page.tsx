"use client"

import { motion } from "framer-motion"
import { 
  Shield, 
  Zap, 
  Server, 
  GitBranch, 
  Monitor, 
  Lock,
  Cpu,
  Database,
  Network,
  Globe,
  ArrowRight,
  CheckCircle
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Server,
    title: "High Availability Infrastructure",
    description: "3-node Kubernetes control plane with etcd clustering and zero-downtime deployments"
  },
  {
    icon: Cpu,
    title: "GPU Acceleration",
    description: "Dedicated NVIDIA GPU nodes with Triton Inference Server for AI workloads"
  },
  {
    icon: Shield,
    title: "Zero-Trust Security",
    description: "Service mesh with mutual TLS and network micro-segmentation"
  },
  {
    icon: GitBranch,
    title: "GitOps Deployment",
    description: "ArgoCD with canary releases and automated rollback mechanisms"
  },
  {
    icon: Monitor,
    title: "AI-Specific Monitoring",
    description: "GPU utilization, model performance, and inference latency tracking"
  },
  {
    icon: Database,
    title: "Enterprise Storage",
    description: "Distributed storage with backup and disaster recovery capabilities"
  }
]

const stats = [
  { name: "Uptime SLA", value: "99.9%", icon: CheckCircle },
  { name: "GPU Nodes", value: "8x", icon: Cpu },
  { name: "Max Inference/sec", value: "10K+", icon: Zap },
  { name: "Security Compliance", value: "SOC2", icon: Lock }
]

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Cortex AI Platform
                </span>
              </h1>
              <p className="mt-6 text-xl leading-8 text-slate-300">
                Production-ready DevOps architecture for on-premise AI platform running on Cisco AI Pods with GPU inference services for legal document processing
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link
                href="/architecture"
                className="group rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
              >
                View Architecture
                <ArrowRight className="ml-2 h-4 w-4 inline group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/implementation"
                className="group text-sm font-semibold leading-6 text-white hover:text-blue-400 transition-colors"
              >
                Implementation Details
                <ArrowRight className="ml-2 h-4 w-4 inline group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-400/20 to-blue-600/20 blur-3xl" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-400/10">
                  <stat.icon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.name}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Enterprise-Grade Architecture
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Built for reliability, security, and scalability in production environments
            </p>
          </motion.div>
          
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm hover:border-blue-700 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-400/10 group-hover:bg-blue-400/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-slate-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 px-6 py-24 text-center shadow-2xl sm:px-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to explore the architecture?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Dive deep into the technical details, security implementations, and operational procedures
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/architecture"
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-900 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                View Full Architecture
              </Link>
              <Link
                href="/implementation"
                className="text-sm font-semibold leading-6 text-white hover:text-blue-200 transition-colors"
              >
                See Implementation <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
              <div className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
