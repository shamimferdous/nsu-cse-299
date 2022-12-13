import React from 'react';
function iframe() {
    return {
        __html: '<iframe src="./register.html" width="100%" height="100%"></iframe>'
    }
}


export default function Register() {
    return (
        <div>
            <div dangerouslySetInnerHTML={iframe()} />
        </div>)
}