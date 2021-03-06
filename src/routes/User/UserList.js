/**
 *   @desc 用户展示列表-纯UI组件
 *   @author yxy
 *   @date  2018/1/13
 */
import React from 'react';
//import queryString from 'query-string';
import { Table,Button,Modal } from 'antd';
import 'antd/dist/antd.css';
import Dialog from './Dialog';
const confirm = Modal.confirm

const UserList = ({onCreateItem, onEditItem,onDeleteItem,total,current,loading,dataSource})=>{
    const createHandler=(value)=>{
        onCreateItem(value)
    }
    const editHandler=(record,values)=>{
        onEditItem(record.id,values)
    }
    const deleteHandler=(record)=>{
        confirm({
        title: '确定要删除吗?',
            onOk () {
                onDeleteItem(record.id)
            }
        })
    }
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
            <Dialog record={record} onOk={editHandler.bind(null, record)}>
                <Button type="primary">编辑</Button>
            </Dialog>
            &nbsp;
            <a onClick={deleteHandler.bind(null, record)}><Button type="danger">删除</Button></a>
          </p>
        ),
    }];
    return(
        <div>
            <Dialog record={{}} onOk={createHandler}>
                <Button type="primary" onClick={createHandler}>新建用户</Button>
            </Dialog>
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                rowKey={record => record.name}
            />
        </div>
    );
}



export default UserList;
