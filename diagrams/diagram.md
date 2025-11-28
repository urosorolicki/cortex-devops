# Visual Diagram Creation Guide

## Simple Layout for PowerPoint/Draw.io

```
┌─────────────────────────────────────────────────────────────┐
│                        EXTERNAL ACCESS                     │
│  [Court Users] ──→ [WAF/Firewall] ──→ [API Gateway]       │
└─────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────┐
│                    KUBERNETES CLUSTER                      │
│                                                             │
│  ┌─────────────────┐    ┌─────────────────────────────────┐ │
│  │  CONTROL PLANE  │    │         WORKER NODES            │ │
│  │                 │    │                                 │ │
│  │ ┌─────────────┐ │    │ ┌─────────────┐ ┌─────────────┐ │ │
│  │ │   Master    │ │    │ │ CPU NODES   │ │ GPU NODES   │ │ │
│  │ │   Nodes     │ │    │ │             │ │             │ │ │
│  │ │   (x3)      │ │    │ │ - Doc Agent │ │ - LLM       │ │ │
│  │ │             │ │    │ │ - APIs      │ │ - Triton    │ │ │
│  │ └─────────────┘ │    │ │ - Web UI    │ │ - Models    │ │ │
│  └─────────────────┘    │ └─────────────┘ └─────────────┘ │ │
│                         └─────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────┐
│                  INFRASTRUCTURE LAYER                      │
│                                                             │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────┐ │
│ │ MONITORING  │ │   CI/CD     │ │  SECURITY   │ │ STORAGE │ │
│ │             │ │             │ │             │ │         │ │
│ │ Prometheus  │ │ GitLab      │ │ Vault       │ │ Ceph    │ │
│ │ Grafana     │ │ Harbor      │ │ OPA         │ │ MinIO   │ │
│ │ AlertMgr    │ │ ArgoCD      │ │ Falco       │ │ PVs     │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## PowerPoint Creation Steps

1. **Open PowerPoint** - Create new blank presentation
2. **Insert Shapes**:
   - Rectangles for main sections
   - Rounded rectangles for components
   - Arrows for data flow
3. **Color Scheme**:
   - Blue for infrastructure
   - Green for applications
   - Orange for security
   - Gray for storage
4. **Layout Sections**:
   - Top: External Access (WAF, API Gateway)
   - Middle: Kubernetes Cluster (Control Plane + Workers)
   - Bottom: Infrastructure Services

## Key Components to Show

### External Layer
- Court Users/APIs
- WAF/Firewall
- API Gateway
- Load Balancer

### Kubernetes Cluster
- Control Plane (3 Masters)
- CPU Worker Nodes
- GPU Worker Nodes
- Ingress Controller

### Applications
- Document Intelligence Agent
- LLM Inference Services
- Court APIs
- Web Frontend

### Infrastructure
- Monitoring Stack
- CI/CD Pipeline
- Security Services
- Storage Systems

## Export Instructions

1. **PowerPoint**: File → Export → Create PDF/XPS
2. **Draw.io**: File → Export as → PDF
3. **Save as**: `cortex-ai-architecture-diagram.pdf`

## Presentation Tips

- Start with external access flow
- Show how requests reach GPU inference
- Highlight security boundaries
- Explain monitoring and CI/CD integration
- Discuss scaling and failover paths