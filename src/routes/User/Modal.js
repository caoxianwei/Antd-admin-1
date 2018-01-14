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
        /*
            total: 3,
            current: 1,
            loading: false,
            dataSource:[{
                name: '张三',
                gender: '男',
                role: '游客',
                creattime:'2018/1/12 8：00'
            },{
                name: '李四',
                gender: '女',
                role: '管理员',
                creattime:'2018/1/13 8：00'
            }]
        */
        total,
        current,
        loading,
        dataSource:list
    };
    return (
        <MainLayout location={location}>
            <div className={styles.normal}>
                <UserList {...userListProps}/>
            </div>
        </MainLayout>
    )
}
// 指定订阅数据，这里关联了 user
function mapStateToProps({ user }) {
    return {user};
}
export default connect(mapStateToProps)(User);
