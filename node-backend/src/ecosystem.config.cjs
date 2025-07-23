module.exports = {
  apps: [{
    name: "karan",
    script: "./dist/server.js",
    instances: 2,
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: "200M"
  }]
};