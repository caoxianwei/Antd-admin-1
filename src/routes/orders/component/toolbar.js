import React from 'react'
import { Button,Row, Col } from 'antd';

const Toolbar = ({data,onClickItem})=>{
    const clickHandler=(value)=>{
        onClickItem(value)
    }
    return (
        <Row type="flex">
            {
                data.map(ele=>{
                    return(
                        <Col span={2} key={ele.name}>
                            <Button type="primary" icon={ele.icon} onClick={clickHandler.bind(null,ele.fun)}>
                                {ele.name}
                            </Button>
                        </Col>
                    )
                })
            }
        </Row>
    )
}


export default Toolbar;
