# Real-Time Messaging API

A high-performance, containerized microservices backend for real-time WebSocket messaging. Built with Node.js, Redis, PostgreSQL, NGINX, and Docker.

## Overview

This project demonstrates a production-grade distributed messaging system with horizontal scalability, DDoS mitigation, and cross-instance message routing. The architecture supports 150+ WebSocket messages per second and 5,000+ concurrent database insertions under constrained hardware limits.

## Architecture

### Core Components

- **Node.js Server** - Express-based REST API with WebSocket support (ws library)
- **NGINX** - Reverse proxy with IP-based rate limiting and load balancing
- **PostgreSQL** - Persistent message storage and application state
- **Redis** - Pub/Sub for low-latency cross-instance message routing
- **Docker Compose** - Orchestration of 3 scaled Node.js replicas + supporting services

### Scalability Features

- **Horizontal Scaling**: 3 Node.js instances behind NGINX load balancer
- **Message Routing**: Redis Pub/Sub enables real-time message delivery across all instances
- **State Persistence**: PostgreSQL stores messages for historical retrieval
- **Rate Limiting**: NGINX enforces 10 req/s per IP with 20-request burst capacity
- **Connection Upgrade**: Full WebSocket protocol support via proxy headers

## Project Structure
