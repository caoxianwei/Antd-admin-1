const HoC = (WrappedComponent) => {
    const WrappingComponent = (props) => (
        <div className="foo">
            <WrappedCompoent {...props} />
        </div>
    );
    return WrappingComponent;
};


const HoC = (WrappedComponent) => {
    class WrappingComponent extends WrappendComponent {
        render() (
            const {user, ...otherProps} = this.props;
            this.props = otherProps;
            return super.render();
        }
    }
    return WrappingComponent;
};



const HoC = (WrappedComponent, LoginView) => {
    const WrappingComponent = () => {
         const {user} = this.props;
         if (user) {
            return <WrappedComponent {...this.props} />
         } else {
            return <LoginView {...this.props} />
         }
    };
    return WrappingComponent;
};



/**
 *  高阶组件可以为输入的原始组件增加新的功能，
 *  也非常适合处理一些每个组件都需要去做的重复性工作，比如获取数据并将获得的数据传递下去
 *
 *  另一方面，为了使高阶组件具有更强的可复用性，Andrew 并不建议开发者去写一些本身非常复杂的高阶组件，
 *   而是建议将许多简单的高阶组件复合使用以达到实现复杂功能的目的。
 *
 * 一个高阶组件库 ： https://github.com/acdlite/recompose
 *
 * 扩展阅读
 *                          https://zhuanlan.zhihu.com/p/22054582
 *       React高阶组件实践   https://zhuanlan.zhihu.com/p/29250138
 *
 */


 /**
  *     Hoc可以做的事：
            扩展受控组件

            页面复用：https://zhuanlan.zhihu.com/p/29250138
                两个UI交互相同的页面 就是数据来源不同及一些文案不同
            两个表单 表单A和表单B
                    相同的： filter search footer
                    不同的： 一些文案，
                于是：
                    相同的地方： shoplist  获得数据展示 ==》 componnet组件
                    不同的：shoplista  自定义属性：message：我是a类订单
                                将自定义属性和获取a类订单数据的方法（或者api）作为参数传入 HOC组件
                                【hoc组件将api拿到请求数据及定制的默认msg一起封装好，返回新组件】

                综上：UI 级别 + 些微逻辑的复用
                    AB是两个相同但些微细节不同的组件。
                    我们可以将其公共UI抽离出来。允许AB组件在公共UI上进行自定义


                需要的组件:
                    components/ShopList.jsx
                    common/shopListWithFetching.jsx  //高阶组件 (公共UI组件底料 自定义东西 及传入方法)

                    page/SholistA.jsx
                    page/SholistB.jsx

                HOC =  Decorators + Components
                    逻辑抽象为多个Decorators

        组合式意图打破这种关联，寻求单元化，通过颗粒度更细的基础组件与抽象组件共有交互与业务逻辑的 Decorator，
        使组件更灵活，更易扩展，也使开发者能够完成对于基础组件的自由支配。

        https://zhuanlan.zhihu.com/p/22054582
        https://github.com/Penggggg/react-composed-component-demo
        有个待讨论的问题：
            组件将接收到的props传给子组件时
                有什么高效的方法 区分哪个子组件需要哪一些属性？
                        【1.区分组件需要哪些属性(后台传来一系列)
                        【父组件区分哪个子组件需要的属性
                        解决这两个问题则可以实现不同api 相同表格的问题了
  */


/**
 *  可以做的：
 *  1.
 *      toolbar 根据子组件定制 判断是否需要toolbar栏 如果需要且权限足够
 *          则生成toolbar【反继承】因为需要读取子组件的state并清空它
 *      关于toolbar 每个订单的toolbar又不一样 涉及到不同的toolbar请求
 *
 *  2. 两个订单有点点不一样 但页面结构相同的 可以使用shoplist方法进行 抽减
 *          【至少可以把控制两个页面组成的js文件去掉】
 *
 *
 *  3. 逻辑层复写
 *          在HOC中又专门分离一块写逻辑的 decorator组件[装饰器设计模式 + es7模拟实现]
 *              即：高阶组件 = 复用的逻辑组件 + 复用的UI
 *                  加工过程： 给我亚当，还你一个身穿盔甲且充满战斗力的钢铁侠 🐸
 *              逻辑的：
 *                  公共逻辑块如调用不同api从远程获取数据： fetchdata
 *                  业务逻辑块：上张下张可公用的部分 【给每个按钮添加事件
 *
 */
