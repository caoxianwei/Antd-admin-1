import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/Layout/index';
import styles from './index.less';


const error = function({location}){
    return (
        <MainLayout location={location}>
          <div className={styles.normal}>
                <h1>Ooooops! something went wrong!</h1>
          </div>
        </MainLayout>
    );
}
export default connect()(error);
