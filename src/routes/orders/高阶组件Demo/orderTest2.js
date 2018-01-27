/**
 * @description 高阶组件
 */
import React, {Component} from 'react';


 //返回被包裹组件的原有名称 即在被高阶组件包裹之后应当保留其原有名称
const getDisplayName = (component)=>{
    return component.displayName || component.name || 'Component';
}

 //高阶组件 这个就相当于一个公共类？ 封装并抽离组件的通用逻辑，让此部分逻辑在组件间更好地被复用
 //通过做一些操作，将被包裹组件的props和新生成的props一起传递给此组件，这称之为属性代理
 const withHeader = (WrappedComponent)=>{
    return class HOC extends Component {
        static displayName = `HOC(${getDisplayName(WrappedComponent)})`
        render() {
            const newProps = {
                test:'hoc'
            }
            return(
                <div>
                    <div className="demo-header">
                        我是标题
                    </div>
                    <WrappedComponent {...this.props} {...newProps}/>
                </div>
            )
        }
    }
 }
//这种方式返回的React组件继承了被传入的组件，所以它能够访问到的区域、权限更多，
//相比属性代理方式，它更像打入组织内部，对其进行修改

//组合多个高阶组件 如我此子组件既需要标题又需要loading [compose 函数式编程的compose]

const Demo = ({test})=>{
    console.log(test)//hoc
    return (
        <div>
            我是一个普通组件
        </div>
    );
}


const EnhanceDemo = withHeader(Demo);

export default EnhanceDemo;


/**
 *  高阶组件：
 *
 *
 *
 *  基于属性代理和基于反向继承
 *  1. 基于反向继承 Inheritance Inversion
 *      Loading组件作为高阶组件 需要拦截子组件的渲染过程
 *      这种方式返回的react组件继承了被包裹的组件【父类组件返回的组件继承子组件 所以叫反继承
 *      为啥反继承？ 正因为反继承所以可以访问的区域数据更多 甚至可以修改被包裹组件的内部状态
 *      高阶组件继承（extends）WrappedComponent。
 *
 *      渲染劫持（Render Highjacking）
 *          『读取、添加、修改、删除』任何一个将被渲染的 React Element 的 props
            在渲染方法中读取或更改 React Elements tree，也就是 WrappedComponent 的 children
            根据条件不同，选择性的渲染子树
            给子树里的元素变更样式
        操作 state
 *
 *
 *  2. 基于属性代理 Props Proxy
 *         无需改变子组件内部的展示方式，只在外围增加功能 则属性代理 如复制组件
 *         高阶组件操控传递给 WrappedComponent 的 props
 *
 *      更改 props：
 *          可以『读取，添加，修改，删除』将要传递给 WrappedComponent 的 props，在修改或删除
 *          重要 props 的时候要小心，你可能应该给高阶组件的 props 指定命名空间（namespace），
 *          以防破坏从外传递给 WrappedComponent 的 props
 *      通过 refs 获取组件实例
 *      抽象 state
 *           向 WrappedComponent 传递 props 和 callbacks（回调函数）来抽象 state，类似与
 *           容器组件和木偶组件设计思路
 *
 *
 *  高阶组件与父组件区别【虽然我之前一直称呼的是父类组件。。
 *      高阶组件作为一个函数，它可以更加纯粹地关注业务逻辑层面的代码，比如数据处理，数据校验，发送请求等，
 *      可以改善目前代码里业务逻辑和UI逻辑混杂在一起的现状。
 *
 *
 *
*/

/**
 *  Refs
 *      在典型的 React 数据流中, 属性（props）是父组件与子代交互的唯一方式。
 *      要修改子组件，你需要使用新的 props 重新渲染它。但是，某些情况下你需要在典型数据流外强制修改子代。
 *      要修改的子代可以是 React 组件实例，也可以是 DOM 元素。对于这两种情况，React 提供了解决办法。
 *
 *      处理焦点、文本选择或媒体控制。
        触发强制动画。
        集成第三方 DOM 库

    为类组件添加 Ref
        当 ref 属性用于使用 class 声明的自定义组件时，ref 的回调接收的是已经加载的 React 实例
        不能在函数式组件上使用 ref 属性，因为它们没有实例
 */

 /**
  *  受控组件和非受控组件
        受控组件：
            像<input>,<textarea>, 和 <select>这类表单元素会维持自身状态，并根据用户输入进行更新。
        但在React中，可变的状态通常保存在组件的状态属性中，并且只能用 setState(). 方法进行更新.
        通过使react变成一种单一数据源的状态来结合二者:
        React负责渲染表单的组件仍然控制用户后续输入时所发生的变化。相应的，其值由React控制的输入表单元素称为“受控组件”

        非受控组件：
            要编写一个非受控组件，而非为每个状态更新编写事件处理程序，你可以 使用 ref 从 DOM 获取表单值

*/
