/**
 *  @desc  侧边菜单
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Switch } from 'antd'
import { config } from '../../utils/config'
import styles from './index.less'
import Menus from './Menu'

const Sider = ({siderFold, location, menu,}) =>{
    const menusProps = {
        menu,
        siderFold,
        location
    }
    return (
        <div>
            {siderFold ? '' : <span>{config.name}</span>}
            <Menus {...menusProps} />
        </div>
    )
}

Sider.propTypes = {
    menu: PropTypes.array,
    siderFold: PropTypes.bool,
    location: PropTypes.object
  }

export default Sider
