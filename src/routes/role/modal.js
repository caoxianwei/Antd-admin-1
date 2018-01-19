/**
 * @description 菜单配置
 */

import React from 'react';
import { connect } from 'dva';


const roleset = function({location}){
    return (
        <div>
            <h1>权限配置</h1>
        </div>
    );
}
export default connect()(roleset);
