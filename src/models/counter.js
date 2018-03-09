import key from 'keymaster';
export default {
    namespace:'counter',
    state:{
        count:0
    },
    subscriptions:{//监听键盘事件
        keyboardWatcher({dispatch}) {
            key('⌘+up, ctrl+up', () => {
                dispatch({
                    type:'counter/add',
                    payload:2
                })
            });
            key('⌘+down, ctrl+down', () => {
                dispatch({
                    type:'counter/minus',
                    payload:3
                })
            });
        }
    },
    // Reducers 的本质是修改 model 的 state
    reducers:{
        add(state,action){
            return {
                ...state,
                count:state.count + action.payload
            }
        },
        minus(state,action){
            return {
                ...state,
                count:state.count - action.payload
            }
        }
    }
}
