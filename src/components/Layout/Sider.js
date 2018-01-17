/**
 *  @desc  侧边菜单
 */

import React from 'react'
import PropTypes from 'prop-types'
//import { Icon, Switch } from 'antd'
import { config } from '../../utils/index'
import styles from './Layout.less'//logo switch
import Menus from './Menu'

const Sider = ({siderFold, location, menu,}) =>{
    const menusProps = {
        menu,
        siderFold,
        location
    }
    return (
        <div>
            <div className={styles.logo}>
                <h3>😉</h3>
                {siderFold ? '' : <span>{config.name}</span>}
            </div>
            <Menus {...menusProps} />
        </div>
    )
}

// Sider.propTypes = {
//     menu: PropTypes.array,
//     siderFold: PropTypes.bool,
//     location: PropTypes.object
//   }

export default Sider
