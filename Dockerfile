# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies including dev dependencies needed for build
RUN npm ci

# Copy source code
COPY . .

# Build the Next.js application
# This will process Tailwind CSS through PostCSS
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Install only production dependencies
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built application and public assets
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Change to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Environment variables
ENV NODE_ENV=production
# MongoDB connection string
ENV MONGODB_URI=mongodb+srv://geobw30:3n73ri2e-@cluster-fortress.vs02q6u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-fortress
# NextAuth.js secret
ENV NEXTAUTH_SECRET=my-next-auth-secret
# Cloudinary configuration
ENV CLOUDINARY_CLOUD_NAME=dgu88jb8u
ENV CLOUDINARY_API_KEY=243182339171463
ENV CLOUDINARY_API_SECRET=ceVGeEsbBTRky3k3nJoLF6esFjM

# Start the Next.js application
CMD ["npm", "start"]