import React from 'react';
import { connect } from 'dva';


const error = function({location}){
    return (
        <div>
            <h1>开发者能看的</h1>
        </div>
    );
}
export default connect()(error);
