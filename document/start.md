### 更新
<hr />
PLGUI当前安装的方式，只需要手动的下载相应的文件即可，在使用的项目中引入相应的资源（css， js等资源即可）。每次更新的时候只需要重新下载PLGUI文件，替换之前的文件即可。

### 概况
<hr />

PLGUI 主要分为 prologui 和vendors 两个文件夹，prologui 是我们实际编写项目内容的文件夹，分为styles/images/javascripts文件，为了保持目录结构的结构化，在styles中也对相应的模快进行了分割处理，方便当前的开发和后续的维护。


### 项目结构

<hr />
```
├── prologui/                           // 核心部分
│   └── assets/                         // 静态资源目录
│       ├── images/                     // 静态资源图片目录
│       │   ├── PlgCore/                // 响应的组件部分
│       │   ├── PlgIeAlert/
│       │   ├── PlgSideAccordion/
│       │   ├── PlgSidebar/
│       │   ├── PlgTabs/
│       │   └── PlgZtree/
│       ├── javascripts/                // 静态资源js部分 
│       │   ├── cardList.js             // 对应的组件js
│       │   ├── selectPlus.js*
│       │   └── selectTags.js
│       └── styles/                     // 静态资源CSS部分
│           ├── mix/                    // LESS资源中的mix
│           ├── plgui.less              // LESS资源的入口
│           ├── reset/                  // LESS的reset设置
│           ├── ui/                     // LESS中的各个组件的单个的样式
│           └── variables/              // LESS中的全局变量，主题，公共变量
├── vendors/                            // 该项目目前使用的第三方资源，尽可能不修改里面的内容，后续可以采用直接替换的方式升级
│   ├── dhtmlx/
│   │   ├── editor/
│   │   │   ├── License_Free.html
│   │   │   ├── License_gpl_2.0.txt
│   │   │   ├── codebase/
│   │   │   ├── docs/
│   │   │   ├── readme.txt
│   │   │   ├── samples/
│   │   │   ├── skins/
│   │   │   └── sources/
│   │   ├── form/
│   │   │   ├── codebase/
│   │   │   └── skins/
│   │   └── grid/
│   │       ├── codebase/
│   │       └── skins/
```

### 快速开始

<hr />

- 需要使用那个组件，直接在`examples`中查看对应的用例，没有使用数据的`Ajax`请求的数据，直接双击运行即可。如果使用了`Ajax`则需要在本地启一个服务，才能正常使用。

