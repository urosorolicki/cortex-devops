"use client"

import { motion } from "framer-motion"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useState } from "react"
import { 
  Copy, 
  Check, 
  FileText, 
  Settings, 
  Shield, 
  GitBranch,
  Database,
  Monitor,
  ChevronRight,
  Download
} from "lucide-react"

const codeExamples = {
  deployment: {
    title: "Document Intelligence Deployment",
    description: "Kubernetes deployment with GPU scheduling, security context, and health checks",
    icon: FileText,
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: document-intelligence-agent
  namespace: ai-services
  labels:
    app: document-intelligence-agent
    version: v1.0.0
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  selector:
    matchLabels:
      app: document-intelligence-agent
  template:
    metadata:
      labels:
        app: document-intelligence-agent
        version: v1.0.0
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "8080"
    spec:
      serviceAccountName: document-intelligence-sa
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        fsGroup: 2000
      containers:
      - name: document-agent
        image: harbor.cortex.local/ai-services/document-intelligence:v1.0.0
        ports:
        - containerPort: 8080
          name: http
        env:
        - name: MODEL_ENDPOINT
          value: "http://llm-inference-service:8000/v1/completions"
        - name: LOG_LEVEL
          value: "INFO"
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "2000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10`
  },
  cicd: {
    title: "GitLab CI/CD Pipeline",
    description: "Complete CI/CD pipeline with security scanning, testing, and deployment",
    icon: GitBranch,
    code: `stages:
  - security-scan
  - build
  - test
  - deploy-staging
  - deploy-production

variables:
  DOCKER_DRIVER: overlay2
  HARBOR_REGISTRY: "harbor.cortex.local"
  IMAGE_NAME: "\${HARBOR_REGISTRY}/ai-services/document-intelligence"

security-scan:
  stage: security-scan
  image: returntocorp/semgrep:latest
  script:
    - semgrep --config=auto --json --output=semgrep-report.json .
  artifacts:
    reports:
      sast: semgrep-report.json

build:
  stage: build
  image: docker:20.10.16
  services:
    - docker:20.10.16-dind
  script:
    - docker build -t \$IMAGE_NAME:\$CI_COMMIT_SHA .
    - docker push \$IMAGE_NAME:\$CI_COMMIT_SHA
  rules:
    - if: \$CI_COMMIT_BRANCH == "main"

deploy-production:
  stage: deploy-production
  image: bitnami/kubectl:latest
  script:
    - kubectl config use-context production-cluster
    - envsubst < k8s/deployment.yaml | kubectl apply -f -
    - kubectl rollout status deployment/document-intelligence-agent
  rules:
    - if: \$CI_COMMIT_BRANCH == "main"
  when: manual`
  },
  security: {
    title: "Security Policies",
    description: "RBAC, Network Policies, and OPA Gatekeeper rules for zero-trust security",
    icon: Shield,
    code: `apiVersion: v1
kind: ServiceAccount
metadata:
  name: document-intelligence-sa
  namespace: ai-services
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: document-intelligence-role
  namespace: ai-services
rules:
- apiGroups: [""]
  resources: ["secrets", "configmaps"]
  verbs: ["get", "list"]
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: document-intelligence-netpol
  namespace: ai-services
spec:
  podSelector:
    matchLabels:
      app: document-intelligence-agent
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 8080
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: ai-inference
    ports:
    - protocol: TCP
      port: 8000`
  },
  monitoring: {
    title: "Prometheus Configuration",
    description: "GPU metrics, application monitoring, and alerting rules",
    icon: Monitor,
    code: `global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

scrape_configs:
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true

  - job_name: 'gpu-metrics'
    static_configs:
      - targets: ['dcgm-exporter:9400']
    scrape_interval: 5s

  - job_name: 'document-intelligence'
    kubernetes_sd_configs:
      - role: endpoints
        namespaces:
          names:
          - ai-services
    relabel_configs:
      - source_labels: [__meta_kubernetes_service_name]
        action: keep
        regex: document-intelligence-service

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093`
  }
}

const CodeBlock = ({ title, description, icon: Icon, code }: any) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
    >
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                {description}
              </p>
            </div>
          </div>
          <button
            onClick={copyToClipboard}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4 text-slate-500" />
            )}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language="yaml"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            background: 'transparent',
            fontSize: '0.875rem',
            lineHeight: '1.5'
          }}
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </motion.div>
  )
}

export default function Implementation() {
  const [activeTab, setActiveTab] = useState('deployment')

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
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
              Implementation Details
            </h1>
            <p className="mt-6 text-xl leading-8 text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Production-ready Kubernetes manifests, CI/CD pipelines, security policies, 
              and monitoring configurations for the Cortex AI Platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Configuration Tabs */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2 mb-8 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            {Object.entries(codeExamples).map(([key, example]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === key
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <example.icon className="h-4 w-4" />
                {example.title}
              </button>
            ))}
          </div>

          <CodeBlock {...codeExamples[activeTab as keyof typeof codeExamples]} />
        </div>
      </section>

      {/* Implementation Features */}
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
              Key Implementation Features
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Production-ready configurations with enterprise-grade security and reliability
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Zero-Trust Security",
                description: "Network policies, RBAC, service mesh with mTLS",
                features: ["Network micro-segmentation", "Pod security contexts", "Secrets management", "Runtime security"]
              },
              {
                icon: GitBranch,
                title: "GitOps Deployment",
                description: "Automated CI/CD with ArgoCD and security scanning",
                features: ["Automated security scans", "Canary deployments", "Rollback mechanisms", "Infrastructure as Code"]
              },
              {
                icon: Database,
                title: "Persistent Storage",
                description: "Distributed storage with backup and disaster recovery",
                features: ["High availability storage", "Automated backups", "Disaster recovery", "Data encryption"]
              },
              {
                icon: Monitor,
                title: "Observability Stack",
                description: "Comprehensive monitoring, logging, and alerting",
                features: ["GPU metrics monitoring", "Distributed tracing", "Log aggregation", "Custom alerting"]
              },
              {
                icon: Settings,
                title: "Resource Management",
                description: "Efficient resource allocation and autoscaling",
                features: ["GPU resource sharing", "Horizontal pod autoscaling", "Resource quotas", "Node affinity"]
              },
              {
                icon: FileText,
                title: "Configuration Management",
                description: "Centralized configuration with validation",
                features: ["ConfigMap management", "Secret rotation", "Policy enforcement", "Compliance auditing"]
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <feature.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.features.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <ChevronRight className="h-3 w-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              Get Complete Implementation Files
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Download all Kubernetes manifests, CI/CD pipelines, security policies, 
              and monitoring configurations ready for production deployment.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              <Download className="h-5 w-5" />
              Download Complete Package
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}