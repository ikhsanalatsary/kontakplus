// Karma configuration
// Generated on Mon Sep 26 2016 07:48:02 GMT+0700 (WIB)

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      './client/app.js',
      './client/js/services.spec.js',
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // add webpack as preprocessor
      './client/*.js': ['webpack', 'sourcemap'],
      './client/js/*.js': ['webpack', 'sourcemap'],
      './client/*spec.js': ['webpack', 'sourcemap'],
      './client/js/*spec.js': ['webpack', 'sourcemap'],
    },

    // webpack module
    webpack: {
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel', query: { compact: false } },
          { test: /\.css$/, loader: "style-loader!css-loader" },
          { test: /\.json$/, loader: "json-loader" },
          { test: /\.png$/, loader: "url-loader?limit=100000" },
          { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, loader: 'file' },
          { test: /\.html$/, loader: 'raw' },
        ],
      },
      watch: true,
    },

    // webpackServer: {
    //   noInfo: true
    // },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only',
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    /** possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN
     || config.LOG_INFO || config.LOG_DEBUG **/
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
