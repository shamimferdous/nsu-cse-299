import { Link } from 'react-router-dom';
import styles from './AppLayout.module.scss';
import { FiSearch } from 'react-icons/fi';

const AppLayout = (props) => {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.left}>
                    <img src="/logo-typo.png" alt="" />
                    {/*<form>*/}
                    {/*    <input type="text" placeholder='Search In Drive' />*/}
                    {/*    <button>*/}
                    {/*        <FiSearch size={20} />*/}
                    {/*    </button>*/}
                    {/*</form>*/}
                </div>
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
        </>
    );
};

export default AppLayout;