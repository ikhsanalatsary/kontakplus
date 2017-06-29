'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const packageJson = require('./package.json')

const PUBLIC_PATH = '/';  // webpack needs the trailing slash for output.publicPath

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === 'test:client';
const isProd = ENV === 'build';

module.exports = (function makeWebpackConfig() {
	let config = {};

	/**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
	config.entry = isTest ? {} : { app: './client/app.js' };

	/**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
	config.output = isTest ? {} : {
		path: isProd ? __dirname + '/dist/client' : './client',
		publicPath: isProd ? '/' : '',
		filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
		chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js',
	};
	/**
	 * Devtool
	 * Reference: http://webpack.github.io/docs/configuration.html#devtool
	 * Type of sourcemap to use per build type
	 */
	if (isTest) {
		config.devtool = 'inline-source-map';
	} else if (isProd) {
		config.devtool = 'source-map';
	} else {
		config.devtool = 'eval-source-map';
	}

	config.module = {
		loaders: [
			{ test: /\.js$/, loader: 'babel', query: { compact: false } },
			{ test: /\.json$/, loader: "json-loader" },
			{ test: /\.css$/, loader: "style-loader!css-loader" },
			{ test: /\.png$/, loader: "url-loader?limit=100000" },
			{ test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, loader: 'file' },
			{ test: /\.html$/, loader: 'raw' },
		],
	};

	config.plugins = [];

	// Skip rendering index.html in test mode
	if (!isTest) {
		// Reference: https://github.com/ampedandwired/html-webpack-plugin
		// Render index.html
		config.plugins.push(
			// new HtmlWebpackPlugin({
			// 	template: './client/index.html',
			// 	inject: 'body',
			// }),

			// Reference: https://github.com/webpack/extract-text-webpack-plugin
			// Extract css files
			// Disabled when in test mode or not in build mode
			new ExtractTextPlugin('[name].[hash].css', { disable: !isProd })
		);
	}

	// Add build specific plugins
  if (isProd) {
		config.plugins.push(

			// Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
			// Only emit files when there are no errors
			new webpack.NoErrorsPlugin(),

			// Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
			// Dedupe modules in the output
			new webpack.optimize.DedupePlugin(),

			// Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
			// Minify all javascript, switch loaders to minimizing mode
			new webpack.optimize.UglifyJsPlugin(),

			// Copy assets from the public folder
			// Reference: https://github.com/kevlened/copy-webpack-plugin
			new CopyWebpackPlugin([
				{ from: __dirname + '/client', },
			]),

			// Generate Sw precache-sw
			new SWPrecacheWebpackPlugin(
      {
        cacheId: 'packageJson.name',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'precache-sw.js',
        minify: true,
        navigateFallback: PUBLIC_PATH,
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      }
    )
    );
  }

	if (isTest) config.watch = true;

	return config;
})();
