import React, {Component} from 'react';


 //返回被包裹组件的原有名称 即在被高阶组件包裹之后应当保留其原有名称
const getDisplayName = (component)=>{
    return component.displayName || component.name || 'Component';
}


// 高阶组件
// 该函数接受一个子组件作为其中的一个参数，并从数据源订阅数据作为props属性传入子组件
function withSubscription(WrappedComponent, selectData) {
    // ……返回另一个新组件……
    return class HOC extends Component {
      static displayName = `HOC(${getDisplayName(WrappedComponent)})`
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          data: selectData(DataSource, props)
        };
      }

      componentDidMount() {
        // ……注意订阅数据……
        DataSource.addChangeListener(this.handleChange);
      }

      componentWillUnmount() {
        DataSource.removeChangeListener(this.handleChange);
      }

      handleChange() {
        this.setState({
          data: selectData(DataSource, this.props)
        });
      }

      render() {
        // ……使用最新的数据渲染组件
        // 注意此处将已有的props属性传递给原组件
        return(
            <div>
                <div className="demo-header">
                    我是toolbar
                </div>
                <WrappedComponent data={this.state.data} {...this.props} />
            </div>
        )
      }
    };
  }


const CommentListWithSubscription = withSubscription(
    CommentList,
    (DataSource) => DataSource.getComments()
);

  const BlogPostWithSubscription = withSubscription(
    BlogPost,
    (DataSource, props) => DataSource.getBlogPost(props.id)
  );

/*
  当 CommentListWithSubscription 和 BlogPostWithSubscription 渲染时,
  会向CommentList 和 BlogPost 传递一个 data props属性，
  该 data属性的数据包含了从 DataSource 检索的最新数据：
*/




/**
 *  @desc 高阶组件的方式重写高水
 *   1. 高阶组件可代替包裹组件获取远程数据 并将其值作为props传给包裹组件
 *   4. 两个类似组件的相同逻辑剥离：官网例子
 *   2. 基于属性代理：不干扰包裹组件 提取共有部分 如公共标题 全局的复制组件
 *   3. 反向继承的： 决定包裹组件的渲染方式 甚至UI组织方式？ Loading组件
 *
 */

//高阶组件实例


/**
 *  高阶组件：传入一个组件返回一个新的组件，实现不同组件的逻辑复用，
 *  将一些可以单独处理的逻辑抽离返回给新的组件复用
 *  然后将单独的组件传递给新的组件。
 */









/**
 * 高阶组件解决交叉问题
 * Commonlist组件：从外部数据源订阅数据并渲染评论列表
 *       "DataSource" 就是全局的数据源
 *     componentDidMount //当组件挂载时
 *     componentWillUnmount //当组件卸载时候
 *     监听函数
 * 无论是评论列表还是单个组件文章组件，都会有以下几个步骤：【相当于容器组件的中负责数据订阅】
 *      组件挂载时：添加事件处理函数(handleChange)订阅数据【相当于effec 发送异步请求
 *      监听函数handleChange：每当数据源发生改变则调用setState函数设置新的数据
 *      卸载组件：移出监听函数
 *
 * 思考：
 *  在一个大型的应用中，这种从 DataSource 订阅数据并调用 setState 的模式将会一次又一次的发生。
 *  我们就可以抽象出一个模式，该模式允许我们在一个地方[定义逻辑]并且能对所有的组件使用，
 *  【这怎么感觉是。。。。。model层。。异步处理逻辑等 还专门使用了命名空间namespace】
 *  这就是高阶组件的精华所在
 */
