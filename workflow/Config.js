const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const isDev = process.env.NODE_ENV === 'development';
const isPro = process.env.NODE_ENV === 'production';

// 所有的路径都是根据Gulpfile的路径来设置的
module.exports = {
  env: {
    isDev,
    isPro
  },
  watchPath: {
    lessPath: './src/styles/**/*.less',
    jsPath: './src/javascripts/*.js',
    imagesPath: './src/images/'
  },
  input: {
    lessPath: './src/styles/plgui.less',
    jsPath: './src/javascripts/*.js',
    imagesPath: './src/images/**/*'
  },
  distPath: './dist',
  output: {
    cssName: 'plg',
    cssPath: './dist/css/',
    jsName: 'plg',
    jsPath: './dist/js/',
    imagesPath: './dist/images/'
  },
  prefixerOptions: {
    browsers: ['last 10 versions']
  },
  server: {
    browserSync,
    reload,
    port: 3300,
    browser: 'chrome',
  }
}