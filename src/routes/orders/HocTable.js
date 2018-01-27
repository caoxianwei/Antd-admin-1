/**
 *  @desc  高阶组件
 *  @func  1.模板工厂-2.反向继承
 *  1.模板工厂控制流程： 组件挂载则订阅数据源 数据卸载则取消订阅 数据变化则更新state值
 *                      将state值当作props传给子组件
 *  2.反向继承：当有权限时则渲染toolbar 并且根据不同的权限数组生成不同的toolbar 添加到子组件中
 */

import React, {Component} from 'react';


 //返回被包裹组件的原有名称 即在被高阶组件包裹之后应当保留其原有名称
 const getDisplayName = (component)=>{
    return component.displayName || component.name || 'Component';
}

const  HocTable = (WrappedComponent, selectData) => {
    // ……返回另一个新组件……
    return class HOC extends Component {
        static displayName = `HOC(${getDisplayName(WrappedComponent)})`
        constructor(props) {
            super(props);
            //this.handleChange = this.handleChange.bind(this);
            this.state = {
                //data: selectData(DataSource, props)
                originList:null
            };
        }

        componentDidMount() {
            // ……注意订阅数据……
            //DataSource.addChangeListener(this.handleChange);
            fetch("http://222.196.35.35:9080/GSMS/logistics/originalorder/next.do?ID=50")
            .then(r => r.json())
            .then(originList => {
                    this.setState({originList})
                }
            )
        }

        componentWillUnmount() {
            //DataSource.removeChangeListener(this.handleChange);
        }

        // handleChange() {
        //     this.setState({
        //         //data: selectData(DataSource, this.props)
        //     });
        // }

        render() {
            // ……使用最新的数据渲染组件
            // 注意此处将已有的props属性传递给原组件
            return(
                <div>
                    <div className="demo-header">
                        我是toolbar
                    </div>
                    <WrappedComponent data={this.state.originList} {...this.props} />
                </div>
            )
        }
    };
  }

  export default HocTable
