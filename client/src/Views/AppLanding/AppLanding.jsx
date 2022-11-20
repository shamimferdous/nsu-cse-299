import {Col, Row} from 'antd';
import AppLayout from "../../Components/AppLayout/AppLayout.jsx";
import styles from './AppLanding.module.scss';
import { useEffect, useState } from "react";

import {FaHdd, FaTrashAlt} from 'react-icons/fa';
import {HiClock} from 'react-icons/hi';
import {FiSearch} from "react-icons/fi";
import {Affix, Select, Button} from "antd";
import DriveView from "../../Components/DriveView/DriveView.jsx";
import {SlPlus} from 'react-icons/sl';
import FileUpload from "../../Components/FileUpload/FileUpload.jsx";
import axios from "../../config/axios.js";

const AppLanding = (props) => {

    const [top, setTop] = useState(100);
    const [uploadModalVisibility, setUploadModalVisibility] = useState(false);
    const [refresh, setRefresh] = useState(null);


    useEffect(()=>{
        axios.get('/users/v1/authenticate', {withCredentials: true}).then(response=>{
            console.log(response.data);
        }).catch(error=>{
            props.history.push('/');
        })
    }, []);

    return (
        <AppLayout>
            <section style={{width: '100%', marginTop: '2rem'}}>
                <Row>
                    <Col span={6} style={{position: 'relative'}}>
                        <Affix offsetTop={top}>
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
                        </Affix>
                    </Col>
                    <Col span={18}>
                        <div style={{padding: '0 2rem'}}>
                            <div className={styles.filter}>
                                <form>
                                    <input type="text" placeholder='Search In Drive'/>
                                    <button>
                                        <FiSearch size={20}/>
                                    </button>
                                </form>
                                <div>
                                    <Button
                                        onClick={()=>setUploadModalVisibility(true)}
                                        style={{display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: 'var(--color-primary)'}}
                                    >
                                        <SlPlus size={20} color={'var(--color-primary)'} style={{marginRight: '.5rem'}} />
                                        <span style={{color: 'var(--color-primary)'}}>New</span>
                                    </Button>
                                </div>
                            </div>
                            <DriveView refresh={refresh} />
                        </div>
                    </Col>
                </Row>
            </section>
            {
                uploadModalVisibility &&
                <FileUpload
                    uploadModalVisibility={uploadModalVisibility}
                    setUploadModalVisibility={setUploadModalVisibility}
                    setRefresh={setRefresh}
                />
            }
        </AppLayout>
    );
};

export default AppLanding;