"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { 
  Monitor, 
  Activity, 
  AlertCircle, 
  TrendingUp, 
  Cpu, 
  Database,
  Network,
  Clock,
  Zap,
  Eye,
  BarChart3,
  PieChart
} from "lucide-react"

const monitoringMetrics = [
  {
    category: "Infrastructure",
    icon: Monitor,
    metrics: [
      { name: "CPU Utilization", value: "72%", trend: "stable", color: "text-green-600" },
      { name: "Memory Usage", value: "68%", trend: "down", color: "text-blue-600" },
      { name: "Network I/O", value: "1.2 GB/s", trend: "up", color: "text-purple-600" },
      { name: "Disk IOPS", value: "15K", trend: "stable", color: "text-yellow-600" }
    ]
  },
  {
    category: "GPU Resources", 
    icon: Cpu,
    metrics: [
      { name: "GPU Utilization", value: "89%", trend: "up", color: "text-red-600" },
      { name: "GPU Memory", value: "24 GB", trend: "stable", color: "text-indigo-600" },
      { name: "GPU Temperature", value: "72°C", trend: "stable", color: "text-orange-600" },
      { name: "Power Usage", value: "250W", trend: "up", color: "text-pink-600" }
    ]
  },
  {
    category: "Applications",
    icon: Activity,
    metrics: [
      { name: "Request Rate", value: "2.5K/s", trend: "up", color: "text-green-600" },
      { name: "Response Time", value: "95ms", trend: "down", color: "text-blue-600" },
      { name: "Error Rate", value: "0.02%", trend: "stable", color: "text-purple-600" },
      { name: "Active Users", value: "1,234", trend: "up", color: "text-yellow-600" }
    ]
  }
]

const alertSeverity = [
  { level: "Critical", count: 2, color: "bg-red-500", description: "GPU temperature threshold exceeded" },
  { level: "Warning", count: 8, color: "bg-yellow-500", description: "Memory usage above 80%" },
  { level: "Info", count: 15, color: "bg-blue-500", description: "Deployment completed successfully" }
]

const MonitoringDashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState("infrastructure")

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Live Monitoring Dashboard</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-slate-300">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metrics Cards */}
        {monitoringMetrics.map((category, index) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <category.icon className="h-5 w-5 text-blue-400" />
              <h4 className="font-medium text-white">{category.category}</h4>
            </div>
            <div className="space-y-3">
              {category.metrics.map((metric) => (
                <div key={metric.name} className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">{metric.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${metric.color}`}>
                      {metric.value}
                    </span>
                    <TrendingUp className={`h-3 w-3 ${
                      metric.trend === 'up' ? 'text-green-400' :
                      metric.trend === 'down' ? 'text-red-400 rotate-180' :
                      'text-slate-400'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-4">
          <h4 className="font-medium text-white mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            GPU Utilization (24h)
          </h4>
          <div className="h-32 bg-slate-700 rounded flex items-center justify-center">
            <span className="text-slate-400 text-sm">Chart visualization</span>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4">
          <h4 className="font-medium text-white mb-4 flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Resource Distribution
          </h4>
          <div className="h-32 bg-slate-700 rounded flex items-center justify-center">
            <span className="text-slate-400 text-sm">Chart visualization</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Monitoring() {
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
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <Monitor className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
              Observability Stack
            </h1>
            <p className="mt-6 text-xl leading-8 text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Comprehensive monitoring, logging, and alerting for AI infrastructure with 
              specialized GPU metrics and model performance tracking.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Monitoring Stats */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { name: "Metrics Collected", value: "50K+", icon: BarChart3 },
              { name: "Log Events/day", value: "10M", icon: Database },
              { name: "Alert Rules", value: "200+", icon: AlertCircle },
              { name: "Uptime", value: "99.9%", icon: TrendingUp }
            ].map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                  <stat.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Dashboard */}
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
              Real-time Monitoring Dashboard
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Live metrics from production infrastructure and AI workloads
            </p>
          </motion.div>
          <MonitoringDashboard />
        </div>
      </section>

      {/* Monitoring Components */}
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
              Monitoring Stack Components
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Enterprise-grade observability tools for comprehensive system insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Prometheus",
                description: "Time-series metrics collection and storage",
                icon: BarChart3,
                features: ["Multi-dimensional metrics", "PromQL query language", "Service discovery", "Alert rules"],
                color: "bg-orange-500"
              },
              {
                name: "Grafana", 
                description: "Visualization and dashboards",
                icon: PieChart,
                features: ["Interactive dashboards", "Multiple data sources", "Alert notifications", "Custom panels"],
                color: "bg-blue-500"
              },
              {
                name: "Jaeger",
                description: "Distributed tracing for microservices",
                icon: Network,
                features: ["Request flow tracking", "Performance bottlenecks", "Service dependencies", "Latency analysis"],
                color: "bg-purple-500"
              },
              {
                name: "Elasticsearch",
                description: "Log storage and search",
                icon: Database,
                features: ["Full-text search", "Log aggregation", "Index management", "Real-time analysis"],
                color: "bg-yellow-500"
              },
              {
                name: "Fluentd",
                description: "Log collection and forwarding",
                icon: Activity,
                features: ["Multi-format parsing", "Data transformation", "Reliable delivery", "Plugin ecosystem"],
                color: "bg-green-500"
              },
              {
                name: "DCGM Exporter",
                description: "GPU metrics collection",
                icon: Cpu,
                features: ["GPU utilization", "Memory usage", "Temperature monitoring", "Power consumption"],
                color: "bg-red-500"
              }
            ].map((component, index) => (
              <motion.div
                key={component.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${component.color}`}>
                    <component.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {component.name}
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                  {component.description}
                </p>
                <div className="space-y-2">
                  {component.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
                      <span className="text-xs text-slate-600 dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Alert Management */}
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
              Alert Management
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Proactive alerting with intelligent escalation and automated responses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Alert Status */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                Active Alerts
              </h3>
              <div className="space-y-4">
                {alertSeverity.map((alert, index) => (
                  <motion.div
                    key={alert.level}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${alert.color}`}></div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {alert.level}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-300">
                          {alert.description}
                        </div>
                      </div>
                    </div>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      {alert.count}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* SLA Metrics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                SLA Performance
              </h3>
              <div className="space-y-6">
                {[
                  { metric: "Uptime", target: "99.9%", current: "99.95%", status: "good" },
                  { metric: "Response Time", target: "< 2s", current: "1.2s", status: "good" },
                  { metric: "Error Rate", target: "< 0.1%", current: "0.02%", status: "good" },
                  { metric: "GPU Availability", target: "95%", current: "97%", status: "good" }
                ].map((sla) => (
                  <div key={sla.metric}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {sla.metric}
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-300">
                        Target: {sla.target}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2 mr-4">
                        <div className="bg-green-500 h-2 rounded-full w-full"></div>
                      </div>
                      <span className="text-sm font-medium text-green-600">
                        {sla.current}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}