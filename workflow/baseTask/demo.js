// copy demo第三方的文件
module.exports = (gulp, config, plugins) =>{

  // 静态服务器
  gulp.task('demo', (done) => {
    
    gulp.src('./demo/**')
    .pipe(plugins.plumber({
      errorHandler: function (error) {
        console.log('demo error::');
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(gulp.dest('./dist/demo/'))
    done();
  });
}