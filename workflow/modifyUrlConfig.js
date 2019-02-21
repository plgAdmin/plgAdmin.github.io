// 要修改的文件的url地址
const path = require('path');

const demo = path.resolve(process.cwd(), './demo/');
const demoexamples = path.resolve(process.cwd(), './demo/examples/');
const demotest = path.resolve(process.cwd(), './dist/demo/');
const examples = path.resolve(process.cwd(), './dist/demo/examples/');


module.exports = {
  demoDirs: [demo, demoexamples],
  targetDirs: [demotest, examples]
}