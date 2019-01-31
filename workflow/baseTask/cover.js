// 编译dist目录

module.exports = (gulp, config, plugins) => {
  gulp.task('cover', gulp.series(['del', 'less', 'images', 'javascript', 'getDistFileSize'], (done) => {
 
    done();
    
  }));

};