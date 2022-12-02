import styles from './Loader.module.scss';

const Loader = ({ height }) => {
    return (
        <div className={styles.loader} style={{ height: height ? height : '100vh' }}>
            <div className={styles.logo}>
                <img src="/loader.svg" alt="" />
            </div>
        </div>
    );
};

export default Loader;