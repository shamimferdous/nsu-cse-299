import { useEffect, useState } from 'react';
import styles from './Auth.module.scss';
import { Button, Divider } from 'antd';

//importing components
import AppLayout from '../../Components/AppLayout/AppLayout';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script'

const CLIENT_ID = '712514481296-k2kaus5v535uq5s1vsgngv1729oas6m6.apps.googleusercontent.com';


const AuthLanding = () => {

    const [loading, setLoading] = useState(false);
    const [faceIoLoading, setFaceIoLoading] = useState(false);

    let faceio;

    useEffect(() => {
        faceio = new faceIO("fioa414d");
    }, []);

    const handleSignIn = async () => {
        setFaceIoLoading(true);
        try {
            let response = await faceio.enroll({
                locale: "auto",
                payload: {
                    email: "example@gmail.com",
                    pin: "12345",
                },
            });

            console.log(` Unique Facial ID: ${response.facialId}
          Enrollment Date: ${response.timestamp}
          Gender: ${response.details.gender}
          Age Approximation: ${response.details.age}`);
        } catch (error) {
            console.log(error);
        } finally {
            setFaceIoLoading(false);
        }
    };

    const handleLogIn = async () => {
        setFaceIoLoading(true);
        try {
            let response = await faceio.authenticate({
                locale: "auto",
            });

            console.log(` Unique Facial ID: ${response.facialId}
              PayLoad: ${response.payload}
              `);
        } catch (error) {
            console.log(error);
        } finally {
            setFaceIoLoading(false);
        }
    };

    const responseGoogle = (response) => {
        setLoading(true);
        const payload = {
            oauth2_token: response.tokenId,
            email: response.profileObj.email,
            first_name: response.profileObj.givenName,
            last_name: response.profileObj.familyName,
            dp: response.profileObj.imageUrl
        };

        // axios.post('/users/login', payload).then(response => {
        //     console.log(response.data);

        //     authContext.setUser(response.data.user);
        //     authContext.setIsAuthenticated(true);
        //     localStorage.setItem('device_id', response.data.access_token);
        //     props.history.push("/");

        // }).catch(error => {
        //     message.error("Invalid credentials!");
        //     setLoading(false);
        // });

    }

    return (
        <AppLayout>
            <section className={styles.wrapper}>
                <div className={styles.left}>
                    <img src="/mockup.png" alt="" />
                </div>
                <div className={styles.right}>
                    <div className={styles.auth_box} style={{ display: faceIoLoading ? 'none' : null }}>
                        <GoogleLogin
                            clientId={CLIENT_ID}  // your Google app client ID
                            render={renderProps => (
                                <Button
                                    type='primary'
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    loading={loading}
                                    className={styles.loginBtn}
                                >
                                    <img src="/google-icon.png" alt="" />
                                    Sign Up with Google
                                </Button>
                            )}
                            onSuccess={responseGoogle} // perform your user logic here
                            onFailure={responseGoogle} // handle errors here
                            cookiePolicy={'single_host_origin'}
                        />
                        <br />
                        <div style={{ width: '100%' }}>
                            <Divider style={{ fontSize: '1rem', color: 'var(--color-grey-dark-3)' }}>Or Sign In With</Divider>
                        </div>
                        <br />
                        <div className={styles.face_id} onClick={handleLogIn}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Face_ID_logo.svg/1200px-Face_ID_logo.svg.png" alt="" />
                            <span>Face ID</span>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout >
    );
};

export default AuthLanding;