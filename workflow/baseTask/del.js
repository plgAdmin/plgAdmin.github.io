// del 任务，删除生成的dist目录
const del = require('del');
module.exports = (gulp, config, plugins) => {
  
  gulp.task('del', (done) => {
    // console.log('currentDelTarget::' + config.currentDelTarget);
    // console.log('config.delPath.jsPath::' + [config.delPath[config.currentDelTarget]]);
    
    if(config.env.isDev) {
      return del([config.devDistPath], done);
    }

    if(config.env.isPro) {
      return del([config.distPath], done);
    }
  })
  
}