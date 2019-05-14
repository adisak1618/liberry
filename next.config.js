const withCSS = require('@zeit/next-css')
require('dotenv').config();

module.exports = {
  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    return config;
  },
};

module.exports = withCSS()