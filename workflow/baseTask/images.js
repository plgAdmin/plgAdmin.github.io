// 将图片文件复制，重新在【dist/image/插件名称/】下
module.exports = (gulp, config, plugins) => {

  gulp.task('images', (done) => {
    
    console.log('执行图片的转移功能');

    gulp.src(config.input.imagesPath)  // 此处的路径是相对于gulpfile来设置的
      .pipe(plugins.plumber({
        errorHandler: function (error) {
          console.log('less error::');
          console.log(error.message);
          this.emit('end');
        }
      }))
      .pipe(plugins.size()) // 最终的需求，此处可以优化
      .pipe(gulp.dest(config.output.imagesPath))
      .pipe(plugins.if(config.env.isDev, config.server.reload({
        stream: true
      })));

    done();
  });
  
}