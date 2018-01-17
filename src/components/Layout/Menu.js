import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon} from 'antd'
import { Link } from 'dva/router';
//import { arrayToTree, queryArray } from 'utils'
import pathToRegexp from 'path-to-regexp'

const SubMenu = Menu.SubMenu;

const Menus = ({ siderFold, menu, location }) => {
    //将组件上级传下来的扁平化menu数组 转换成 树状结构 再将这个数据套在UI组件里面
    //siderFold： 决定侧栏的展示形式
    const SubMenu = Menu.SubMenu;
    return (
        <div>
             <Menu
                theme="dark"
                //onClick={this.handleClick}
                //style={{ width: 256 }}
                defaultOpenKeys={['sub1']}
                //selectedKeys={[this.state.current]}
                mode="inline"
            >
                <Menu.Item key="sub1">
                  <Icon type="pie-chart" />
                  <span>图表</span>
                </Menu.Item>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>角色管理</span></span>}>
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="setting" /><span>菜单配置</span></span>}>
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
                </Menu>
        </div>
    )
}
export default Menus
