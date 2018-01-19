import React from 'react'
//import PropTypes from 'prop-types'
import { Menu, Icon} from 'antd'
import { Link } from 'dva/router';
import { arrayToTree } from '../../utils/mixin'
//import pathToRegexp from 'path-to-regexp'

//const SubMenu = Menu.SubMenu;
const Menus = ({ siderFold, menu, location }) => {
    const menuTree = arrayToTree(menu)
    //递归生成菜单
    const getMenus = (menuTreeN) => {
        return menuTreeN.map((item) => {
            let submenu = item.children;
            if (submenu) {
                return (
                    <Menu.SubMenu
                        key={item.id}
                        title={
                            <span>
                                {item.icon && <Icon type={item.icon} />}
                                <span>{item.name}</span>
                            </span>
                        }
                    >
                        {getMenus(item.children)}
                    </Menu.SubMenu>
                )
            }
            return (
                //只有一级
                <Menu.Item key={item.id}>
                    <Link to={item.route|| '#'}>
                        {item.icon && <Icon type={item.icon} />}
                        <span>{item.name}</span>
                    </Link>
                </Menu.Item>
            )
        })
    }

    const menuItems = getMenus(menuTree)
    return (
        <Menu
            theme="dark"
            defaultOpenKeys={['0']}
            selectedKeys={[location.pathname]}
            mode="inline"
        >
            {menuItems}
        </Menu>
    )
}

export default Menus
