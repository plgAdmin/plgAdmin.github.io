// 用来编译当前用户写的js文件，例如ES6编译成为ES5
const webpackConfig = require('../../webpack.config');

module.exports = (gulp, config, plugins, reload) => {
  gulp.task('javascript', (done) =>{

    gulp.src([config.input.jsPath])
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
      .pipe(plugins.if(config.env.isPro, plugins.uglify({
        compress: {
          warnings: false,
          drop_console: true,
          drop_debugger: true
        }
      })))
      // .pipe(plugins.concat(config.output.jsName + '.js'))
      .pipe(plugins.webpack(webpackConfig))
      .pipe(plugins.if(config.env.isDev, plugins.sourcemaps.write()))
      .pipe(plugins.size())
      .pipe(gulp.dest(config.output.jsPath))
      .pipe(plugins.if(config.env.isDev, config.server.reload({
        stream: true
      })));

      done();
  
    
  });
}