import styles from './ViewerStyles.module.scss';
//importing components

import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from '../../config/axios.js';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import Loader from "../Library/Loader/Loader.jsx";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";


const PdfViewer = ({openPdf, setOpenPdf, openEx}) => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(true);
    const [pdf, setPdf] = useState(null);
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        console.log(openPdf)
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
        let url = openPdf;
        axios.get(
            url,
            {responseType: 'blob'} // !!!
        ).then((response) => {
            // window.open(URL.createObjectURL(response.data));
            setLoading(false);
            setPdf(response.data)
            setDocs([
                {
                    uri: URL.createObjectURL(response.data),
                }
            ])
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
                docs.length > 0 &&
                <DocViewer documents={docs} pluginRenderers={DocViewerRenderers}/>
            }


        </Modal>
    );
};

export default PdfViewer;