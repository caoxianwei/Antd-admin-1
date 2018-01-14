/**
 * @desc 用户数据集列表
 */
import { query } from '../services/user';
export default {
    namespace:'user',
    state:{
        list: [],
        total: null,
        loading: false, // 控制加载状态
        current: null, // 当前分页信息
        currentItem: {}, // 当前操作的用户对象
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
            const { data } = yield call(query);//触发向后端发送数据 [call:调用执行一个函数]
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
        *create(){},
        *'delete'(){},//删除是关键字
        *update(){},
    },
    // Reducers 的本质是修改 model 的 state
    reducers:{
        showLoading(){}, // 控制加载状态的 reducer
        showModal(){}, // 控制 Modal 显示状态的 reducer
        hideModal(){},
        querySuccess(state,action){//获取数据
            //模拟数据
            /*
            const mock = {
                total: 3,
                current: 1,
                loading: false,
                list:[{
                    name: '张三',
                    gender: '男',
                    role: '游客',
                    creattime:'2018/1/12 8：00'
                },{
                    name: '李四',
                    gender: '女',
                    role: '管理员',
                    creattime:'2018/1/13 8：00'
                },{
                    name: '王麻子',
                    gender: '男',
                    role: '超级管理员',
                    creattime:'2018/1/13 18：00'
                },{
                    name: '张三1111',
                    gender: '男',
                    role: '游客',
                    creattime:'2018/1/12 8：00'
                },{
                    name: '李四222',
                    gender: '女',
                    role: '管理员',
                    creattime:'2018/1/13 8：00'
                },{
                    name: '王麻子333',
                    gender: '男',
                    role: '超级管理员',
                    creattime:'2018/1/13 18：00'
                }]
            }*/
            //return {...state, ...mock, loading: false};
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
