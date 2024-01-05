"use strict"
/**
 * # Start all applications
 * pm2 start ecosystem.config.js --env { local | developer | production }
 *
 * # Stop all
 * pm2 stop ecosystem.config.js
 *
 * # Restart all
 * pm2 restart ecosystem.config.js
 *
 * # Reload all
 * pm2 reload ecosystem.config.js
 *
 * # Delete all
 * pm2 delete ecosystem.config.js
 */
module.exports = {
  apps: [
    {
      name: "dev-navigation-user-front",
      script: "npm run start",
      watch: true,
      env_local: {
        NODE_ENV: "local",
      },
      env_developer: {
        NODE_ENV: "developer",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
}
