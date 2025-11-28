"use client"

import { motion } from "framer-motion"
import { 
  Shield, 
  Lock, 
  Eye, 
  Key, 
  AlertTriangle, 
  CheckCircle,
  Network,
  FileText,
  Settings,
  Users,
  Server,
  Database
} from "lucide-react"

const securityLayers = [
  {
    title: "Network Security",
    icon: Network,
    description: "Zero-trust network architecture with micro-segmentation",
    features: [
      "Kubernetes Network Policies",
      "Istio Service Mesh with mTLS",
      "WAF and DDoS protection",
      "Firewall zone separation"
    ],
    color: "bg-red-500"
  },
  {
    title: "Identity & Access",
    icon: Users,
    description: "Role-based access control and identity management",
    features: [
      "Active Directory integration",
      "Kubernetes RBAC",
      "Service account management",
      "Multi-factor authentication"
    ],
    color: "bg-blue-500"
  },
  {
    title: "Data Protection",
    icon: Database,
    description: "Encryption at rest and in transit",
    features: [
      "AES-256 encryption at rest",
      "TLS 1.3 for data in transit",
      "Secrets management with Vault",
      "Certificate lifecycle management"
    ],
    color: "bg-green-500"
  },
  {
    title: "Runtime Security",
    icon: Eye,
    description: "Real-time threat detection and prevention",
    features: [
      "Falco runtime monitoring",
      "OPA Gatekeeper policies",
      "Container image scanning",
      "Behavioral anomaly detection"
    ],
    color: "bg-purple-500"
  }
]

const complianceFrameworks = [
  { name: "SOC 2 Type II", status: "Compliant", description: "Security controls audit" },
  { name: "ISO 27001", status: "In Progress", description: "Information security management" },
  { name: "GDPR", status: "Compliant", description: "Data protection regulation" },
  { name: "HIPAA", status: "Ready", description: "Healthcare data protection" }
]

export default function Security() {
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
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
              <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
              Security Architecture
            </h1>
            <p className="mt-6 text-xl leading-8 text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Zero-trust security model with defense-in-depth strategy, ensuring comprehensive 
              protection for sensitive legal data and AI inference services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Security Stats */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { name: "Security Policies", value: "150+", icon: FileText },
              { name: "Access Controls", value: "RBAC", icon: Users },
              { name: "Encryption", value: "AES-256", icon: Lock },
              { name: "Threat Detection", value: "24/7", icon: Eye }
            ].map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900">
                  <stat.icon className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Layers */}
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
              Defense in Depth
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Multi-layered security approach protecting all aspects of the infrastructure
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {securityLayers.map((layer, index) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl ${layer.color}`}>
                    <layer.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {layer.title}
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  {layer.description}
                </p>
                <div className="space-y-3">
                  {layer.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Controls */}
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
              Security Controls
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Comprehensive security controls across all infrastructure components
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                category: "Access Controls",
                icon: Key,
                controls: [
                  "Role-Based Access Control (RBAC)",
                  "Service Account Management",
                  "Pod Security Standards",
                  "Network Policy Enforcement",
                  "API Server Authentication"
                ]
              },
              {
                category: "Data Security",
                icon: Lock,
                controls: [
                  "Encryption at Rest (AES-256)",
                  "Encryption in Transit (TLS 1.3)",
                  "Secret Management (Vault)",
                  "Certificate Rotation",
                  "Key Management Service"
                ]
              },
              {
                category: "Monitoring & Alerting",
                icon: AlertTriangle,
                controls: [
                  "Runtime Security (Falco)",
                  "Audit Log Analysis",
                  "Anomaly Detection",
                  "Security Event Correlation",
                  "Incident Response Automation"
                ]
              }
            ].map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <category.icon className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {category.category}
                  </h3>
                </div>
                <div className="space-y-3">
                  {category.controls.map((control) => (
                    <div key={control} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 dark:text-slate-300 text-sm">
                        {control}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
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
              Compliance & Auditing
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Meeting enterprise compliance requirements with comprehensive audit trails
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceFrameworks.map((framework, index) => (
              <motion.div
                key={framework.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 text-center"
              >
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                  framework.status === 'Compliant' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                  framework.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                  'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                }`}>
                  {framework.status}
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  {framework.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {framework.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}