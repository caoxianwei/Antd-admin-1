/**
 * @description 脚注
 */


/**
 * @desc 筛选栏
 */
import React from 'react'
import { Form, Row, Col, DatePicker, Input } from 'antd'

const Footer = ({LUMP_SUM,MEMO,CREATE_MAN,AUDITOR,AUDITOR_TIME,PRINTCOUNT})=>{
    return(
        <div>
            <Row  type="flex" justify="center">
                <Col span={6}>
                    <span>人民币金额总计:&nbsp;</span>
                    <Input style={{ width: 230 }} placeholder="请输入" defaultValue={LUMP_SUM}/>
                </Col>
                <Col span={6}>
                    <span>人民币金额总计(大写):&nbsp;</span>
                    <Input style={{ width: 230 }} placeholder="请输入" />
                </Col>
            </Row>
            <Row  type="flex" justify="center">
                <Col span={12}>
                    <span>备注:&nbsp;</span>
                    <Input style={{ width: 750 }} placeholder="请输入" defaultValue={MEMO}/>
                </Col>
            </Row>
            <Row  type="flex"  justify="center">
                <Col span={5}>
                    <span>制单人:&nbsp;</span>
                    <Input placeholder="请输入" disabled={true} defaultValue={CREATE_MAN}/>
                </Col>
                <Col span={5}>
                    <span>审核人:&nbsp;</span>
                    <Input  placeholder="请输入"disabled={true} defaultValue={AUDITOR}/>
                </Col>
                <Col span={5}>
                    <span>审核日期:&nbsp;</span>
                    <Input  placeholder="请输入" disabled={true} defaultValue={AUDITOR_TIME}/>
                </Col>
                <Col span={5}>
                    <span>打印次数:&nbsp;</span>
                    <Input  placeholder="请输入" disabled={true} defaultValue={PRINTCOUNT}/>
                </Col>
            </Row>
        </div>
    )
}
export default Form.create()(Footer)
