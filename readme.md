# CloudDrop Deployment Guide

This document provides a complete step-by-step guide for setting up, troubleshooting, and deploying the CloudDrop application successfully on AWS using:

- Frontend (React/Vite)
- Backend (Node.js + Express)
- PostgreSQL (AWS RDS)
- AWS S3
- Docker & Docker Compose
- Nginx
- GitHub Actions CI/CD
- EC2 Ubuntu Server

---

# Project Architecture

CloudDrop consists of:
- Frontend Container
- Backend Container
- Nginx Reverse Proxy
- AWS RDS PostgreSQL Database
- AWS S3 File Storage

---

# Prerequisites
Before deployment, ensure you have:

## AWS Services
- AWS EC2 Instance
- AWS RDS PostgreSQL Instance
- AWS S3 Bucket
- IAM User with S3 permissions

## Installed Locally
- Git
- Docker
- Docker Compose
- Node.js
- VS Code

---

# Step 1 — Launch EC2 Instance
Create an Ubuntu EC2 instance.

Recommended:
- Ubuntu 22.04
- t2.micro or higher

## Security Group Ports
Allow the following inbound ports:

| Port | Purpose |
|------|----------|
| 22 | SSH |
| 80 | HTTP |
| 443 | HTTPS |
| 5000 | Backend (optional) |

---

# Step 2 — SSH Into EC2
Use the EC2 Public IP Address.

Example:
```bash
ssh -i your-key.pem ubuntu@YOUR_PUBLIC_IP

# NOTE:
The EC2 Public IP is the server IP used for SSH.


# Step 3 — Install Docker & Docker Compose 
# Update Server on bash
sudo apt update && sudo apt upgrade -y


# Install Docker on bash 
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add User To Docker Group
sudo usermod -aG docker ubuntu

# Logout and SSH back in.

# Verify docker
docker --version


# Step 4 — Clone Repository on bash
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER


# Step 5 — Create Environment Variables
Create .env inside backend folder.

# example
PORT=5000

DB_HOST=cloud-drop-db.cta0iyuumtq3.eu-west-2.rds.amazonaws.com
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=YOUR_DB_PASSWORD

AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
AWS_REGION=eu-west-2
AWS_BUCKET_NAME=cloud-drop-storage

# IMPORTANT:
Use the actual RDS endpoint.
Use the correct database name.
Use the correct AWS region.

# Step 6 — AWS RDS PostgreSQL Setup
Create RDS PostgreSQL Database

# Recommended:
PostgreSQL
Public access: YES (for testing)
Security group must allow EC2 access

# Step 7 — AWS S3 Bucket Setup
Create an S3 bucket.

# example 
cloud-drop-storage

# Step 8 — Docker Setup
# Build Containers on bash
docker compose build

# Start Containers on bash
docker compose up -d

# Check Running Containers
docker ps

# Expected 
clouddrop_backend
clouddrop_frontend
clouddrop_nginx

# Step 9 — Check Backend Logs on bash
# View Logs
docker logs clouddrop_backend

# Successful output: 
Server running on port 5000

# Step 10 — Nginx Setup

# Example nginx.conf

# Step 11 — GitHub Actions CI/CD
Create Workflow

#.github/workflows/deploy.yml

# Step 12 — GitHub Secrets

# Add these in GitHub Repository Secrets:
| Secret       | Description     |
| ------------ | --------------- |
| EC2_HOST     | EC2 Public IP   |
| EC2_SSH_KEY  | Private SSH Key |
| EC2_USERNAME | ubuntu          |


# Step 16 — Common Debugging Commands
# Check Containers
docker ps

# Check Logs
docker logs clouddrop_backend

# Restart Containers
docker compose restart

# Stop Containers
docker compose down

# Rebuild Containers
docker compose up --build -d




