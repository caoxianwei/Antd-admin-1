/**
 * @desc what's dva
 */



/**
 *  现有架构问题：
 *      项目太大无法按需加载
 *      数十个api需要记
 *      redux分层清晰但是太过于重复
 *      一遍一遍重复的写showLoading hideLoading
 *      中间件的异步逻辑太复杂
 * 
 * 
 *  dva是什么？
 *      dva 是基于现有应用架构 (redux + react-router + redux-saga 等)的一层轻量封装，没有引入任何新概念
 *  
 *  核心：
 *      提供了 app.model 方法，用于把 reducer, initialState, action, saga 封装到一起
 *  app:model({
 *      namespace: //对应 reducer 在 combine 到 rootReducer 时的 key 值
 *      state:{} //对应 reducer 的 initialState
 *      
 *      subscriptions:[ //订阅 数据源
 *          //数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。
 *          function(dispatch) {
 *              dispatch({type: 'products/query'});
 *          },
 *      ]
 *      
 *      effects:{//对应 saga，并简化了使用
 *         //call 和 put 都是 redux-saga 的 effects，call 表示调用异步函数，put 表示 dispatch action
 *      }
 *      
 *      reducers
 *  })  
 */