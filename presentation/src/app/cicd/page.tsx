"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { 
  GitBranch, 
  PlayCircle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowRight,
  Shield,
  Package,
  Rocket,
  Settings,
  AlertTriangle,
  RefreshCw
} from "lucide-react"

const pipelineStages = [
  {
    name: "Security Scan",
    icon: Shield,
    status: "completed",
    duration: "2m 15s",
    description: "SAST, dependency check, and vulnerability scanning"
  },
  {
    name: "Build",
    icon: Package,
    status: "completed", 
    duration: "3m 45s",
    description: "Docker image build and push to Harbor registry"
  },
  {
    name: "Test",
    icon: CheckCircle,
    status: "completed",
    duration: "5m 30s", 
    description: "Unit tests, integration tests, and code coverage"
  },
  {
    name: "Deploy Staging",
    icon: Rocket,
    status: "running",
    duration: "1m 20s",
    description: "Canary deployment to staging environment"
  },
  {
    name: "E2E Tests",
    icon: Settings,
    status: "pending",
    duration: "—",
    description: "End-to-end testing in staging environment"
  },
  {
    name: "Deploy Production",
    icon: Rocket,
    status: "pending",
    duration: "—",
    description: "Production deployment with blue-green strategy"
  }
]

const deploymentStrategies = [
  {
    name: "Blue-Green Deployment",
    description: "Zero-downtime deployments with instant rollback capability",
    icon: RefreshCw,
    features: [
      "Instant rollback on failure",
      "Zero downtime deployment",
      "Full environment validation",
      "Traffic switching automation"
    ]
  },
  {
    name: "Canary Releases",
    description: "Gradual traffic shifting with automated monitoring",
    icon: GitBranch,
    features: [
      "5% → 25% → 50% → 100% traffic",
      "Automated error threshold monitoring",
      "Performance metrics validation",
      "Auto-rollback on anomalies"
    ]
  },
  {
    name: "Rolling Updates",
    description: "Progressive pod replacement with health checks",
    icon: Settings,
    features: [
      "Kubernetes native rolling updates",
      "Readiness and liveness probes",
      "Resource availability checks",
      "Graceful pod termination"
    ]
  }
]

const PipelineVisualization = () => {
  const [selectedStage, setSelectedStage] = useState<number | null>(null)

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">CI/CD Pipeline Status</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-slate-300">Running</span>
        </div>
      </div>

      <div className="space-y-4">
        {pipelineStages.map((stage, index) => (
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
              selectedStage === index ? 'bg-slate-700' : 'bg-slate-800 hover:bg-slate-750'
            }`}
            onClick={() => setSelectedStage(selectedStage === index ? null : index)}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className={`p-2 rounded-lg ${
                stage.status === 'completed' ? 'bg-green-600' :
                stage.status === 'running' ? 'bg-blue-600 animate-pulse' :
                stage.status === 'failed' ? 'bg-red-600' :
                'bg-slate-600'
              }`}>
                {stage.status === 'completed' ? (
                  <CheckCircle className="h-4 w-4 text-white" />
                ) : stage.status === 'running' ? (
                  <PlayCircle className="h-4 w-4 text-white" />
                ) : stage.status === 'failed' ? (
                  <XCircle className="h-4 w-4 text-white" />
                ) : (
                  <Clock className="h-4 w-4 text-white" />
                )}
              </div>
              <div>
                <h4 className="font-medium text-white">{stage.name}</h4>
                <p className="text-sm text-slate-300">{stage.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">{stage.duration}</span>
              <ArrowRight className={`h-4 w-4 transition-transform ${
                selectedStage === index ? 'rotate-90' : ''
              } text-slate-400`} />
            </div>
          </motion.div>
        ))}
      </div>

      {selectedStage !== null && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 p-4 bg-slate-800 rounded-lg border-l-4 border-blue-500"
        >
          <h4 className="font-medium text-white mb-2">
            {pipelineStages[selectedStage].name} Details
          </h4>
          <div className="text-sm text-slate-300 space-y-1">
            <p>Status: <span className="text-blue-400">{pipelineStages[selectedStage].status}</span></p>
            <p>Duration: <span className="text-green-400">{pipelineStages[selectedStage].duration}</span></p>
            <p>Description: {pipelineStages[selectedStage].description}</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default function CICD() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <GitBranch className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
              CI/CD Pipeline
            </h1>
            <p className="mt-6 text-xl leading-8 text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              GitOps-driven continuous integration and deployment with automated security scanning, 
              testing, and progressive delivery strategies for AI applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pipeline Stats */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { name: "Deploy Frequency", value: "15x/day", icon: Rocket },
              { name: "Lead Time", value: "< 30min", icon: Clock },
              { name: "MTTR", value: "< 5min", icon: RefreshCw },
              { name: "Success Rate", value: "99.2%", icon: CheckCircle }
            ].map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                  <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Pipeline */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Live Pipeline Execution
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Real-time view of the current deployment pipeline for document-intelligence service
            </p>
          </motion.div>
          <PipelineVisualization />
        </div>
      </section>

      {/* Deployment Strategies */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Deployment Strategies
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Advanced deployment patterns for zero-downtime releases and risk mitigation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {deploymentStrategies.map((strategy, index) => (
              <motion.div
                key={strategy.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                    <strategy.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {strategy.name}
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  {strategy.description}
                </p>
                <div className="space-y-3">
                  {strategy.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GitOps Workflow */}
      <section className="px-6 py-24 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              GitOps Workflow
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Declarative deployments with Git as the single source of truth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {[
                {
                  step: "1",
                  title: "Code Commit",
                  description: "Developer pushes code changes to GitLab repository with security scanning",
                  icon: GitBranch
                },
                {
                  step: "2", 
                  title: "CI Pipeline",
                  description: "Automated build, test, security scan, and container image creation",
                  icon: Settings
                },
                {
                  step: "3",
                  title: "GitOps Sync",
                  description: "ArgoCD detects configuration changes and syncs to Kubernetes cluster",
                  icon: RefreshCw
                },
                {
                  step: "4",
                  title: "Deployment",
                  description: "Progressive rollout with monitoring and automated rollback on failures",
                  icon: Rocket
                }
              ].map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold text-sm">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-2xl p-8 text-white"
            >
              <h3 className="text-lg font-semibold mb-6">Pipeline Configuration</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Trigger:</span>
                  <span className="text-blue-400">Git Push</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Security Scan:</span>
                  <span className="text-green-400">SAST + DAST</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Test Coverage:</span>
                  <span className="text-green-400">&gt; 80%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Registry:</span>
                  <span className="text-purple-400">Harbor</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Deployment:</span>
                  <span className="text-yellow-400">ArgoCD</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Rollback Time:</span>
                  <span className="text-red-400">&lt; 30s</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-slate-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium">Quality Gates</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <p>• Zero critical security vulnerabilities</p>
                  <p>• Test coverage &gt; 80%</p>
                  <p>• Performance regression &lt; 10%</p>
                  <p>• All health checks passing</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}