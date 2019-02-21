// 监控js的文件指纹，为后续的js编译作为触发事件源

module.exports = (gulp, config, plugins) => {
  gulp.task('watch', (done) => {

    gulp.watch([config.watchPath.lessPath, config.watchPath.imagesPath, config.watchPath.jsPath], gulp.series(['cover'], function(callback){

      callback();

    }));

    done();
    
  });
}