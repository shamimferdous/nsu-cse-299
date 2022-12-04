import styles from './ViewerStyles.module.scss';
//importing components
import { Document, Page } from 'react-pdf/dist/esm/entry.vite';
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from '../../config/axios.js';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import Loader from "../Library/Loader/Loader.jsx";
import FileViewer from 'react-file-viewer';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

const ExcelViewer = ({openExcel, setOpenExcel, openEx}) => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(true);
    const [pdf, setPdf] = useState(null);
    const [docs, setDocs] = useState([]);

    const [rows, setRows] = useState([]);
    const [cols, setCols] = useState([]);

    useEffect(() => {
        console.log(openEx)
    }, []);

    function removeTextLayerOffset() {
        const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");
        textLayers.forEach(layer => {
            const {style} = layer;
            style.top = "0";
            style.left = "0";
            style.transform = "";
        });
    }


    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
        removeTextLayerOffset()
    }

    useEffect(() => {
        let url = openExcel;
        axios.get(
            url,
            {responseType: 'blob'} // !!!
        ).then((response) => {
            // window.open(URL.createObjectURL(response.data));
            setLoading(false);
            setPdf(response.data)

            ExcelRenderer(response.data, (err, resp) => {
                if (err) {
                    console.log(err);
                } else {
                    // console.log(resp);
                    setRows(resp.rows);
                    setCols(resp.cols);
                }
            });

        })
    }, []);

    return (
        <Modal
            visible={openExcel ? true : false}
            centered={true}
            footer={null}
            width={'80%'}
            onCancel={() => setOpenExcel(null)}
        >
            {
                loading &&
                <Loader height={'80vh'}/>
            }

            {
                rows.length > 0 &&
                <OutTable data={rows} columns={cols} tableClassName={styles.table_excel} tableHeaderRowClass="heading"/>
            }

        </Modal>
    );
};

export default ExcelViewer;