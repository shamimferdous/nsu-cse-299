import { Link } from 'react-router-dom';
import styles from './AppLayout.module.scss';

const AppLayout = (props) => {
    return (
        <div>
            <header className={styles.header}>
                <img src="/logo-typo.png" alt="" />
                <ul>
                    <li>
                        <Link to={"/"}>Privacy Policy</Link>
                    </li>
                    <li>
                        <Link to={"/"}>Terms of Service</Link>
                    </li>
                </ul>
            </header>

            <main className={styles.main}>
                {props.children}
            </main>
        </div>
    );
};

export default AppLayout;