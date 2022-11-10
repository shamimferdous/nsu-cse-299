import {Button, Table} from "antd";
import {files} from "./data.js";
import { FileIcon, defaultStyles } from 'react-file-icon';
import {BsDownload} from 'react-icons/bs';

const DriveView = () => {
  function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'file_name',
            sorter: (a, b) => a.file_name.localeCompare(b.file_name),
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
            dataIndex: 'last_modified',
            sorter: (a, b) => a.last_modified - b.last_modified
        },
        {
            title: 'Actions',
            render: (value) => <Button type={'primary'}>
                <BsDownload size={15} />
            </Button>
        }
    ]

    return (
        <div style={{marginTop: '2rem', marginBottom: '5rem'}}>
            <Table columns={columns} dataSource={files} />
        </div>
    );
};

export default DriveView;