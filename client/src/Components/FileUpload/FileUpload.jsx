import { InboxOutlined } from '@ant-design/icons';
import { message, Modal, Upload } from 'antd';
import axios from '../../config/axios.js';

const FileUpload = ({uploadModalVisibility, setUploadModalVisibility, setRefresh}) => {


    const {Dragger} = Upload;
    const props = {
        name: 'file',
        multiple: true,
        onChange(info) {
            const {status} = info.file;
            console.log(status);
            console.log(info.file);
            // info.fileList.forEach(fileItem => {
            if (status !== 'uploading') {
                let formData = new FormData();
                formData.append('file', info.file.originFileObj);
                axios.post('/drive/v1/upload', formData, {withCredentials: true}).then(response => {
                    message.success(`${info.file.name} file uploaded successfully.`);
                    setRefresh(Math.random());
                }).catch(error => {
                    message.error(`${info.file.name} file upload failed.`);
                })
            }
            // })
        },
        onDrop(e) {
            // console.log('dropped thingss')
            // console.log('Dropped files', e.dataTransfer.files);
            // console.log(typeof (e.dataTransfer.files))
            // e.dataTransfer.files.forEach(file=>{
            //     console.log('this is file:')
            // })
        },
    };

    return (
        <Modal
            visible={true}
            centered={true}
            footer={null}
            onCancel={() => {
                setUploadModalVisibility(false);
                setRefresh(Math.random());
            }}
        >
            <Dragger {...props} style={{marginTop: '2rem'}}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                </p>
            </Dragger>
        </Modal>
    )
};
export default FileUpload;