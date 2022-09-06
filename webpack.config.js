const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin'),
    exec = require('child_process').exec;
var ip = require('ip');

const webpack = require('webpack');

let config = {
  mode: 'development',

  entry: './js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    alias: {
      NTEngine: path.resolve(__dirname, 'NTEngine')
    },
    extensions: ['*',".webpack.js", ".web.js", ".mjs",'.ts', '.js'],
  },

  module: {
    rules: [
        {
        test: /\.tsx?$/,
        
        include: /node_modules/,
      }
    ]
},

  plugins: [
    new CleanWebpackPlugin(),
    
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),



    new webpack.ProvidePlugin({
      PIXI: 'pixi.js'
    })
  ],

  devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      host: ip.address(),
      port: 8080,
      disableHostCheck: false,
    }
}

module.exports = (env, argv) => {


  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  config.plugins.push(new CopyWebpackPlugin({
      patterns: [
          { from: 'assets/', to: 'assets/'},
          { from: 'js/', to: 'js/'}
      ],
  }),);
  
    config.node = {
        fs: 'empty',
    }

  return config;
};