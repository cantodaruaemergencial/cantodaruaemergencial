/* eslint-disable */
const withPWA = require('next-pwa');

const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = '';
let basePath = '/';

if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');

  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

const {
  APP_ID,
  API_KEY,
  PROJECT_ID,
  MEASUREMENT_ID,
  MESSAGING_SENDER_ID,
} = process.env;

module.exports = withPWA({
  assetPrefix,
  basePath,
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
});
