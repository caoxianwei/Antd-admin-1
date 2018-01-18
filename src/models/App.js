/**
 * @desc 主数据集 其余数据集继承于它
 */
import { routerRedux } from 'dva/router'
import { parse } from 'qs'//退出登录
import { query, logout } from '../services/app'// query某个用户具体信息
import * as menusService from '../services/menus'// query 提供获取菜单列表
import {config} from '../utils/index'
import queryString from 'query-string'
import {getCookie,setCookie} from '../utils/mixin'

export default {
    namespace: 'app',
    state:{
        user:{},
        permissions:{
            visit:[]
        },
        menu:[{
            id:'6',
            icon:'user-add',
            route:'/originsee',
            name:'普通人能看的'
        }],
        locationPathname: '', //当前路径
        locationQuery: {},//from 判断上个路由
        siderFold:false// TODO: 存在local storage里
    },
    subscriptions:{
        setupHistory ({ dispatch, history }) {
            history.listen((location) => {
              dispatch({
                type: 'updateState',//每次路由变化便发出action触发reducer去更新路由路径和上次路由信息
                payload: {
                  locationPathname: location.pathname,
                  locationQuery: queryString.parse(location.search)
                  //将即将离开时所在的路由信息记录下来,即from信息 [search用 + 登录用]
                },
              })
            })
        },
        //页面一启动 + 每次路由跳转
        setup ({ dispatch }) {
            dispatch({ type: 'query' })
        }
    },
    effects:{
        //向后台发出登录状态查询[token值携带到header里发送]
        *query({payload},{put,call,select}){
            const token =  getCookie('token')//id + deadline
            const  receiveData  = yield call(query, token)
            const { success, user } = receiveData.data
            const { locationPathname } = yield select(_ => _.app)//从state 里获取数据
            //经后台查验
            //如果该用户已经登录
            if (success && user) {
                const { permissions } = user //后台返回的权限数组
                const visitArr = permissions.visit
                const {data} = yield call(menusService.query)
                let menu = data
                //拿着后台返回的permission 更新state的permission及menu 【用处：1.route路由网关 鉴权 2.菜单栏生成菜单
                if (permissions.role === 'admin') {
                    permissions.visit = data.map(item => item.id) //menu就是直接拿到的
                }else {// 替换menu
                    permissions.visit = visitArr //更新permision 权限数组 路由访问使用
                    //更新menu  传值给 侧栏
                    menu = data.filter((item) => {
                        const cases = [//设定满足条件
                          permissions.visit.includes(item.id),
                        ]
                        return cases.every(_ => _)//满足以上全部条件则为允许访问的菜单
                    })
                }
                yield put({
                    type: 'updateState',
                    payload: {
                      user,
                      permissions,//更新权限值  1. routes拿着权限值比对着当前路由判断是否有权限  2.菜单拿着权限生成菜单栏
                      menu
                    },
                })
                //登录成功则进入后台页面
                //if (locationPathname === '/login') {
                    //不明白为何要加这个
                    yield put(routerRedux.push({
                        pathname: '/originsee',
                    }))
                //}
            }
            //还是不懂它的未登录状态为什么不直接用else 而是else if
            else if (config.openPages && config.openPages.indexOf(locationPathname) < 0) {
                //强制跳转到登录页面
                yield put(routerRedux.push({
                    pathname: '/login',
                    search: queryString.stringify({
                        from: locationPathname,//更新from状态
                    })
                }))
            }
        },
        *logout({payload},{call,put}){
            //本地删除
            setCookie('token','',-1)
            //更新状态
            yield put({
                type: 'updateState',
                payload: {
                    user:{},
                    permissions:{
                        visit:[]
                    },
                    menu:[{
                        id:'6',
                        icon:'user-add',
                        route:'/originsee',
                        name:'普通人能看的'
                    }]
                },
            })
            yield put({ type: 'query' })
            // const data = yield call(logout, parse(payload))
            // if (data.success) {
            //     yield put({ type: 'query' })//判断登录状态  跳回登录页
            // } else {
            //     throw (data)
            // }
        }

    },
    reducers: {
        updateState (state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        }
    }

}
