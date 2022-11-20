import { Button, Table } from "antd";
// import {files} from "./data.js";
import { FileIcon, defaultStyles } from 'react-file-icon';
import { BsDownload } from 'react-icons/bs';
import moment from "moment";
import { useEffect, useState } from "react";
import axios from '../../config/axios.js';

const DriveView = ({refresh}) => {

    const [files, setFiles] = useState([]);
    useEffect(() => {
        console.log('getting all files')
        axios.get('/drive/v1/files/all', {withCredentials: true}).then(response => {
            console.log(response.data);
            setFiles(response.data.files);
        })
    }, [refresh]);

    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (value) => <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{width: '30px'}}>
                    <FileIcon extension={value.split('.')[1]} {...defaultStyles[value.split('.')[1]]} />
                </div>
                <span style={{marginLeft: '1rem'}}>{value}</span>
            </div>
        },
        {
            title: 'Size',
            dataIndex: 'size',
            sorter: (a, b) => a.size - b.size,
            render: (value) => <span>{bytesToSize(value)}</span>
        },
        {
            title: 'Last Modified',
            dataIndex: 'createdAt',
            sorter: (a, b) => (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix()
        },
        {
            title: 'Actions',
            render: (value, item) => <a href={`http://localhost:5000/api/drive/v1/download/${item.drive_id}`}
                                        target={'_blank'}>
                <Button type={'primary'}>
                    <BsDownload size={15}/>
                </Button>
            </a>
        }
    ]

    return (
        <div style={{marginTop: '2rem', marginBottom: '5rem'}}>
            <Table columns={columns} dataSource={files}/>
        </div>
    );
};

export default DriveView;