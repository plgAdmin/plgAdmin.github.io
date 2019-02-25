const fs = require('fs');
const gulp = require('gulp');

const plugins = require('gulp-load-plugins')();
const config = require('./workflow/Config');

//  此处可以使用node同步加载，做到自动require
require('./workflow/baseTask/del')(gulp, config, plugins);
require('./workflow/baseTask/delCss')(gulp, config, plugins);
require('./workflow/baseTask/delJs')(gulp, config, plugins);
require('./workflow/baseTask/delImages')(gulp, config, plugins);
require('./workflow/baseTask/images')(gulp, config, plugins);
require('./workflow/baseTask/less')(gulp, config, plugins);
require('./workflow/baseTask/minLess')(gulp, config, plugins);
require('./workflow/baseTask/watch')(gulp, config, plugins);
require('./workflow/baseTask/javascript')(gulp, config, plugins);
require('./workflow/baseTask/minJavascript')(gulp, config, plugins);
require('./workflow/baseTask/demo')(gulp, config, plugins);
require('./workflow/baseTask/vendors')(gulp, config, plugins);
require('./workflow/baseTask/getDistFileSize')(gulp, config, plugins);
require('./workflow/baseTask/cover')(gulp, config, plugins);
require('./workflow/baseTask/server')(gulp, config, plugins);

/**
 * 开发模式
 * 1. 需要输出的文件要求有min，和normal版本
 * 2. 针对文件的监听，只监听一类文件，并且变动也只是变动一类文件，如css文件，只删除或者新增css目录，不做其他变动
 */
gulp.task('default', gulp.series(['del', 'watch', 'less', 'minLess', 'images', 'javascript', 'minJavascript', 'getDistFileSize', 'server'], (done) => {

  done();

}));

// 生产模式
gulp.task('build', gulp.series(['del', 'less', 'minLess', 'images', 'javascript', 'minJavascript', 'demo', 'vendors'], (done) => {

  done();
  
}));

// 更新用户线上的github上的demo
gulp.task('updatedemo', (done) => {
  console.log('updatedemo');
  
  done();
  
});
