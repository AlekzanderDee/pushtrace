/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

// PostCSS plugins
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

const autoprefixer = require('autoprefixer')


module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output), // Merge with env dependent settings
  module: {
    loaders: [{
      test: /\.(js|jsx)$/, // Transform all .js files required somewhere with Babel
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: options.babelQuery,
    }, {
      // Do not transform vendor's CSS with CSS-modules
      // The point is that they remain in global scope.
      // Since we require these CSS files in our JS or CSS files,
      // they will be a part of our compilation either way.
      // So, no need for ExtractTextPlugin here.
      test: /\.css$/,
      include: /node_modules/,
      loaders: ['style-loader', 'css-loader'],
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
    }, {
      test: /\.(jpg|png|gif)$/,
      loaders: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          query: {
            progressive: true,
            optimizationLevel: 7,
            interlaced: false,
            pngquant: {
              quality: '65-90',
              speed: 4,
            },
          },
        },
      ],
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(mp4|webm)$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
      },
    },
      {
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader', 'sass-loader'],
    }
    ],
  },
  plugins: options.plugins.concat([
    new webpack.ContextReplacementPlugin(/^\.\/locale$/, context => {
      if (!/\/moment\//.test(context.context)) { return }
      // context needs to be modified in place
      Object.assign(context, {
        // include only CJK
        regExp: /^\.\/(ja|ko|zh)/,
        // point to the locale data folder relative to moment's src/lib/locale
        request: '../../locale'
      })
    }),
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [
          autoprefixer({browsers: ['last 3 versions', 'IE > 8'],}),
          postcssFocus(), // Add a :focus to every :hover
          postcssReporter({ // Posts messages from plugins to the terminal
            clearMessages: true,
          })
        ]
      }
    })

  ]),
  resolve: {
    modules: ['app', 'node_modules'],
    alias: { moment: 'moment/moment.js' },
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});
