// 修改demo文件中的版本号
const {version} = require('./getVersion');

// 修改demo中examples中的url的引用，主要是因为开发模式和生产模式的不同
const fs = require('fs');
const path = require('path');
// const targetAddr = path.resolve(process.cwd(), './demotest/');
// const targetDirs = [path.resolve(process.cwd(), './demotest/'), path.resolve(process.cwd(), './demotest/examples')];
const { demoDirs } = require('./modifyUrlConfig');

// 查找到文件的地址并修改
function updataPath(filePath = null){
  if(!filePath) {
    throw '当前文件不存在';
  }

  const currentFileDir = path.dirname(filePath);

  const REPLACE = {
    ['prolog.all-' + version + '.js']: /prolog\.all-.*?(\.js)/g,
    ['prolog.all-' + version + '.css']: /prolog\.all-.*?(\.css)/g,
    ['prolog.min-' + version + '.js']: /prolog\.min-.*?(\.js)/g,
    ['prolog.min-' + version + '.css']: /prolog\.min-.*?(\.css)/g,
  }

  let fileContent = fs.readFileSync(filePath, "utf-8");
  for(key in REPLACE){
    fileContent = fileContent.replace(REPLACE[key], key);
  }

  fs.writeFile(filePath, fileContent, (err) => {
    if(err) throw err;
  })


}

function getFilePath(targetAddress = null){
  if(!targetAddress){
    throw '当前的目录不存在';
  }

  fs.readdir(targetAddress, function(err, files){
    if (err)  throw err;
    
    files.forEach(function (file) {
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


demoDirs.forEach((val) => {
  getFilePath(val);   // 启动，输入一个
})