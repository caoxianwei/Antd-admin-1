/**
 * @desc 结合官方教程写栗子
 */

 /*
 
    1.划分结构
    2.设计 Model
    3.组件设计
    4.添加样式
    5.添加 Reducers
    6.添加 Effects
    7.定义 Service
    8.mock 数据
    9.添加样式
    10.设计布局
*/

//划分结构
```
├── /mock/           # 数据mock的接口文件
├── /src/            # 项目源码目录
│ ├── /components/   # 项目组件
│ ├── /routes/       # 路由组件（页面维度） 
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口
│ ├── /utils/        # 工具函数
│ ├── route.js       # 路由配置
│ ├── index.js       # 入口文件
│ ├── index.less     
│ └── index.html     
├── package.json     # 项目信息
└── proxy.config.js  # 数据mock配置
```
//2. 设计model
/*
    1.【分析需求Model抽象】
        一个表格 删编辑
                查询功能    
    由此抽象出usermodel

    2.【Model 的设计】
    基于数据维度
        只关心数据本身，保持纯粹性，比如登录状态的model
    基于业务的model设计
        用于数据和交互联系紧密的情况
        将业务状态也一并放到 model 当中去了，这样所有状态的变化都会在 model 中控制
    此处选择基于业务的
*/

//3.组件设计与组件实践
/*

    组件设计思想:在拆分 Component 的过程中要尽量让每个 Component 专注做自己的事
    组件分类：
        木偶组件/UI组件
            展示型组件
            特性：不会关联订阅 model 上的数据，而所需数据通过 Container Component 通过 props 传递到组件内部。
        容器组件  //订阅子组件需要的数据，组织子组件的交互逻辑和展示  
            具有监听数据行为的组件
            作用：绑定相关联的 model 数据
            表现：Layouts、Router Components 以及普通 Containers 组件            

    组件分类的好处：
        让项目的数据处理更加集中；
        让组件高内聚低耦合，更加聚焦；
*/