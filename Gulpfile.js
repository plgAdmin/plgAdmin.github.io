const fs = require('fs');
const gulp = require('gulp');

const plugins = require('gulp-load-plugins')();
const config = require('./workflow/Config');

//  此处可以使用node同步加载，做到自动require
require('./workflow/baseTask/del')(gulp, config, plugins);
require('./workflow/baseTask/images')(gulp, config, plugins);
require('./workflow/baseTask/less')(gulp, config, plugins);
require('./workflow/baseTask/watch')(gulp, config, plugins);
require('./workflow/baseTask/javascript')(gulp, config, plugins);
require('./workflow/baseTask/getDistFileSize')(gulp, config, plugins);
require('./workflow/baseTask/cover')(gulp, config, plugins);
require('./workflow/baseTask/server')(gulp, config, plugins);

gulp.task('default', gulp.series(['del', 'watch', 'less', 'images', 'javascript', 'getDistFileSize', 'server'], (done) => {
  
  console.log('开始执行开发者模式');
  done();

}));

gulp.task('build', gulp.series(['del', 'less', 'images', 'javascript'], (done) => {

  done();
  
}));


