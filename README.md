https://plgadmin.github.io/
### gulp的结构化学习
1. 主要适用于PlgUI项目的打包，做一个demo

### demo
[demo地址](./dist/demo/index.html)

### Usaged
- gulp4.x
-  分为开始模式和build模式，主要是在开发模式下有server，和watch模式
-  在build模式下，直接打包，不需要server和watch
-  watch模式可以在pipe中使用gulpIf来嵌入检测
-  server模式，只能但是在taskList中定义


| 当前状态 | 描述             | 预计结束时间 |
| -------- | ---------------- | ------------ |
| [✓]      | 结构化的目录结构 | 2019/1/15    |
| [✓]      | server           | 2019/1/17    |
| [✓]      | less             | 2019/1/21    |
| [✓]      | css              | 2019/1/23    |
| [✓]      | reload           | 2019/1/25    |
| [✓]      | less的sourcemap  | 2019/2/13    |
| [✓]      | js的依赖顺序问题   | 2019/2/14    |


### 20190215问题点

[完成]1. 修改产品的名称`plgui.all.版本号.js`, 对应的产出需要两个文件，一个`all`, 一个`min`文件
[完成]2. dist目录新增demo的目录
[完成]3. dist目录需要含有`vendors`这个目录
[完成]4. 新增zip的文件
[完成]5. 将项目迁移至svn中

### 20190219问题点

[完成]1. 部分example用例跑不通
[完成]2. 线上的deom要单独使用一个项目，不能被每次的`dev`或者`build`影响（建议是定好了版本才能更新demo用例）
2.1 线上用例要求，要是同对外提供的`build`版本相同
2.1 线上用例要求稳定，全



