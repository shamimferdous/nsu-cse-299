import styles from './ViewerStyles.module.scss';
//importing components
import { Document, Page } from 'react-pdf/dist/esm/entry.vite';
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from '../../config/axios.js';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import Loader from "../Library/Loader/Loader.jsx";

const PdfViewer = ({openPdf, setOpenPdf}) => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(true);
    const [pdf, setPdf] = useState(null);

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
        let url = openPdf;
        axios.get(
            url,
            {responseType: 'blob'} // !!!
        ).then((response) => {
            // window.open(URL.createObjectURL(response.data));
            setLoading(false);
            setPdf(response.data)
        })
    }, []);

    return (
        <Modal
            visible={openPdf ? true : false}
            centered={true}
            footer={null}
            width={'80%'}
            onCancel={() => setOpenPdf(null)}
        >
            {
                loading &&
                <Loader height={'80vh'}/>
            }

            {
                pdf &&
                <div className={styles.btn_wrapper}>
                    <div className={styles.btn_box}>
                        <Button disabled={pageNumber === 1} onClick={() => setPageNumber(pageNumber - 1)}>
                            <BsChevronLeft color={'var(--color-primary)'}/>
                        </Button>
                        <Button disabled={pageNumber === numPages} onClick={() => setPageNumber(pageNumber + 1)}>
                            <BsChevronRight color={'var(--color-primary)'}/>
                        </Button>
                    </div>
                </div>
            }
            {
                pdf &&
                <div className={styles.pdf_viewer}>
                    {
                        pdf &&
                        <div>
                            <Document file={window.URL.createObjectURL(pdf)} onLoadSuccess={onDocumentLoadSuccess}>
                                <Page height={900} pageNumber={pageNumber}/>
                            </Document>
                        </div>
                    }
                </div>
            }
        </Modal>
    );
};

export default PdfViewer;