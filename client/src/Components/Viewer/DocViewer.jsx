import styles from './ViewerStyles.module.scss';
//importing components
import { Document, Page } from 'react-pdf/dist/esm/entry.vite';
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from '../../config/axios.js';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import Loader from "../Library/Loader/Loader.jsx";
import FileViewer from 'react-file-viewer';

const DocViewer = ({ openDoc, setOpenDoc, openEx}) => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(true);
    const [pdf, setPdf] = useState(null);
    const [docs, setDocs] = useState([]);

    useEffect(()=>{
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
        let url = openDoc;
        axios.get(
            url,
            {responseType: 'blob'} // !!!
        ).then((response) => {
            // window.open(URL.createObjectURL(response.data));
            setLoading(false);
            setPdf(response.data)
            setDocs([
                {
                    uri: 'https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx',
                    fileType: 'docx'
                }
            ])
        })
    }, []);

    return (
        <Modal
            visible={openDoc ? true : false}
            centered={true}
            footer={null}
            width={'80%'}
            onCancel={() => setOpenDoc(null)}
        >
            {
                loading &&
                <Loader height={'80vh'}/>
            }

            {
                pdf &&
                <FileViewer
                    fileType={openEx}
                    filePath={window.URL.createObjectURL(pdf)}
                />
            }


        </Modal>
    );
};

export default DocViewer;