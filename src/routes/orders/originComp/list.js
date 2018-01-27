/**
 * 列表组件
 */
import React from 'react';
import { Table,Button,Modal, Input, Popconfirm  } from 'antd';
import 'antd/dist/antd.css';
import Footer from './footer';
//const confirm = Modal.confirm

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);


class EditableTable extends React.Component {
  constructor(props) {
    super(props);
        this.columns = [
            {
            title: '内部商品名',
            dataIndex: 'INTERNAL_NAME',
            width: '15%',
            render: (text, record) => this.renderColumns(text, record, 'INTERNAL_NAME'),
            }, {
            title: '内部商品类型',
            dataIndex: 'INTERNAL_TYPE',
            width: '15%',
            render: (text, record) => this.renderColumns(text, record, 'INTERNAL_TYPE'),
            }, {
            title: '单位',
            dataIndex: 'UNIT_NAME',
            width: '15%',
            render: (text, record) => this.renderColumns(text, record, 'UNIT_NAME'),
            }, {
            title: '数量',
            dataIndex: 'AMOUNT',
            width: '15%',
            render: (text, record) => this.renderColumns(text, record, 'AMOUNT'),
            }, {
            title: '单价',
            dataIndex: 'UNIT_PRICE',
            width: '15%',
            render: (text, record) => this.renderColumns(text, record, 'UNIT_PRICE'),
            },{
            title: '总价',
            dataIndex: 'SUM',
            width: '15%',
            render: (text, record) => this.renderColumns(text, record, 'SUM'),
            },  {
            title: '操作',
            dataIndex: 'operation',
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
    const {dataSource,footerData} = this.props;

    return(
        <div>
            <Table
                bordered
                dataSource={dataSource}
                columns={this.columns}
                rowKey={record => record.ID}
            />
            <Footer {...footerData}/>
        </div>
    )
  }
}
export default EditableTable;
