var exec = require('child_process').exec;

module.exports = (gulp, config, plugins) => {
  gulp.task('getDistFileSize', (done) => {
    
    exec('du -sh * | grep dist', function (err, stdout, stderr) {
      
      console.log('dist size::' + stdout.split('\t')[0]);
      
    });
    
    done();
  })

}