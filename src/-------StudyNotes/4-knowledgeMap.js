/**
 * dva 知识导图
 */


 //1.ES6
    /*
        变量声明
            const 和 let
            模板字符串
            默认参数
        箭头函数 => 函数的快捷写法
            1.不需要通过 function 关键字创建函数
            2.可以省略 return 关键字
            3.箭头函数还会继承当前上下文的 this 关键字 (无需bind(this))
        模块的 Import 和 Export
        ES6 对象和数组
            析构赋值
                析构赋值让我们从 Object 或 Array 里取部分数据存为变量
                    const { name, age } = user;
                    //析构传入的函数参数
                    const add = (state, { payload }//析构传入的函数参数s  ) => {
                        return state.concat(payload);
                    };
                    //析构时还可以配 alias，让代码更具有语义
                    const add = (state, { payload: todo }) => {...}
            对象字面量改进
                    析构的反向操作，用于重新组织一个 Objects
            Spread Operator即...
                    
        Promises
            Promise 用于更优雅地处理异步请求
                未用promise：
                    fetch('/api/todos')
                        .then(res => res.json())
                        .then(data => ({ data }))
                        .catch(err => ({ err }));
                用promise优雅地异步
                    const delay = (timeout) => {
                        return new Promise(resolve => {
                            setTimeout(resolve, timeout);
                        });
                    };
                    delay(1000).then(_ => {
                        console.log('executed');
                    });
                    
        Generators
            dva 的 effects 是通过 generator 组织的。Generator 返回的是迭代器，通过 yield 关键字实现暂停功能ss
            effects: {
                *addRemote({ payload: todo }, { put, call }) {
                    yield call(addTodo, todo);
                    yield put({ type: 'add', payload: todo });
                    //通过 yield 把异步逻辑通过同步的方式组织起来
                },
            },
    */
 //2.React Component
    /*
        Stateless Functional Components
            React Component 有 3 种定义方式:
                React.createClass
                class 和 Stateless 
                Functional Component /推荐尽量使用最后一种，保持简洁和无状态
                //这是函数，不是 Object，没有 this 作用域，是 pure function

        
        JSX
            Component 嵌套
            className
            JavaScript 表达式
            Mapping Arrays to JSX //可以把数组映射为 JSX 元素列表
                <ul>
                    { 
                        this.props.todos.map((todo, i) =>
                            <li key={i}>{todo}</li>
                        ) 
                    }
                </ul>
            注释
            Spread Attributes
            //这是 JSX 从 ECMAScript6 借鉴过来的很有用的特性，用于扩充组件 props 
            const attrs = {
                href: 'http://example.org',
                target: '_blank',
            };
            <a {...attrs}>Hello</a>//<a href={attrs.href} target={attrs.target}>Hello</a>
        Props
            propTypes
                //JavaScript 是弱类型语言，所以请尽量声明 propTypes 对 props 进行校验，以减少不必要的问题s
            往下传数据
            往上传数据
        CSS Modules
            理解 CSS Modules
            定义全局 CSS
            classnames Package
                //在一些复杂的场景中，一个元素可能对应多个 className，
                //而每个 className 又基于一些条件来决定是否出现。这时，classnames 这个库就非常有用
     */


 //3.Reducer
 //4.Effect
    /*
        put:
            //用于触发 action 
            yield put({ type: 'todos/add', payload: 'Learn Dva' });
        call:
            //用于调用异步逻辑，支持 promise 
            const result = yield call(fetch, '/todos');
        select:
            //用于从 state 里获取数据
            const todos = yield select(state => state.todos);
    */

//错误处理
    /*
        全局错误处理
            dva 里，effects 和 subscriptions 的抛错全部会走 onError hook，所以可以在 onError 里统一处理错误。
            const app = dva({
                onError(e, dispatch) {
                    console.log(e.message);
                },
            });

        本地错误处理
            如果需要对某些 effects 的错误进行特殊处理，需要在 effect 内部加 try catch s

    */
//异步请求
    //异步请求基于 whatwg-fetch

//5.Subscription
    //异步数据初始化
        //当用户进入 /users 页面时，触发 action users/fetch 加载用户数据
    //path-to-regexp Package
        //如果 url 规则比较复杂，比如 /users/:userId/search，那么匹配和 userId 的获取都会比较麻烦
        //推荐用 path-to-regexp 简化这部分逻辑。

//6.Router
    //connect连接数据
    //基于 action 进行页面跳转 push(location)
//7.dva 配置
//8.工具


