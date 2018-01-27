/**
 * 列表组件
 */
import React from 'react';
import { Table,Button,Modal, Input, Popconfirm  } from 'antd';
import 'antd/dist/antd.css';
//const confirm = Modal.confirm

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

//const {ORDER_NO,PURCHASE_MAN,PURCHASE_DATE,MEMO,CREATE_TIME,STOREHOUSE_NAME,TRADE_TYPE,STATE} = orderList
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
        this.columns = [
            {
            title: '采购单编号',
            dataIndex: 'ORDER_NO',
            width: '12.5%',
            render: (text, record) => this.renderColumns(text, record, 'ORDER_NO'),
            }, {
            title: '*采购员',
            dataIndex: 'PURCHASE_MAN',
            width: '12.5%',
            render: (text, record) => this.renderColumns(text, record, 'PURCHASE_MAN'),
            }, {
            title: '*采购时间',
            dataIndex: 'PURCHASE_DATE',
            width: '12.5%',
            render: (text, record) => this.renderColumns(text, record, 'PURCHASE_DATE'),
            }, {
            title: '备注',
            dataIndex: 'MEMO',
            width: '10%',
            render: (text, record) => this.renderColumns(text, record, 'MEMO'),
            }, {
            title: '*建单时间',
            dataIndex: 'CREATE_TIME',
            width: '12.5%',
            render: (text, record) => this.renderColumns(text, record, 'CREATE_TIME'),
            },{
            title: '仓库名',
            dataIndex: 'STOREHOUSE_NAME',
            width: '12.5%',
            render: (text, record) => this.renderColumns(text, record, 'STOREHOUSE_NAME'),
            },{
            title: '类型名称',
            dataIndex: 'TRADE_TYPE',
            width: '12.5%',
            render: (text, record) => this.renderColumns(text, record, 'TRADE_TYPE'),
            },{
            title: '订单状态',
            dataIndex: 'STATE',
            width: '12.5%',
            render: (text, record) => this.renderColumns(text, record, 'STATE'),
            },{
            title: '操作',
            dataIndex: 'operation',
            width: '12.5%',
            render: (text, record) => {
                const { editable } = record;
                return (
                <div className="editable-row-operations">
                    {
                    editable ?
                        <span>
                            <a onClick={() => this.save(record.ID)}><Button type="primary">保存</Button></a>
                            &nbsp;
                            <Popconfirm title="确定取消修改吗?" onConfirm={() => this.cancel(record.ID)}>
                                <a><Button type="danger">取消</Button></a>
                            </Popconfirm>
                        </span>
                        :
                        <span>
                            <a onClick={() => this.edit(record.ID)}><Button type="primary">修改</Button></a>
                            &nbsp;
                            <a><Button type="danger">删除</Button></a>
                        </span>
                    }
                </div>
                );
            },
            }
        ];
    this.state = { data:this.props.dataSource };
    this.cacheData = this.props.dataSource.map(item => ({ ...item }));
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.ID, column)}
      />
    );
  }
  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }
  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.ID)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.ID)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }
  render() {
    const {dataSource} = this.props;
    return(
        <div>
            <Table
                bordered
                dataSource={dataSource}
                columns={this.columns}
                rowKey={record => record.ID}
               // scroll={{ x: 200 }}
            />
        </div>
    )
  }
}
export default EditableTable;
