import React from 'react';
import AppLayout from "../../Components/AppLayout/AppLayout.jsx";

const AppLanding = () => {
    return (
        <AppLayout>
            <div style={{height: '90vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                Authenticated
            </div>
        </AppLayout>
    );
};

export default AppLanding;