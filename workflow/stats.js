// 修改demo中examples中的url的引用，主要是因为开发模式和生产模式的不同
const fs = require('fs');
// 修改dist/dmeo中的prolog的css/js文件的引用路径文件中的版本号
const path = require('path');
// const targetAddr = path.resolve(process.cwd(), './demotest/');
// const targetDirs = [path.resolve(process.cwd(), './demotest/'), path.resolve(process.cwd(), './demotest/examples')];
const { targetDirs } = require('./modifyUrlConfig');

// 查找到文件的地址并修改
function updataPath (filePath = null) {
  if(!filePath) {
    throw '当前文件不存在';
  }

  const currentFileDir = path.dirname(filePath);

  let targetStr = /\.\.\/\.\.\/dist\//g;
  let replaceStr = '../'.repeat( targetDirs.indexOf(currentFileDir) + 1);

  let fileContent = fs.readFileSync(filePath, "utf-8");

  fileContent = fileContent.replace(targetStr, replaceStr);

  fs.writeFile(filePath, fileContent, (err) => {
    if(err) throw err;
    console.log('文件写入成功!!!');
  })
}

function getFilePath(targetAddress = null){
  if(!targetAddress){
    throw '当前的目录不存在';
  }

  fs.readdir(targetAddress, function(err, files){
    if (err)  throw err;
    
    files.forEach(function (file, index) {
      let currentAddress = targetAddress + '/' + file;
      fs.stat(currentAddress, function (err, stats) {
        if (err) throw err;
  
        if (stats.isFile()) {
          
          if(file.includes('.html')){
            // console.log('currentAddress::' + currentAddress);

            updataPath(currentAddress);
          }
  
          // console.log('-------file file-------');
  
        } else if (stats.isDirectory ()) {
          
          // getFilePath(currentAddress);
        }
        
      });
  
    });
  })

}


targetDirs.forEach((val) => {
  getFilePath(val);   // 启动，输入一个
})









