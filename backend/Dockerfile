# Use the official Node.js runtime as the base image
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm i


# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build


# ---------- Stage 2: Production ----------
FROM node:18-alpine AS production

# Set the working directory inside the container
WORKDIR /app

# Create user
RUN addgroup -g 1001 nodejs \
    && adduser -S appuser -u 1001 -G nodejs

# Copy only production dependencies
COPY package*.json ./
# Copy build files from the build stage
COPY --from=build /app/dist ./dist

# Install only production dependencies
RUN npm install --only=production && npm cache clean --force


# Setting ownership of the application directory
# RUN chown -R appuser:nodejs /app

# Switch to non-root user
USER appuser

# Set environment to production
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Start the application
CMD ["node", "dist/server.js"]