import React from 'react';
import { connect } from 'dva';
import styles from './index.less';


const error = function({location}){
    return (
        <div className={styles.normal}>
            <h1>Ooooops! something went wrong!</h1>
        </div>
    );
}
export default connect()(error);
