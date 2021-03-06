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
    imagesPath: './src/images/**/*'
  },
  baseName: {
    cssName: `prolog.all-${version}`,   // 这样生成的版本号不便于引用
    minCssName: `prolog.min-${version}`,   // 这样生成的版本号不便于引用
    jsName: `prolog.all-${version}`,
    minJsName: `prolog.min-${version}`
  },
  devDistPath: './devDist',   // 开发模式下的输出目录
  devOutput: {
    cssPath: './devDist/css/',
    jsPath: './devDist/js/',
    imagesPath: './devDist/images/'
  },
  distPath: './dist',
  output: {
    cssPath: './dist/css/',
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