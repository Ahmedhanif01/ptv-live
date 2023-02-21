import React, { useEffect, useState } from 'react';
import { Globals } from '../Constants';
import Loader from './Loader';

function UserVerification(props) {

    const [isLoading, setLoading] = useState(true);
    const [isAlreadyVerified, setIsAlreadyVerfied] = useState(false);

    const apiURL = Globals.baseAPIURL + 'api/';

    useEffect(() => {
        verifyUser()
    }, []);

    const verifyUser = async () => {
       let verifyURL = apiURL + 'verifyEmail';
       
       const body = {
            id: props.id,
            emailVerificationToken: props.emailVerificationToken
        }

        const requestOptions = {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body)
        };

        let response = await fetch(verifyURL, requestOptions);
        response = await response.json();

        if (response.response_code === 0) {
            setLoading(false);
            props.setUser(response.user, true);
        } else if (response.response_code === 112) {
            setLoading(false);
            setIsAlreadyVerfied(true);
        }

        window.location.href = '/';
    }

    return (
        <>
        {
            isLoading && 
                <Loader></Loader>
        }
        {
           isAlreadyVerified &&
           <div className="mt-5 mb-5 text-center">
                <h2 style={{fontStyle: 'bold'}}>Email Already Verified</h2>
                <p style={{fontSize: '15px'}}>Your Account is already verified</p>
            </div>
        }
        </>    
    )
}

export default UserVerification;