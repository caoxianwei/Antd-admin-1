import styles from './index.less';
import Header from './Header';

const MainLayout = function({children,location}){
    return (
        <div className={styles.normal}>
            <Header location={location} />
            <div className={styles.content}>
                <div className={styles.main}>
                    {children}
                </div>
            </div>
      </div>
    );
}


export default MainLayout;

