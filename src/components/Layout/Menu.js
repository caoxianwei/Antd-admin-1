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
    //const SubMenu = Menu.SubMenu;
    let menuList = [];
    menu.forEach(el => {
        menuList.push(
            <Menu.Item key={el.route}>
                <Icon type={el.icon} />
                <span>{el.name}</span>
                <Link to={el.route}></Link>
            </Menu.Item>
        )
    });
    return (
        <div>
            <Menu
                theme="dark"
                //onClick={this.handleClick}
                defaultOpenKeys={['sub1']}
                selectedKeys={[location.pathname]}
                mode="inline"
            >
                {menuList}
            </Menu>
        </div>
    )
}
export default Menus
