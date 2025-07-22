# Use the official Node.js runtime as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
# RUN npm ci --only=production
RUN npm i

# Install TypeScript globally for building
RUN npm install -g typescript

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# *** Node image specific optimizations/settings ***
# Create a non-root user for security
RUN groupadd -g 1001 nodejs
RUN useradd -m -u 1001 -g nodejs karan
# Change ownership of the app directory to the nodejs user
RUN chown -R karan:nodejs /app
USER karan

# Expose the port the app runs on
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Start the application
CMD ["npm", "start"]