/**
 * @type {import('next').NextConfig}
 */
/* eslint-disable */
const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  register: true,
});

const isProd = process.env.NODE_ENV === 'production';

const isGithubActions = process.env.GITHUB_ACTIONS || false;

let basePath = '';

if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');

  basePath = `/${repo}`;
}

const { APP_ID, API_KEY, PROJECT_ID, MEASUREMENT_ID, MESSAGING_SENDER_ID } =
  process.env;

module.exports = withPWA({
  assetPrefix: isProd ? 'https://cantodaruaemergencial.imgix.net/' : undefined,
  basePath,
  images: {
    loader: 'imgix',
    path: 'https://cantodaruaemergencial.imgix.net/',
  },
  // other next config
  // environment variable
  env: {
    APP_ID,
    API_KEY,
    PROJECT_ID,
    MEASUREMENT_ID,
    MESSAGING_SENDER_ID,
  },
});
