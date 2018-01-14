import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import styles from './login.less'

const FormItem = Form.Item

const Login = ({loading,dispatch,form: {getFieldDecorator,validateFieldsAndScroll},}) => {
    function handleOk () {
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            dispatch({ type: 'login/login', payload: values })
        })
    }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <span>基于dva的后台管理系统</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input className={styles.input} onPressEnter={handleOk} placeholder="用户名" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input className={styles.input}  type="password" onPressEnter={handleOk} placeholder="密码" />)}
        </FormItem>
        <Row>
          <Button className={styles.button}  type="primary" onClick={handleOk} >
            登录
          </Button>
          <p>
            <span>游客用户名：guest</span>
            <span>游客密码：guest</span>
          </p>
        </Row>

      </form>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ loading }) => ({ loading }))(Form.create()(Login))
