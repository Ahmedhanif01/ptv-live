import React, { useState } from 'react';
import i18n from '../Locales';
import { GetErrorMessage } from './ErrorHelpers';

import { Globals } from '../Constants';

const Login = (props) => {

    const [code, setcode] = useState("92")
    const [number, setnumber] = useState("");
    const [pin, setpin] = useState("");
    const [showPin, setshowPin] = useState(false);
    const [errMesg, seterrMsg] = useState("")
    const [btnText, setbtnText] = useState(i18n.continue);

    const apiURL = Globals.baseAPIURL + 'api/';


    const sendOTP = async () => {
        
        seterrMsg("")
        if (!number || ((number.trim().length) !== 11)) {
            seterrMsg(i18n.validnumber)
            setshowPin(false)
            setbtnText(i18n.continue)
            return
        }
        

        try {
            setbtnText(i18n.pleasewait)
            let url = apiURL + 'generateOtp';
    
            const requestOptions = {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({phoneNumber : number})
            }

            let response = await fetch(url, requestOptions);
            response = await response.json();

            if (response.response_code === 0) {
                setshowPin(true);
                setbtnText(i18n.continue);
                seterrMsg('');
            } else {
                seterrMsg(GetErrorMessage(response.response_code, response.message, 'signin'));
                setbtnText(i18n.continue);
            }

        } catch (e) {
            console.log("Error in check user status", e.message);
            seterrMsg(i18n.somethingwrongmsg)
            setbtnText(i18n.continue)
        }

    }

    const confirmOTP = async () => {

        seterrMsg("")
        if (!pin) {
            seterrMsg(i18n.enterpinmsg)
            setshowPin(true)
            setbtnText(i18n.subscribe)
            return
        }
        try {

            setbtnText(i18n.pleasewait)

            let url = apiURL + 'verifyOtpForSignIn';

            const requestOptions = {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    phoneNumber : number,
                    otp: pin
                })
            }

            let response = await fetch(url, requestOptions);
            response = await response.json();

            if (response.response_code === 0) {
                setTimeout(function () {
                    props.setUser(response.user, true)
                }, 2000)
            } else {
                seterrMsg(GetErrorMessage(response.response_code, response.message, 'signin'));
                setbtnText(i18n.continue);
            }


            // let resp = await fetch(url)
            // let respObj = await resp.json()
            // console.log('confirm pin resp', respObj)
            // if (respObj.status === 1) {
            //     // Google events
            //     ReactGA.event({
            //         category: 'click',
            //         action: `${telco}-Confirm-Pin-Success`,
            //         label: `${telco}-Confirm-Pin-Success`,
            //         //value: phone + '-' + pin
            //     });
            //     setTimeout(function () {
            //         props.setUser(respObj.user, true)
            //     }, 2000)
            // }
            // else {
            //     seterrMsg(i18n.confirmpinerrmsg)
            //     setshowPin(true)
            //     // Google events
            //     ReactGA.event({
            //         category: 'click',
            //         action: `${telco}-Confirm-Pin-Invalid`,
            //         label: `${telco}-Confirm-Pin-Invalid`,
            //         //value: phone + '-' + pin
            //     });
            // }

            setbtnText(i18n.subscribe)

        } catch (e) {
            console.log("Error in confirm pin", e.message);
            seterrMsg(i18n.somethingwrongmsg)
            setbtnText(i18n.subscribe)
        }

    }

    return (
        <div>
            <div className="" style={{ maxWidth: '100%', width: '100%', margin: '0 auto -3rem' }} >
                <div className="bg-top">
                    <div className="bg-bottom">
                        <div style={{ maxWidth: '400px', width: '80%', margin: '0 auto' }}>
                            {
                                !showPin && <form>
                                    <div className="row" >
                                        <div className="col">
                                            <h5 className="subscription-title">{i18n.subscriptionText}</h5>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <img src="/img-subscription.png" alt='' className="subscription-img" />
                                        </div>

                                    </div>
                                    <div className="row">
                                        
                                        <div className="col formGridAddress1 pl-0">
                                            <input className="form-control text-center" placeholder={i18n.mobilenumber} maxLength="11" onChange={e => { setnumber(e.target.value) }} />
                                        </div>
                                        <div style={{ borderBottom: '1px solid rgba(134,140,154,0.6)', width: '100%', marginBottom: '20px' }}></div>
                                    </div>
                                   
                                    <div className="row">
                                        <div className="col">
                                            <button variant="primary" type="submit" onClick={(e) => {
                                                e.preventDefault();
                                                sendOTP();
                                            }}
                                                className='btn-next btn btn-primary'>
                                                {btnText}
                                            </button>
                                        </div>
                                    </div>

                                </form>
                            }

                            {
                                showPin && <form>
                                    <div className="row" >
                                        <div className="col">
                                            <h5 className="subscription-title">{i18n.subscription}</h5>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <img src="/img-subscription.png" alt='' className="subscription-img" />
                                        </div>

                                    </div>
                                    <div className="row" >
                                        <div className="col ">
                                            <p> {i18n.sendpininfo} </p>
                                        </div>
                                    </div>
                                    <div className="row">

                                        <div className="col formGridAddress1">
                                            <input
                                                style={{ width: '100%' }}
                                                className="form-control text-center"
                                                placeholder={i18n.enterpin}
                                                maxLength="6"
                                                onChange={e => { setpin(e.target.value) }}
                                            />
                                        </div>
                                        <div style={{ borderBottom: '1px solid rgba(134,140,154,0.6)', width: '100%', marginBottom: '20px' }}></div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <button variant="primary" type="submit" onClick={
                                                (e) => {
                                                    e.preventDefault();
                                                    confirmOTP();
                                                }}
                                                className='btn-next btn btn-primary'>
                                                {btnText}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col text-center mt-5">
                                            <p> {i18n.dontrecievepin} </p>
                                            <h6 onClick={() => { setshowPin(false); setbtnText(i18n.continue) }} className="text-light cursor-pointer"> {i18n.resendpin} <i className="dt-chevron-right"></i></h6>
                                        </div>
                                    </div>
                                </form>
                            }
                            <div className="text-center mt-3 text-danger text-bold">{errMesg}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;