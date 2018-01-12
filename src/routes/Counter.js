import React from 'react';
import { connect } from 'dva';
import styles from './Counter.less';


/**
 *
 * @func 模块-component
 */

const CountApp = ({count, dispatch}) => {
    //[2] component
    //通过 props 传入两个值，count 和 dispatch，
    //count 对应 model 上的 state，在后面 connect 的时候绑定，dispatch 用于分发 action
    return (
      <div className={styles.normal}>
          <div className={styles.record}>
              最高记录:
              {count.record}
          </div>
          <div className={styles.current}>
              当前记录
              {count.current}
          </div>
        <div className={styles.button}>
          <button onClick={() => { dispatch({type: 'count/add'}); }}>+</button>
        </div>
      </div>
    );
};

/**
 * @func 模块--container[连接Model和Component]
 * 作用：[4] container
 *  使Component能使用 Model 里定义的数据
 *  Model 中也能接收到 Component 里 dispatch 的 action
 */
function mapStateToProps(state) {
    return { 
        count: state.count 
    };
}

//connect连接
const HomePage = connect(mapStateToProps)(CountApp);
  
export default HomePage;