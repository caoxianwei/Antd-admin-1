import dva, { connect } from 'dva';
import { Router, Route } from 'dva/router';
import React from 'react';
import styles from './index.less';
import key from 'keymaster';

const app = dva();

app.model({
  //【1】model 层 
  namespace: 'count',
  state: {
    record: 0,
    current: 0,
  },
  //【1】

  //【3】更新state 【reducer】
  //(state, action) => newState
  reducers: {
    add(state) {
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
  //【3】


  //【4】异步处理
  //当用户点 + 按钮，数值加1之后，会额外触发一个side effect，即延迟 1 秒之后数值 1
  effects: {
    *add(action, { call, put }) {//call 和 put 都是 redux-saga 的 effects，call 表示调用异步函数，put 表示 dispatch action
      yield call(delay, 1000);
      yield put({ type: 'count/minus' });
    },
  },
  //【4】

  //【5】订阅键盘事件 实现键盘测速
  subscriptions: {//订阅一个数据源
    //数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。
    keyboardWatcher(dispatch) {
      key('⌘+up, ctrl+up', () => { dispatch({type:'count/add'}) });
    },
  },
});
function delay(timeout){
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}


//【2】 component
const CountApp = ({count, dispatch}) => {
//count 和dispatch 是props传入的
  return (
    <div className={styles.normal}>
      <div className={styles.record}>Highest Record: {count.record}</div>
      <div className={styles.current}>{count.current}</div>
      <div className={styles.button}>
        <button onClick={() => { dispatch({type: 'count/add'}); }}>+</button>
      </div>
    </div>
  );
};
//【2】

//【4】  绑定数据 将model与component链接起来 
//model-》component：model定义的数据 component可以拿到{count.record}
//component -> model: component中发出[dispatch]的action，model可以接收到
function mapStateToProps(state) {
  return { count: state.count };
}
const HomePage = connect(mapStateToProps)(CountApp);
//【4】

//【5】定义路由
app.router(({history}) =>
  <Router history={history}>
    <Route path="/" component={HomePage} />
  </Router>
);

//挂载
app.start('#root');


// ---------
// Helpers

