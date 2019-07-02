'use strict';

const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const str = JSON.stringify;
const env = process.env;

module.exports = {
  target: 'web',
  entry: {
    'vcoin': './lib/vcoin-browser',
    'vcoin-worker': './lib/workers/worker'
  },
  output: {
    path: path.join(__dirname, 'browser'),
    filename: '[name].js'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['-browser.js', '.js', '.json']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VCOIN_NETWORK':
        str(env.VCOIN_NETWORK || 'main'),
      'process.env.VCOIN_WORKER_FILE':
        str(env.VCOIN_WORKER_FILE || '/vcoin-worker.js')
    }),
    new UglifyJsPlugin({
      uglifyOptions:{
        compress: {
          warnings: true
        }
      }
    })
  ]
};
