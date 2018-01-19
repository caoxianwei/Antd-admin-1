import React from 'react';
import { connect } from 'dva';


const adminsee = function({location}){
    return (
        <div>
            <h1>最高权限能看到的</h1>
        </div>
    );
}
export default connect()(adminsee);
