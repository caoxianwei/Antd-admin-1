/**
 * @desc 结合官方教程写栗子
 */

 /*

    0.概要
    1.划分结构
    2.设计model
    3.组件设计
    4.组件实践
    5.添加reducer
    6.添加Effect
    7.定义service
    8.添加样式
    9.设计布局
*/

//1.划分结构
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

//3.组件设计
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

//4.组件实践
/*
    1. 设置路由  src/router.js

    2. Users Container Component 的设计 -> src/routes/User.js
        页面维度的容器
        => 本项目中 Users Container 的表现为 Route Components
        Use容器组件由 3个Presentational Components 组成: -> src/components/Users
            UserSearch 用户筛选搜索框 -> src/components/Users/UserSearch
            UserList 用户信息展示列表 -> src/components/Users/UserList
            UserModal 添加用户 & 修改用户弹出的浮层 -> src/components/Users/UserModal


    3. src/components 下面写具体的组件
        定义组件推荐stateless写法
        1.UserList实现
            用户展示列表 期望只需要把数据传进去然后展示 附带信息：分页【total，current】加载状态【loading】
            <UserList
                current={current}
                total={total}
                dataSource={list} //=> Users Router Container中添加静态数据，传递到components组件
                loading={loading}
            />

    小结：
        src/router【路由配置】-》 src/routes/User[页面维度的组件] -》src/components/User[无状态组件]

        比如写的UserList先负责展示数据不涉及用户交互 而数据的由来暂时将死数据写在container组件里，
        通过继承props的方式传递下来给无状态组件

        接下来引入src/model,在model层里创建reducer将数据抽象出来
*/

//5.给UsersModel添加 Reducers
/*
    reducer思想：命名来自reduce，聚合
    作用：在 dva 中 reducers 主要负责修改 model 的数据（state）
         model 的数据就是通过我们分离出来的 reducer 创建出来的，
         这样可以让每个 reducer 【专注】于相关数据的修改，但是最终会构建出完整的数据

    1. src/models/users.js
        之前已经定义好它的state 接下来我们看看如何根据新的数据来修改本身的 state，这就是 reducers 要做的事情
        之前子组件UserList组件的用户展示数据【模拟数据定义在其容器组件src/routes/User.js中】,
            现在我们把这个模拟数据移动到reducer中
        将 Users Model 的数据变成静态数据:
            把这个模拟数据移动到reducer中,通过调用 'users/query/success' 这个 reducer,即可获得数据

        那么我们如何调用这个 reducer，能够让这个数据传入 UserList 组件呢?
        => 某容器组件需要某数据，就从Model中订阅数据源
        => 某个无状态组件需要某数据进行展示，则从它的容器组件中去拿【props继承数据】
           容器组件根据底下的组件需要哪些数据就从Model的reducer层按需订阅

        啊！！这思想。。。终于彻底明白了容器组件和UI组件。。
            容器组件负责数据的处理，UI组件负责展示。如果类比的话，就像工厂加工的，，，
                【等我去了解下工厂的加工流程】
        食品：原料->加工【加料调味剂等】->包装->运输
            UI组件相当于包装 决定一个按钮长什么样子一个列表每行几个等。
            容器组件相当于一个搅拌机，拿着食品说明书根据需要的原料按需地去数据集市订阅数据，然后把数据加工成UI组件需要的状态
                                如原料写的是草莓，土豆，但是我们打开包装盒看到的吃到的却是草莓味的土豆泥😊
            而数据集市是哪里呢？【btw 集市这个词让我想到了开源。。。那个什么鬼 教堂与集市的比喻】
                本地数据获取：自家门前种菜，自给自足
                网络数据获取：大山采集或是集市去买【需要时间长,我们不能白等着其他人先做其他的事情，等买完菜回来之后再继续做有菜才能做的工作【异步】。】
                    要使用fectch，同时异步处理[effect]
        反思：为什么现在才出现UI组件和容器组件的划分呢？即数据和展示完全剥离 【我们甚至可以先写完逻辑再写页面】
            编写一个app不就类似生产一个食品，我去查食品流程图的时候发现这个流程很理所当然啊 流水线的工作模式
                可是为什么前端或者app出现这么久了现在才实现完全的数据和UI分层呢？
            疑惑....【主要是接触react以来 我最大的感触就是组件化，层级化】这两个巨大的变化让我眼前一亮大呼称奇
                    可是细细一想，我在反思为什么这个思想出来的这么晚
                        或是食品加工的前身是什么？它的发展历史是什么？什么时候引入的流水线模式？什么给它带来了革命性变化
        啊好烦啊找不到之前看的那个博文了写了一个关于UI组件和容器组件：现在回味才觉得写的好
                可以先写逻辑再写样式，当产品经理和UI小姐姐在纠结按钮怎么放的时候你早已经把逻辑写好了~
        emmm以后在学习阶段还是不要随意删除收藏了。。有些文章学的时候看和领悟的时候看及学会之后总结的时候再去看是完全不一样的感觉
    好了，继续回到关联Model：
        /src/routes/User.js 容器组件中：
            1.  { connect } from 'dva';// 引入 connect 工具函数 import
            2.
                // 指定订阅数据，选择关联 users
                function mapStateToProps({ users }) {
                    return {users};
                }

                // 建立数据关联关系
                export default connect(mapStateToProps)(Users);
                function Users({ location, dispatch, users }) {
                    const {
                        loading, list, total, current,
                        currentItem, modalVisible, modalType
                    } = users //数据源的数据
                }
            即订阅数据后,通过props可以访问到model的数据，
            而容器组件下的UI组件拿到负责展示的数据也是 Container Component 通过 props 传递的过来的

    以上解决了UI组件展示容器组件从数据源model中订阅的数据，涉及的概念:订阅Model数据按需申请，UI组件props继承容器组件的数据
    接下来思考：
        UI组件怎么调用reducer的数据？即一打开页面我就要展示，发送一个action【类似于像后台发送数据那样】
    发起action：
        dispatch({
            type: '', // action 的名称，与 reducers（effects）对应
            ... // 调用时传递的参数，在 reducers（effects）可以获取
        });
        action的名称（type）如果是在 model 以外调用需要添加 namespace
    /src/components/Users.js
        发起一个action
        dispatch({
            type: 'users/querySuccess', // 调用一个actions
            payload: {}, // 调用时传递的参数
        });

        发起action的时机：生命周期，用户点击等
        这里采用监听路由：
            本例中获取用户数据信息的时机就是访问 /users/ 这个页面
            所以我们可以监听路由信息，只要路径是 /users/ 那么我们就会发起 action，获取用户数据
        监听路由发action：
    /src/models/users.js
            subscriptions订阅数据源 【这里订阅监听路由信息】
            import { hashHistory } from 'dva/router';
            subscriptions: {
                setup({ dispatch, history }) {
                    history.listen(location => {
                    if (location.pathname === '/users') {
                        dispatch({
                        type: 'querySuccess',
                        payload: {}
                        });
                    }
                    });
                },
            },
    /src/index.js
    最后回到model添加model
        app.model(require('./models/users.js'));

    小结：
        设计好了 model state -> 抽象数据
        完善了组件 -> 完善展示
        添加了 Reducers -> 数据同步处理
        接下来我们考虑
            数据的异步处理 <- 将请求相关的[与后台交互的]抽离出来[=》 /src/service
            mock数据 [=> 如果没数据我们可以mock数据然后使用异步获取数据的方式从本地拿数据
*/
