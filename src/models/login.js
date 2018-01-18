/**
 * login的数据集市
 */
import { routerRedux } from 'dva/router'
import { login } from '../services/login'
import {setCookie} from '../utils/mixin'

export default {
  namespace: 'login',

  state: { },

  effects: {
    * login ({payload}, { put, call, select }) {
      const {data} = yield call(login, payload)
      //用于从 state 里获取数据  调用app的state[app的model为全局数据集市]
      const {cookie,success}  = data;
      //后台返回一个经过加密的id值做为token 前端存在cookie中 发送query请求验证是否登录时每次携带token[后台认证
      const { locationQuery } = yield select(_ => _.app)
      if (success) {
        setCookie('token',cookie)//过期天数为1
        const { from } = locationQuery
        yield put({ type: 'app/query' })//登录成功则触发  获得权限
        if (from && from !== '/login') {
            yield put(routerRedux.push(from))
        } else {
            yield put(routerRedux.push('/user'))
        }
      } else {//登录失败
        throw data
      }
    },
  },

}
