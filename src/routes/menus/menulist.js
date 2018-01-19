/**
 *  菜单列表
 *  嵌套级
 */

import { Table,Button,Modal } from 'antd';
import Dialog from './dialog';
const confirm = Modal.confirm

const UserList = ({onCreateItem, onEditItem,onDeleteItem,data})=>{
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

    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: '菜单名称',
        dataIndex: 'name',
        key: 'name',
    },{
        title: '父节点',
        dataIndex: 'pid',
        key: 'pid',
    }, {
        title: '菜单链接地址',
        dataIndex: 'route',
        key: 'route',
    },{
        title: '菜单图标',
        dataIndex: 'icon',
        key: 'icon',
    },{
        title: '操作',
        key: 'operation',
        render: (text, record) => (
        <p>
            <Dialog record={record} onOk={createHandler.bind(null, record)}>
                <Button type="primary">新增子节点</Button>
            </Dialog>
            &nbsp;
            <Dialog record={record} onOk={editHandler.bind(null, record)}>
                <Button type="primary">修改</Button>
            </Dialog>
            &nbsp;
            <a onClick={deleteHandler.bind(null, record)}><Button type="danger">删除</Button></a>
        </p>
        ),
    }];

      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
      };
    return (
        <div>
            <Dialog record={{}} onOk={createHandler}>
                <Button type="primary">新建一级菜单</Button>
            </Dialog>
            <Table columns={columns} rowSelection={rowSelection} dataSource={data} indentSize={45} bordered={true}/>
            {/* <Table
                columns={columns}
                expandedRowRender={ record =>
                   // <p style={{ margin: 0 }}>{record.description}</p>
                    <Table
                        columns={columns}
                        dataSource={data}
                        expandedRowRender={ record =>
                            // <p style={{ margin: 0 }}>{record.description}</p>
                             <Table
                                 columns={columns}
                                 dataSource={data}

                              />
                         }
                     />
                }
                dataSource={data}
            /> */}
        </div>
    )
}
export default UserList;
