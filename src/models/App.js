/**
 * @desc 主数据集 其余数据集继承于它
 */
import { routerRedux } from 'dva/router'
import { parse } from 'qs'//退出登录
import { query, logout } from 'services/app'// query某个用户具体信息
//import * as menusService from 'services/menus'// query 提供获取菜单列表
import config from 'config'
export default {
    namespace: 'app',
    state:{
        user:{},
        permission:{
            visit:[]
        },
        menu:[{
            id:1,
            name:'Dashboard',
            router:'/dashboard'
        }],
        locationPathname: '', //当前路径
        locationQuery: {},//from 判断上个路由
    },
    subscriptions:{
        setupHistory ({ dispatch, history }) {
            history.listen((location) => {
              dispatch({
                type: 'updateState',//每次路由变化便发出action触发reducer去更新路由路径和上次路由信息
                payload: {
                  locationPathname: location.pathname,
                  //locationQuery: queryString.parse(location.search),
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
            const { success, user } = yield call(query, payload)
            const { locationPathname } = yield select(_ => _.app)//用于从 state 里获取数据
            //经后台查验
            //如果该用户已经登录
            if (success && user) {
                console.log('这是不可能的 = = ')
            }
            //为什么不用else 而是用 else if? 而且它里面的判断语句又这么奇怪..
            else if (config.openPages&& config.openPages.indexOf(locationPathname) < 0) {
                //强制跳转到登录页面
                yield put(routerRedux.push({
                    pathname: '/login',
                    // search: queryString.stringify({
                    //   from: locationPathname,
                    // }),
                }))
            }
        },
        *logout({payload},{call,put}){
            const data = yield call(logout, parse(payload))
            if (data.success) {
                yield put({ type: 'query' })//判断登录状态  跳回登录页
            } else {
                throw (data)
            }
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
