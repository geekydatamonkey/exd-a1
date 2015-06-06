module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha','chai'],
    files: [
      'app/scripts/**/*.js',
      '.tmp/scripts/**/*.js',
      'test/spec/**/*.js'
    ],
    reporters: ['mocha']
  });
}