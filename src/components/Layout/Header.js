import React from 'react'
//import PropTypes from 'prop-types'
import { Menu, Icon, Layout } from 'antd'
//import classnames from 'classnames'
//import { Link } from 'dva/router';
import styles from './Header.less'
//import Menus from './Menu'//位于header的一个按钮控制侧栏是否收缩

const Header = ({menu,user,siderFold,logout,location})=>{
    let handleClickMenu = e => e.key === 'logout' && logout()
    const { SubMenu } = Menu;
    return (
        <Layout.Header className={styles.header}>
            <Menu
                selectedKeys={[location.pathname]}
                mode="horizontal"
                theme="dark"
            >
            </Menu>
            <div className={styles.rightWarpper}>
                <div className={styles.button}>
                    <Icon type="mail" />
                </div>
                <Menu mode="horizontal" theme="dark"  onClick={handleClickMenu}>
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
