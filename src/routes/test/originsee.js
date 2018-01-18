import React from 'react';
import { connect } from 'dva';


const error = function({location}){
    return (
        <div>
            <h1>普通身份能看到</h1>
        </div>
    );
}
export default connect()(error);
