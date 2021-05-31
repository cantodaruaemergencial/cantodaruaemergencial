/* eslint-disable */
const withPWA = require('next-pwa');

const {
  APP_ID,
  API_KEY,
  PROJECT_ID,
  MEASUREMENT_ID,
  MESSAGING_SENDER_ID,
} = process.env;

module.exports = withPWA({
  // other next config
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    register: true,
  },
  // environment variable
  env: {
    APP_ID,
    API_KEY,
    PROJECT_ID,
    MEASUREMENT_ID,
    MESSAGING_SENDER_ID,
  },
  future: {
    webpack5: true,
  },
});
