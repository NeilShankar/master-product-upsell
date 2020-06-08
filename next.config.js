require("dotenv").config();
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const webpack = require('webpack');

const apiKey =  JSON.stringify(process.env.SHOPIFY_API_KEY);
const HostUrl = JSON.stringify(process.env.HOST)

module.exports = withCSS(withSass({ 
  webpack: (config) => {
    const env = { API_KEY: apiKey, 'process.env.HOST': HostUrl, 'process.env.REACT_APP_HOST': HostUrl};
    config.plugins.push(new webpack.DefinePlugin(env));

    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
          loader: 'url-loader',
          options: {
              limit: 100000
          }
      }
    });

    return config;
  },
}));
