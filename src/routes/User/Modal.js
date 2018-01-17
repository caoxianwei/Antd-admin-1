/**
 *  @desc User的页面级容器组件 管理整个user的组件
 *      下面包含各UI组件：
 *              UserList
 *              UserSearch等
 *  @func 负责订阅数据-把数据加工传递给UI组件展示
 */
import React from 'react';
import MainLayout from '../../components/Layout/index';
//user 的  UI组件
import UserList from './UserList';
//引入对应样式
import styles from './Modal.less';
// 引入 connect 工具函数
import { connect } from 'dva';

const User = ({location,dispatch, user})=>{
    const {list, total,loading, current} = user;
    const userListProps = {
        total,
        current,
        loading,
        dataSource:list,
        onCreateItem(value){
            //value:Proxy[有个拦截] Object
            if(value.name){
                dispatch({
                    type: 'user/create',
                    payload: value,
                })
            }
        },
        onDeleteItem (id) {
            dispatch({
                type: 'user/delete',
                payload: id,
            })
        },
        onEditItem (id,value) {
            dispatch({
                type: 'user/update',
                payload: {id,value},
            })
        }
    };
    return (
        // <MainLayout location={location}>
            <div className={styles.normal}>
                <UserList {...userListProps}/>
            </div>
        // </MainLayout>
    )
}
// 指定订阅数据，这里关联了 user
function mapStateToProps({ user }) {
    return {user};
}
export default connect(mapStateToProps)(User);
