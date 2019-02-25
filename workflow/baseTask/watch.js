// 监控js的文件指纹，为后续的js编译作为触发事件源
// watch进行颗粒化的分解，主要是针对某一类的文件做处理
const del = require('del');
module.exports = (gulp, config, plugins) => {
  gulp.task('watch', (done) => {

    // 监听less文件的目录
    gulp.watch([config.watchPath.lessPath], gulp.series(['delCss', 'less', 'minLess'],(cb) => {
     cb(); 
    }));

    // 监听js文件的目录
    gulp.watch([config.watchPath.jsPath], gulp.series(['delJs', 'javascript', 'minJavascript'],(cb) => {
      cb(); 
     }));

    // 监听images文件的目录
    gulp.watch([config.watchPath.imagesPath], gulp.series(['delImages', 'images'],(cb) => {
      cb(); 
     }));
    

    done();
    
  });
}