/**
 * @desc 布局组件在外 孩子组件在内  组织全局页面性组件
 *  global document
 *  global window
 */

import React from 'react'
//import NProgress from 'nprogress'
//import PropTypes from 'prop-types'
import pathToRegexp from 'path-to-regexp'//匹配路由路径
import { connect } from 'dva'
import { Loader, MyLayout } from '../components/index'
import { BackTop, Layout } from 'antd'
import { config } from '../utils/index'//引入
import { Helmet } from 'react-helmet'//组织 html的head
import { withRouter } from 'dva/router'
import Error from './error'
import '../themes/index.less'
import './app.less'


const { Content, Footer, Sider } = Layout
const { Header } = MyLayout
const { openPages } = config


const App = ({children, dispatch, app, loading, location}) => {
    //拿到全局集市[model层-app]的state数据
    const {user,menu,permissions,siderFold} = app
    let { pathname } = location
    pathname = pathname.startsWith('/') ? pathname : `/${pathname}`
    //依照不同的路径查询用户是否有访问的权限
    const current = menu.filter(item => pathToRegexp(item.route || '').exec(pathname))
    //如果用户能访问的菜单id里包含了当前菜单的[防止用户输入地址栏强行跳转]
    //这句代码也真是讲究
    const hasPermission = current.length ? permissions.visit.includes(current[0].id) : false
    const headerProps = {
        menu,
        user,//当前登录用户
        location,
        logout () {
            dispatch({ type: 'app/logout' })
        }
    }

    const siderProps = {
        menu,
        location,
        siderFold,
        //darkTheme,
        //navOpenKeys,
        // changeTheme () {
        //   dispatch({ type: 'app/switchTheme' })
        // },
        // changeOpenKeys (openKeys) {
        //   window.localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys))
        //   dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
        // },
    }


    //loading 是路由已经是/login但是登录组件还没出现时的等待
    // children即是返回的Login组件[为什么不直接写login呢？ 可能是为了保持本页风格的统一？]
    if (openPages && openPages.includes(pathname)) {
        return (
        <div>
            {/* 明明知道要输入登录信息了，为啥还要去后台查一遍是否已登录？..可能和浏览器默认记住密码有关? */}
            {/* 不管先注释掉  spinning={loading.effects['app/query']}*/}
            <Loader fullScreen  spinning={loading.effects['app/query']}/>
            {/* 返回路由级组件 让路由依照path去找Login组件 */}
            {children}
        </div>)
    }

    //非登录页面：1. 刚进来时的默认dashboard 或者用户直接通过输入地址的方式试图进入 ===> 均为无权限 返回布局 + 404
    //           2. 有权限则依据model层订阅得到的权限值[后台返回] 生成不同的菜单 + 个人信息
    return (
        <div>
            {/* spinning={loading.effects['app/query']} */}
            <Loader fullScreen  spinning={loading.effects['app/query']}/>
            <Helmet>
                <title>ANTD ADMIN</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Helmet>
            <Layout>
                {
                    <Sider trigger={null} collapsible collapsed={siderFold}>
                        {siderProps.menu.length === 0 ? null : <MyLayout.Sider {...siderProps} />}
                    </Sider>
                }
                <Layout style={{ height: '100vh', overflow: 'scroll' }} id="mainContainer">
                    <BackTop target={() => document.getElementById('mainContainer')} />
                    <Header {...headerProps} />
                    <Content>
                        {hasPermission ? children : <Error />}
                    </Content>
                    <Footer >
                        {config.footerText}
                    </Footer>
                </Layout>
            </Layout>
        </div>
    )
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))
