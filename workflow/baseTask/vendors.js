// copy vendors第三方的文件
module.exports = (gulp, config, plugins) =>{

  // 静态服务器
  gulp.task('vendors', (done) => {    
    gulp.src('./vendors/**')
    .pipe(plugins.plumber({
      errorHandler: function (error) {
        console.log('vendors error::');
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(gulp.dest('./dist/vendors/'))

    done();
  });
}