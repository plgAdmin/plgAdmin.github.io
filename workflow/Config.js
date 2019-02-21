const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const moment = require('moment')
const isDev = process.env.NODE_ENV === 'development';
const isPro = process.env.NODE_ENV === 'production';
// const timesrting = moment().format('YYYY-MM-DD HH:mm:ss').toString().replace(/-|\s|:/g, '')
const {version} = require('./getVersion');

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
    lessPath: './src/styles/plg.less',
    jsPathArr: ['./src/javascripts/core.js', './src/javascripts/PlgDialog.js', './src/javascripts/PlgGrid.js','./src/javascripts/*.js'],
    // jsPath: './src/javascripts/*.js',
    // jsCore: './src/javascripts/core.js',
    imagesPath: './src/images/**/*'
  },
  distPath: './dist',
  output: {
    // cssName: `prolog.all.${timesrting}`,   // 这样生成的版本号不便于引用
    cssName: `prolog.all-${version}`,   // 这样生成的版本号不便于引用
    // minCssName: `prolog.min.${timesrting}`,   // 这样生成的版本号不便于引用
    minCssName: `prolog.min-${version}`,   // 这样生成的版本号不便于引用
    // minCssName: `prolog.min`,   // 这样生成的版本号不便于引用
    cssPath: './dist/css/',
    // jsName: `prolog.all.${timesrting}`,
    jsName: `prolog.all-${version}`,
    // minJsName: `prolog.min.${timesrting}`,
    minJsName: `prolog.min-${version}`,
    // minJsName: `plg.min`,
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