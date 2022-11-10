import {Col, Row} from 'antd';
import AppLayout from "../../Components/AppLayout/AppLayout.jsx";
import styles from './AppLanding.module.scss';

import {FaHdd, FaTrashAlt} from 'react-icons/fa';
import {HiClock} from 'react-icons/hi';
import {FiSearch} from "react-icons/fi";
import {Select} from "antd/es";

const AppLanding = () => {
    return (
        <AppLayout>
            <section style={{width: '100%', marginTop: '2rem'}}>
                <Row>
                    <Col span={6}>
                        <ul className={styles.sidebar}>
                            <li className={styles.active}>
                                <FaHdd size={20}/>
                                <span>My Drive</span>
                            </li>
                            <li>
                                <HiClock size={20}/>
                                <span>Recently Viewed</span>
                            </li>
                            <li>
                                <FaTrashAlt size={20}/>
                                <span>Trash</span>
                            </li>
                        </ul>
                    </Col>
                    <Col span={18}>
                        <div>
                            <div className={styles.filter}>
                                <form>
                                    <input type="text" placeholder='Search In Drive'/>
                                    <button>
                                        <FiSearch size={20}/>
                                    </button>
                                </form>
                                <div>
                                    <Select placeholder={'Sort'} bordered={true} style={{width: '150px'}}>
                                        <Select.Option value={'last-modified-asc'}>Last Modified - Asc</Select.Option>
                                        <Select.Option value={'last-modified-desc'}>Last Modified - Desc</Select.Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
        </AppLayout>
    );
};

export default AppLanding;