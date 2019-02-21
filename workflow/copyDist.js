const fs = require('fs');

var child_process = require('child_process');

function copyDir(src, dist) {
  let res = child_process.spawnSync('cp', ['-r', src, dist]);	
  if(res && res.error){
    console.log('生成线上demo失败');
  } else {
    console.log('生成线上demo成功');
  }
}

copyDir('./dist/', './updatedemo/');