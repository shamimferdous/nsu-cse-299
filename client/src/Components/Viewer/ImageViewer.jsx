import styles from './ViewerStyles.module.scss';
//importing components
import { Document, Page } from 'react-pdf/dist/esm/entry.vite';
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from '../../config/axios.js';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import Loader from "../Library/Loader/Loader.jsx";

const ImageViewer = ({openImg, setOpenImg}) => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(true);
    const [img, setImg] = useState(null);



    useEffect(() => {
        let url = openImg;
        axios.get(
            url,
            {responseType: 'blob'} // !!!
        ).then((response) => {
            // window.open(URL.createObjectURL(response.data));
            setLoading(false);
            setImg(response.data)
        })
    }, []);

    return (
        <Modal
            visible={openImg ? true : false}
            centered={true}
            footer={null}
            width={'80%'}
            onCancel={() => setOpenImg(null)}
        >
            {
                loading &&
                <Loader height={'80vh'}/>
            }

            {
                img &&
                <div className={styles.pdf_viewer}>
                    {
                        img &&
                        <div>
                            <img src={window.URL.createObjectURL(img)} alt=""/>
                        </div>
                    }
                </div>
            }
        </Modal>
    );
};

export default ImageViewer;