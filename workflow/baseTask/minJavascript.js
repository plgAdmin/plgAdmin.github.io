// 生成压缩的min.js文件
// 用来编译当前用户写的js文件，例如ES6编译成为ES5
module.exports = (gulp, config, plugins, reload) => {
  gulp.task('minJavascript', (done) =>{

    gulp.src(config.input.jsPathArr)
      .pipe(plugins.plumber({
        errorHandler: function (error) {
          console.log('javascript error::');
          console.log(error);
          console.log(error.message);
          this.emit('end');
        }
      }))
      .pipe(plugins.if(config.env.isDev, plugins.sourcemaps.init()))
      .pipe(plugins.babel({
        presets: ['@babel/env']
      }))
      // .pipe(plugins.if(config.env.isPro, plugins.uglify({
      //   compress: {
      //     warnings: false,
      //     drop_console: true,
      //     drop_debugger: true
      //   }
      // })))
      .pipe(plugins.uglify({
        compress: {
          warnings: false,
          drop_console: true,
          drop_debugger: true
        }
      }))
      .pipe(plugins.concat(config.baseName.minJsName + '.js'))
      .pipe(plugins.if(config.env.isDev, plugins.sourcemaps.write()))
      .pipe(plugins.size())
      // .pipe(gulp.dest(config.output.jsPath))
      .pipe(plugins.if(config.env.isDev, gulp.dest(config.devOutput.jsPath)))
      .pipe(plugins.if(config.env.isPro, gulp.dest(config.output.jsPath)))
      .pipe(plugins.if(config.env.isDev, config.server.reload({
        stream: true
      })));

      done();
  
    
  });
}