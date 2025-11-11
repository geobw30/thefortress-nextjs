# Docker Deployment Guide for The Fortress Website

This document provides detailed instructions for deploying The Fortress website using Docker.

## Prerequisites

Before deploying, ensure you have:

1. Docker installed on your system
2. Docker Compose installed (included with Docker Desktop)
3. A MongoDB database (local or remote)
4. A Cloudinary account for image storage

## Quick Start with Docker Compose

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd thefortress
   ```

2. Create a `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your actual configuration values.

3. Build and start the services:
   ```bash
   docker-compose up -d
   ```

4. Access the application at http://localhost:3000

## Environment Configuration

### Required Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://admin:password@mongodb:27017/thefortress?authSource=admin

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Production Environment Variables

For production deployment, update the following variables:

```env
# Use your production MongoDB connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/thefortress

# Update to your production domain
NEXTAUTH_URL=https://yourdomain.com
```

## Docker Compose Configuration

The `docker-compose.yml` file defines two services:

1. **app**: The Next.js application with Tailwind CSS
2. **mongodb**: A MongoDB database instance for development

### Development Configuration

The development configuration includes:

- Volume mapping for hot reloading
- Development environment variables
- Local MongoDB instance

### Production Override

For production deployment, you can use a separate override file `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  app:
    environment:
      - NODE_ENV=production
    volumes: []
    # Remove development-specific settings
```

## Building the Docker Image

To build the Docker image separately:

```bash
docker build -t thefortress-app .
```

## Running the Container

### Development Mode

```bash
docker run -d \
  --name thefortress-dev \
  -p 3000:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  -v /app/.next \
  --env-file .env.local \
  thefortress-app
```

### Production Mode

```bash
docker run -d \
  --name thefortress \
  -p 3000:3000 \
  -e MONGODB_URI=your_production_mongodb_uri \
  -e NEXTAUTH_SECRET=your_production_secret \
  -e NEXTAUTH_URL=https://yourdomain.com \
  -e CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name \
  -e CLOUDINARY_API_KEY=your_cloudinary_api_key \
  -e CLOUDINARY_API_SECRET=your_cloudinary_api_secret \
  thefortress-app
```

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Build Docker image
      run: docker build -t your-dockerhub-username/thefortress-app:${{ github.sha }} .
      
    - name: Login to Docker Hub
      run: docker login -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.DOCKER_PASSWORD }}
      
    - name: Push to Docker Hub
      run: |
        docker push your-dockerhub-username/thefortress-app:${{ github.sha }}
        docker tag your-dockerhub-username/thefortress-app:${{ github.sha }} your-dockerhub-username/thefortress-app:latest
        docker push your-dockerhub-username/thefortress-app:latest
        
    - name: Deploy to production server
      run: |
        ssh ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }} "
          docker pull your-dockerhub-username/thefortress-app:latest &&
          docker stop thefortress || true &&
          docker rm thefortress || true &&
          docker run -d \
            --name thefortress \
            -p 3000:3000 \
            -e MONGODB_URI='${{ secrets.MONGODB_URI }}' \
            -e NEXTAUTH_SECRET='${{ secrets.NEXTAUTH_SECRET }}' \
            -e NEXTAUTH_URL='${{ secrets.NEXTAUTH_URL }}' \
            -e CLOUDINARY_CLOUD_NAME='${{ secrets.CLOUDINARY_CLOUD_NAME }}' \
            -e CLOUDINARY_API_KEY='${{ secrets.CLOUDINARY_API_KEY }}' \
            -e CLOUDINARY_API_SECRET='${{ secrets.CLOUDINARY_API_SECRET }}' \
            your-dockerhub-username/thefortress-app:latest
        "
```

## Monitoring and Maintenance

### View Logs

```bash
docker-compose logs -f app
```

### Update Application

```bash
docker-compose down
docker-compose pull
docker-compose up -d
```

### Backup MongoDB Data

```bash
docker-compose exec mongodb mongodump --out /backup
```

## Troubleshooting

### Common Issues

1. **Tailwind CSS Not Working**
   - Ensure `postcss.config.js` and `tailwind.config.js` are included in the Docker build
   - Verify that devDependencies are installed during the build stage
   - Check that `npm run build` is executed in the Dockerfile

2. **Environment Variables Not Loaded**
   - Verify the `.env.local` file exists and is properly formatted
   - Check that the env_file section in docker-compose.yml is correctly configured

3. **Database Connection Issues**
   - Ensure MongoDB is running and accessible
   - Verify the MONGODB_URI is correct
   - Check network connectivity between containers

### Debugging Steps

1. Check container status:
   ```bash
   docker-compose ps
   ```

2. View application logs:
   ```bash
   docker-compose logs app
   ```

3. Access the container shell:
   ```bash
   docker-compose exec app sh
   ```

4. Check if the application is running:
   ```bash
   docker-compose exec app ps aux
   ```

## Security Considerations

1. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use Docker secrets in production environments
   - Rotate sensitive credentials regularly

2. **Container Security**
   - Run containers as non-root users
   - Keep base images updated
   - Scan images for vulnerabilities

3. **Network Security**
   - Use private networks for internal communication
   - Implement proper firewall rules
   - Secure database connections with TLS

## Performance Optimization

1. **Image Size**
   - Use multi-stage builds to reduce image size
   - Clean npm cache after installations
   - Remove unnecessary files from the final image

2. **Resource Management**
   - Set appropriate memory and CPU limits
   - Use health checks for container monitoring
   - Implement proper logging

3. **Caching**
   - Leverage Docker layer caching
   - Use .dockerignore to exclude unnecessary files
   - Optimize build order for better caching