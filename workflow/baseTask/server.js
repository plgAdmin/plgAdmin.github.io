// 做浏览器的启服务使用


module.exports = (gulp, config, plugins) =>{

  // 静态服务器
  gulp.task('server', function (done) {

    config.server.browserSync.init({
      startPath: './examples/cardList.html',
      port: config.server.port,
      // timestamps: true,   // 给文件添加文件指纹
      open: false,
      browser: config.server.browser,
      server: {
        baseDir: './'
      }
    });

    done();
  });
}