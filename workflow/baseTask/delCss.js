// del 任务，删除生成的dist目录
const del = require('del');
module.exports = (gulp, config, plugins) => {
  
  gulp.task('delCss', (done) => {
    // console.log('currentDelTarget::' + config.currentDelTarget);
    // console.log('config.delPath.jsPath::' + [config.delPath[config.currentDelTarget]]);
    return del([config.devOutput.cssPath], done);
    
  })
  
}