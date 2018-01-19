/**
 *  @desc 菜单配置
 */
/**
 *   @desc menus 数据集市
 */
import * as menuService from '../services/menus';

export default {
    namespace:'menus',
    state:{
        menulist: [],
    },
    subscriptions:{//订阅数据源 ->路由信息
        setup({ dispatch, history }) {
            return history.listen(location => {
              if (location.pathname === '/menuset') {
                dispatch({ //发出action
                    type: 'query',
                    payload: {}
                });
              }
            });
        }
    },
    effects:{
        *query({ payload }, { select, call, put }){
            const { data } = yield call(menuService.query);
            if(data){
                yield put({
                    type: 'querySuccess',
                    payload: {
                        menulist:data,
                    }
                });
            }
        },
        *create({ payload:values }, { call, put }){
            const data = yield call(menuService.create, values)
            if (data.data.success) {
                yield put({ type: 'reload' })
              } else {
                throw data
            }
        },
        *'delete'({payload:id},{call,put}){//删除是关键字
            yield call(menuService.remove, id);
            yield put({ type: 'reload' });
        },
        *update({ payload: { id, value} }, { select, call, put }){
            yield call(menuService.update, id, value);
            yield put({ type: 'reload' });
        },
        *reload(action, { put, select }){//刷新
            //const page = yield select(state => state.user.current);
            yield put({ type: 'query'});
            yield put({type:'app/query'})//更新侧栏菜单
        }
    },
    // Reducers 的本质是修改 model 的 state
    reducers:{
        querySuccess(state,action){//获取数据
            return {...state, ...action.payload}
        }
    }
}
