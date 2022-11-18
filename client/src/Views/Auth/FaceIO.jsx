import React, { useEffect } from 'react';
import { message } from "antd";
import { useHistory } from "react-router-dom";

const FaceIo = ({ op, setFaceIoLoading }) => {

    const history = useHistory();
    let faceio;

    useEffect(() => {
        console.log('useeffect');
        faceio = new faceIO("fioa414d");


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
                    email: "example@gmail.com", pin: "12345",
                },
            });
            message.success(` Unique Facial ID: ${response.facialId}
              Enrollment Date: ${response.timestamp}
              Gender: ${response.details.gender}
              Age Approximation: ${response.details.age}`);
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setFaceIoLoading(false);
                location.reload();
            }, 3000);
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
            setTimeout(() => {
                setFaceIoLoading(false);
                // location.reload();
            }, 3000);
        }
    };


    return (
        <div>

        </div>
    );
};

export default FaceIo;