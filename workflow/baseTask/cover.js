// 编译dist目录

module.exports = (gulp, config, plugins) => {
  gulp.task('cover', gulp.series(['del', 'less', 'minLess', 'images', 'javascript', 'minJavascript', 'vendors', 'getDistFileSize'], (done) => {
 
    done();
    
  }));

};