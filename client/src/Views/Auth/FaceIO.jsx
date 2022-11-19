import React, { useEffect } from 'react';
import { message } from "antd";
import { useHistory } from "react-router-dom";
import axios from '../../config/axios';

const FaceIo = ({op, setFaceIoLoading}) => {

    const history = useHistory();
    let faceio;

    useEffect(() => {
        console.log('useeffect');
        faceio = new faceIO("fioa6ce0");


        if (op === 'reg') {
            handleFaceIORegistration()
        } else {
            handleFaceIOLogIn();
        }
    }, []);


    const handleFaceIORegistration = async () => {

        try {
            let response = await faceio.enroll({
                locale: "auto", payload: {
                    email: "shamimferdous5@gmail.com",
                },
            });
            message.success(` Unique Facial ID: ${response.facialId}
              Enrollment Date: ${response.timestamp}
              Gender: ${response.details.gender}
              Age Approximation: ${response.details.age}`);
        } catch (error) {
            console.log('err here');
            console.log(error);
        } finally {

        }
    };

    const handleFaceIOLogIn = async () => {
        // window.document.getElementById('fioUiModal').style.zIndex = 1000;
        console.log('trigx')
        try {
            let response = await faceio.authenticate({
                locale: "auto",
            });

            console.log(` Unique Facial ID: ${response.facialId}
              PayLoad: ${response.payload}
              `);

            setTimeout(() => {
                history.push('/app');
            }, 3000);
        } catch (error) {
            console.log(error);
        } finally {
            let f_id = 'e802443ccb12423d923b61fb39221d96fioa0af6';
            axios.post('/users/v1/sign-in', {facial_id: f_id}).then(response => {
                console.log(response.data);
                localStorage.setItem('device_id', response.data.token);
            })
        }
    };


    return (
        <div>

        </div>
    );
};

export default FaceIo;