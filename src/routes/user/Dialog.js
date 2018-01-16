/**
 *  @desc 新建或编辑的弹出框
 *  children ：新建或删除
 */

import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class UserDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,//是否可见
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };
  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //一个回调函数
        onOk(values);
        this.hideModelHandler();
      }
    });
  };
  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name, gender,role } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          {/* children 是包含在dialog里面的孩子 新增和编辑 */}
          { children }
        </span>
        <Modal
          title="编辑"
          visible={this.state.visible}
          onCancel={this.hideModelHandler}
          onOk={this.okHandler}
          okText="保存"
          cancelText="取消"
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                  rules: [{required: true}]
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="性别"
            >
              {
                getFieldDecorator('gender', {
                  initialValue: gender,
                  rules: [{required: true}]
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="角色"
            >
              {
                getFieldDecorator('role', {
                  initialValue: role,
                  rules: [{required: true}]
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserDialog);

