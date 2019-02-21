module.exports = (gulp, config, plugins) => {

  gulp.task('minLess', (done) => {
    gulp.src(config.input.lessPath)  // 此处的路径是相对于gulpfile来设置的
    .pipe(plugins.plumber({
      errorHandler: function (error) {
        console.log('less error::');
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(plugins.if(config.env.isDev, plugins.sourcemaps.init()))
    .pipe(plugins.less())
    .pipe(plugins.autoprefixer(config.prefixerOptions))
    // .pipe(plugins.if(config.env.isPro, plugins.csso()))
    .pipe(plugins.csso())
    .pipe(plugins.rename(config.output.minCssName + '.css'))
    .pipe(plugins.if(config.env.isDev, plugins.sourcemaps.write('')))
    .pipe(plugins.size())
    .pipe(gulp.dest(config.output.cssPath))
    .pipe(plugins.if(config.env.isDev, config.server.reload({
      stream: true
    })));

    done();
  });
  
}