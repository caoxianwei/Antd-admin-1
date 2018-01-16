/**
 * @desc 用户数据集列表
 */

import * as usersService from '../services/user';

export default {
    namespace:'user',
    state:{
        list: [],
        total: null,
        loading: false, // 控制加载状态
        current: null, // 当前分页信息
        modalVisible: false, // 弹出窗的显示状态
        modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）
    },
    subscriptions:{//订阅数据源 ->路由信息
        setup({ dispatch, history }) {
            return history.listen(location => {
              if (location.pathname === '/user') {
                dispatch({ //发出action
                  type: 'query',
                  payload: {}
                });
              }
            });
        }
    },
    // Effects 主要是 控制数据流程
    effects:{//异步
        *query({ payload }, { select, call, put }){
            const { data } = yield call(usersService.query);//触发向后端发送数据 [call:调用执行一个函数]
            if(data.success){
                let rev = data.result;
                yield put({//在 Effects 中会调用 Reducers。 相当于 dispatch 执行一个 action
                    type: 'querySuccess',
                    payload: {
                        current: rev.current,
                        list:rev.list,
                        loading:rev.loading,
                        total:rev.total
                    }
                });
            }
        },
        *create({ payload:values }, { call, put }){
            const data = yield call(usersService.create, values)
            if (data.success) {
                yield put({ type: 'reload' })
              } else {
                throw data
            }
        },
        *'delete'({payload:id},{call,put}){//删除是关键字
            yield call(usersService.remove, id);
            yield put({ type: 'reload' });
        },
        *update({ payload: { id, value} }, { select, call, put }){
            yield call(usersService.update, id, value);
            yield put({ type: 'reload' });
        },
        *reload(action, { put, select }){//刷新
            const page = yield select(state => state.user.current);
            yield put({ type: 'query', payload: {page} });
        }
    },
    // Reducers 的本质是修改 model 的 state
    reducers:{
        showLoading(){}, // 控制加载状态的 reducer
        showModal(){}, // 控制 Modal 显示状态的 reducer
        hideModal(){},
        querySuccess(state,action){//获取数据
            return {...state, ...action.payload, loading: false}
        },
        createSuccess(){//新增
        },
        deleteSuccess(){//删除

        },
        updateSuccess(){//更新

        }
    }
}
