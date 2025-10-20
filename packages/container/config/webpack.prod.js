const { merge } = require('webpack-merge');

const moduleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin;
const common = require('./webpack.common.js');
const packageJson = require('../package.json');
const domain = process.env.PRODUCTION_DOMAIN;
const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new moduleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketingApp@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(common, prodConfig);
