const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const moduleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin;
const packageJson = require('../package.json');
const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
  },
  plugins: [
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

module.exports = merge(common, prodConfig);
