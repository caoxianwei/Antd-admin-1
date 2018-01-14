/**
 *   @desc 用户展示列表-纯UI组件
 *   @author yxy
 *   @date  2018/1/13
 */
import React from 'react';
import { Table, Popconfirm } from 'antd';
import 'antd/dist/antd.css';

const UserList = ({total,current,loading,dataSource})=>{
    //定义表头
    const columns = [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
      },{
        title: '角色',
        dataIndex: 'role',
        key: 'role',
      }, {
        title: '上次登陆时间',
        dataIndex: 'creattime',
        key: 'creattime',
      },{
        title: '操作',
        key: 'operation',
        render: (text, record) => (
          <p>
            <a onClick={()=>{}}>编辑</a>
            &nbsp;
            <Popconfirm title="确定要删除吗？" onConfirm={()=>{}}>
              <a>删除</a>
            </Popconfirm>
          </p>
        ),
    }];
    //分页对象
    const pagination = {
        total,
        current,
        pageSize: 10,
        onChange: ()=>{},
    }
    return(
        <div>
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                rowKey={record => record.name}
                pagination={pagination}
            />
        </div>
    );
}



export default UserList;
