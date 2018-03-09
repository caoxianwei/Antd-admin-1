import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './counter.less';

const Counter = ({dispatch,counter})=>{
    const {count}  = counter;
    const onAdd =(value)=>{
        dispatch({
            type:'counter/add',
            payload:value
        })
    }
    const onMinus =(value)=>{
        dispatch({
            type:'counter/minus',
            payload:value
        })
    }
    return (
        <div className={styles.box}>
            <h1 className={styles.title}>当前数:{count}</h1>
            <div className={styles.button}>
                <Button type="danger" size="large" onClick={onMinus.bind(null,2)}>减 2</Button>
                <Button type="primary" size="large"  onClick={onAdd.bind(null,3)}>加 3</Button>
            </div>
        </div>
    );
}



function mapStateToProps(state) {
    return {
        counter:state.counter
    };
}
export default connect(mapStateToProps)(Counter);
