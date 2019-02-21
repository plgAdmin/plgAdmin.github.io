var exec = require('child_process').exec;
    
exec('du -sh * | grep dist', function (err, stdout, stderr) {
  
  console.log('dist size::' + stdout.split('\t')[0]);
  
});




// console.log('计算输出文件的大小');