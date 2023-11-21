const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html', // Specify your HTML template file
        filename: 'index.html', // Output HTML file name
      }),
      new WebpackPwaManifest({
        name: 'Your PWA Name',
        short_name: 'PWA Short Name',
        description: 'Your PWA Description',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '/',
        icons: [
          {
            src: path.resolve('src/assets/icon.png'), // Path to your PWA icon
            sizes: [96, 128, 192, 256, 384, 512] // Icon sizes
          }
        ]
      }),
      new InjectManifest({
        swSrc: './src/service-worker.js', // Path to your service worker file
        swDest: 'service-worker.js' // Output service worker file name
      })
    ],
    module: {
      rules: [
        // Add CSS loaders and babel configuration here as needed
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
  };
};
