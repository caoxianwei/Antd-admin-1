import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover, Layout } from 'antd'
import classnames from 'classnames'
import { Link } from 'dva/router';
import styles from './Header.less'
import Menus from './Menu'//位于header的一个按钮控制侧栏是否收缩

const Header = ({menu,user,siderFold,logout,location})=>{
    //let handleClickMenu = e => e.key === 'logout' && logout()
    // const menusProps = {//header
    //     menu,
    //     siderFold: false
    // }


    const { SubMenu } = Menu;
    return (
        <Layout.Header className={styles.header}>
            <Menu
                selectedKeys={[location.pathname]}
                mode="horizontal"
                theme="dark"
            >
                <Menu.Item key="/user">
                    <Link to="/user"><Icon type="user" />用户列表</Link>
                </Menu.Item>
                <Menu.Item key="/studydemo">
                    <Link to="/studydemo"><Icon type="bars" />测速小游戏demo</Link>
                </Menu.Item>
                <Menu.Item key="/404">
                    <Link to="*"><Icon type="frown-circle" />404</Link>
                </Menu.Item>
            </Menu>
            <div className={styles.rightWarpper}>
                <div className={styles.button}>
                    <Icon type="mail" />
                </div>
                <Menu mode="horizontal" theme="dark">
                    <SubMenu className={styles.login}
                        style={{float: 'right'}}
                        title={<span>
                            <Icon type="user" />
                            用户中心
                        </span>}
                    >
                        <Menu.Item key="logout">
                            <span style={{fontSize:'20px'}}>退出登录</span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
             </div>
      </Layout.Header>
    );
}

export default Header;
