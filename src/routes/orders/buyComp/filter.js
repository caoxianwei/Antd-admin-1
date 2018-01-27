/**
 * @desc 筛选栏
 */
import React from 'react'
import { Form, Button, Row, Col, DatePicker, Input } from 'antd'

const Filter = ()=>{
    return(
        <Row  type="flex">
            <Col span={3}>
                <span>采购员:&nbsp;</span>
                <Input style={{ width: 200 }} placeholder="请输入" />
            </Col>
            <Col span={3}>
                <span>采购开始时间:&nbsp;</span>
                <DatePicker style={{ width: 200 }} placeholder="请选择" />
            </Col>
            <Col span={3}>
                <span>采购结束时间:&nbsp;</span>
                <DatePicker style={{ width: 200 }} placeholder="请选择" />
            </Col>
            <Col  span={3} >
                <span>库房:&nbsp;</span>
                <Input style={{ width: 200 }} placeholder="请输入" />
            </Col>
            <Col  span={3} >
                <span>审核状态:&nbsp;</span>
                <Input style={{ width: 200 }} placeholder="请输入" />
            </Col>
            <Col  span={3} >
                <span>编号:&nbsp;</span>
                <Input style={{ width: 200 }} placeholder="请输入" />
            </Col>
            <Col  span={3} >
                <span>类型名称:&nbsp;</span>
                <Input style={{ width: 200 }} placeholder="请输入" />
            </Col>
            <Col  span={3} >
                <Button type="primary"  icon="search" >搜索</Button>
            </Col>
        </Row>
    )
}
export default Form.create()(Filter)
