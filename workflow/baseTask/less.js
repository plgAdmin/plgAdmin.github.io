module.exports = (gulp, config, plugins) => {

  gulp.task('less', (done) => {
    console.log('config.env.isDev::' + config.env.isDev);
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
    // .pipe(plugins.modifyCssUrls({
    //   modify: function(url, filePath) {

    //     // url = url.replace('../../assets/', '../assets/');
    //     url = url.replace(/.+assets/g, '../images');
    //     return url;
    //   }
    // }))
    .pipe(plugins.autoprefixer(config.prefixerOptions))
    .pipe(plugins.if(config.env.isPro, plugins.csso()))
    .pipe(plugins.if(config.env.isDev, plugins.sourcemaps.write('')))
    .pipe(plugins.rename({
      basename: config.output.cssName,
      extname: ".css"
    }))
    .pipe(plugins.size())

    .pipe(gulp.dest(config.output.cssPath))
    .pipe(plugins.if(config.env.isDev, config.server.reload({
      stream: true
    })));

    done();
  });
  
}