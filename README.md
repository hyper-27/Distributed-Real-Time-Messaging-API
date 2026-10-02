# Distributed Real-Time Messaging API

![Node.js](https://img.shields.io/badge/Node.js-18+-43853d?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express)
![Redis](https://img.shields.io/badge/Redis-6.x-DC382D?style=flat-square&logo=redis)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?style=flat-square&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker)
![NGINX](https://img.shields.io/badge/NGINX-Alpine-009639?style=flat-square&logo=nginx)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)


┌─────────────────────────────────────────────────────────────────┐
│                         Internet Clients                        │
│                    (WebSocket + HTTP Requests)                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    ┌────────▼─────────┐
                    │   NGINX:80       │
                    │ (Rate Limiter    │
                    │  + Load Balancer)│
                    └────────┬─────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
   ┌────▼─────┐         ┌────▼─────┐        ┌────▼─────┐
   │ Node.js   │         │ Node.js   │        │ Node.js   │
   │ Instance1 │         │ Instance2 │        │ Instance3 │
   │  :3000    │         │  :3000    │        │  :3000    │
   └────┬─────┘         └────┬─────┘        └────┬─────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
           ┌────▼─────────┐        ┌─────▼──────┐
           │ Redis:6379   │        │PostgreSQL  │
           │ (Pub/Sub &   │        │  :5432     │
           │  Cache)      │        │(Persistence)|
           └──────────────┘        └────────────┘

A high-performance, containerized microservices backend for real-time WebSocket messaging. Built with Node.js, Redis, PostgreSQL, NGINX, and Docker to support distributed, scalable communication systems.

**[📖 Full Documentation](#table-of-contents)** | **[🚀 Quick Start](#quick-start)** | **[📊 Performance](#performance-benchmarks)** | **[🏗️ Architecture](#architecture-overview)**

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Quick Start for Developers](#quick-start-for-developers)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Load Testing](#load-testing)
- [Performance Benchmarks](#performance-benchmarks)
- [Scaling & Optimization](#scaling--optimization)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)
- [Production Deployment Guide](#production-deployment-guide)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This project demonstrates a **production-grade distributed messaging system** that combines:

✅ Real-time WebSocket communication across multiple service instances  
✅ Redis Pub/Sub for low-latency cross-instance message routing  
✅ PostgreSQL for persistent message storage and state management  
✅ NGINX reverse proxy with DDoS mitigation via IP rate limiting  
✅ Horizontal scaling to 3+ Node.js replicas  
✅ Docker containerization for consistent deployment  

**Key Metrics:**
- 150+ WebSocket messages per second
- 5,000+ concurrent database insertions
- Sub-100ms message delivery latency
- 1000+ concurrent WebSocket connections maintained

This architecture is ideal for:
- Real-time chat/messaging platforms
- Live notification systems
- Collaborative applications
- Live data streaming dashboards

---

## Key Features

### 🚀 High-Performance WebSocket Handling
- Persistent TCP connections for instant message delivery
- Automatic reconnection and state recovery
- Cross-instance message broadcasting via Redis Pub/Sub
- Efficient connection pooling and memory management

### 🛡️ DDoS Protection & Rate Limiting
- NGINX IP-based rate limiting (10 req/s per IP, 20-request burst)
- Configurable rate limits in `nginx.conf`
- Automatic request dropping when thresholds exceeded
- Protection against connection flooding and abuse

### 📊 Horizontal Scalability
- 3 Node.js instances with load distribution via NGINX
- Stateless application design for easy scaling
- Shared Redis & PostgreSQL backends
- Add replicas with one configuration change

### 💾 Data Persistence
- All messages stored in PostgreSQL
- Redis for temporary cache and pub/sub only
- Automatic recovery on service restart
- ACID compliance for critical operations

### 🐳 Docker Optimization
- Alpine Linux base image (minimal footprint ~50MB)
- Multi-stage builds with layer caching
- Docker Compose orchestration with dependency ordering
- Health checks and automatic restart policies

### ⚡ Real-Time Communication
- WebSocket protocol (RFC 6455) compliant
- Bidirectional, low-latency messaging
- Event-driven architecture
- Support for 1000+ concurrent connections

---

## Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Runtime** | Node.js | 18 (Alpine) | JavaScript execution |
| **Web Framework** | Express | 5.x | HTTP API & routing |
| **Real-Time** | ws | 8.x | WebSocket implementation |
| **Message Broker** | Redis | 6.x | Pub/Sub & caching |
| **Database** | PostgreSQL | Latest | Persistent storage |
| **Proxy** | NGINX | Alpine | Load balancing & rate limiting |
| **Orchestration** | Docker Compose | Latest | Multi-container management |
| **Load Testing** | Artillery | Latest | Performance validation |

---

## Quick Start for Developers

### 60-Second Setup

```bash
# 1. Clone repository
git clone https://github.com/hyper-27/node-docker-microservice.git
cd node-docker-microservice

# 2. Start all services
docker-compose up --build

# 3. Access the application
# API: http://localhost
# Logs: docker-compose logs -f chat-app
