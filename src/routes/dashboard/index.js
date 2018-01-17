import React from 'react';
import { connect } from 'dva';


const Dashboard = function({dashboard}){
    return (
        <div>
            <h1>I am Dashboard!</h1>
        </div>
    );
}
export default connect(({ dashboard }) => ({ dashboard }))(Dashboard)
