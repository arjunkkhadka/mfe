const { merge } = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');

const moduleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin;
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const devConfig = {
  mode: 'development',
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './public/index.html',
    }),
    new moduleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        './MarketingApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
