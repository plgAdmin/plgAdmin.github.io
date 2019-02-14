'use strict';

const testFolder = './src/javascripts/';
const config = './workflow/Config';
const fs = require('fs');

// console.log('config');
// console.log(config);
// console.log('config');

module.exports = {
  mode: 'development',
  // entry: ['./js/main.js', './js/foo.js'],  // 此处是当前目录下的文件
  entry: (function(){
    
    fs.readdir(testFolder, (err, files) => {
      let fileArr = [];
      files.forEach(file => {

        console.log('testFolder + file');
        console.log(testFolder + file);
        console.log('testFolder + file');

        fileArr.push(testFolder + file);
      });
      console.log('fileArrfileArr');
      console.log(fileArr);
      console.log('fileArrfileArr');

      return fileArr;
      
    })

    // return fileArr;
    // return ['./js/main.js', './js/foo.js'];

  }()),  // 此处是当前目录下的文件
  output: {
    // path: __dirname + "/build",
    filename: "plg.js"
  }
};