module.exports = {
  apps: [
    {
      name: process.env.NODE_ENV === "PRODUCTION" ? "karan" : "karan-dev",
      script: process.env.NODE_ENV === "PRODUCTION" ? "./dist/server.js" : "src/server.ts",
      interpreter: process.env.NODE_ENV === "PRODUCTION" ? "node" : "ts-node",
      instances: 1,
      autorestart: true,
      watch: process.env.NODE_ENV !== "PRODUCTION", // Watch files only in dev
      max_memory_restart: "200M",
      env: {
        NODE_ENV: "development",
        PORT: 3000
      },
      env_production: {
        NODE_ENV: "PRODUCTION",
        PORT: 5000
      }
    }
  ]
};
