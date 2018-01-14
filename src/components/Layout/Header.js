import React from 'react';
import { Menu, Icon,Layout } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';

const Header = function({location}){
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
                            <span style={{fontSize:'20px'}}>退出登陆</span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
             </div>
      </Layout.Header>
    );
}

export default Header;
