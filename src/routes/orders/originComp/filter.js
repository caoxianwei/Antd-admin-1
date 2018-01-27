/**
 * @desc 筛选栏
 */
import React from 'react'
import { Form, Button, Row, Col, DatePicker, Input } from 'antd'

const Filter = ({valueData})=>{
    const {CUSTOMER_NAME,CUSTOMER_TYPE,ORDER_NO,DISTRIBUTION_DATE} = valueData;
    return(
        <Row  type="flex" justify='space-between'>
            <Col span={6}>
                <span>配送单位:&nbsp;</span>
                <Input style={{ width: 300 }} placeholder="请输入" defaultValue={CUSTOMER_NAME}/>
            </Col>
            <Col span={4}>
                <span>用户组:&nbsp;</span>
                <Input style={{ width: 200 }} placeholder="请输入" defaultValue={CUSTOMER_TYPE}/>
            </Col>
            <Col span={4}>
                <span>订单编号:&nbsp;</span>
                <Input style={{ width: 200 }} placeholder="DD201707220003" disabled={true} defaultValue={ORDER_NO}/>
            </Col>
            <Col  span={6} >
                <span>配送时间:&nbsp;</span>
                <DatePicker style={{ width: 200 }} placeholder="请选择" />
            </Col>
        </Row>
    )
}
export default Form.create()(Filter)
