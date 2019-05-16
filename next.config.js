require('dotenv').config()
const withCSS = require('@zeit/next-css')

module.exports = {
  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    return config;
  },
};

module.exports = withCSS();