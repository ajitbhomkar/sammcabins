module.exports = {
  apps: [
    {
      name: 'sammcabins',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 1, // Changed from 'max' to 1 to reduce CPU usage
      exec_mode: 'fork', // Changed from 'cluster' to 'fork' for lower overhead
      autorestart: true,
      watch: false,
      max_memory_restart: '400M', // Reduced from 1G to 400M
      node_args: '--max-old-space-size=400', // Limit Node.js memory
      min_uptime: '10s',
      max_restarts: 10,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
