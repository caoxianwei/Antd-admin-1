/**
 * @desc 布局组件在外 孩子组件在内  组织全局页面性组件
 *  global document
 *  global window
 */

import React from 'react'
//import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import pathToRegexp from 'path-to-regexp'//匹配路由路径
import { connect } from 'dva'
import { Loader, MyLayout } from 'components'
import { BackTop, Layout } from 'antd'
import { classnames, config } from 'utils'//引入
//import { Helmet } from 'react-helmet'
import { withRouter } from 'dva/router'
import Error from './error'
import '../themes/index.less'
import './app.less'


const { Content, Footer, Sider } = Layout
const { Header, styles } = MyLayout
const { prefix, openPages } = config



