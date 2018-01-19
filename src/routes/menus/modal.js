/**
 * @description 菜单配置
 */

/**
 *  @desc User的页面级容器组件 管理整个user的组件
 *      下面包含各UI组件：
 *              UserList
 *              UserSearch等
 *  @func 负责订阅数据-把数据加工传递给UI组件展示
 */
import React from 'react';
import MenuList from './menulist';
import { arrayToTree } from '../../utils/mixin'
import { connect } from 'dva';

const Menuset = ({dispatch,menus})=>{
    const {menulist} = menus
    const data = arrayToTree(menulist)
    const menuListProps = {
        data,
        onCreateItem(value){
            dispatch({
                type: 'menus/create',
                payload: value,
            })
        },
        onDeleteItem (id) {
            dispatch({
                type: 'menus/delete',
                payload: id,
            })
        },
        onEditItem (id,value) {
            dispatch({
                type: 'menus/update',
                payload: {id,value},
            })
        }
    }
    return (
        <div>
            <MenuList {...menuListProps}/>
        </div>
    )
}
// 指定订阅数据，这里关联了 user
function mapStateToProps({ menus }) {
    return {menus};
}
export default connect(mapStateToProps)(Menuset);

