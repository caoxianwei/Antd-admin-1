import key from 'keymaster';

export default {
  //[1] 定义model
  namespace: 'count',// model state 在全局 state 所用的 key
  state: {
    record: 0,//记录
    current: 0,//当前速度
  },

  /**
   * @func 模块--reducer[更新state]
   */
  //[3] reducer
  reducers: {
    add(state) {//add: function(state) {}
      const newCurrent = state.current + 1;
      return {
        ...state,
        record: newCurrent > state.record ? newCurrent : state.record,
        current: newCurrent,
      };
    },
    minus(state) {
      return { ...state, current: state.current - 1};
    },
  },

  /**
   * @func 模块--异步处理
   * [6] 异步处理
   * dva 通过对 model 增加 effects 属性来处理 side effect(异步任务)
   */

  effects: {
    *add(action, { call, put }) {//generator
      yield call(delay, 1000);//call 表示调用异步函数
      yield put({ type: 'count/minus' });//put 表示 dispatch action
      //默认的 effect 触发规则是每次都触发(takeEvery)，还可以选择 takeLatest，或者完全自定义 take 规则
    },
  },
  /**
   * @func 模块--订阅键盘事件
   *  [7] subscriptions 订阅事件
   *  作用: 用于订阅一个数据源，然后根据条件 dispatch 需要的 action
   *  数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等
   *  dva 中的 subscriptions 是和 model 绑定的
   */
  subscriptions: {
    keyboardWatcher(dispatch) {
      key('⌘+up, ctrl+up', () => { dispatch({type:'count/add'}) });
    },
  }
};


//延迟函数
function delay(timeout){
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
<<<<<<< HEAD
}
=======
}
>>>>>>> ecac1938be2f01b64d63371a5b56846cb28c5c5c
