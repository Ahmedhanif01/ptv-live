import React, { useState, useEffect, useRef } from 'react';
import { Globals } from '../Constants';
import { Link } from 'react-router-dom';
import axios from 'axios';

import i18n from '../Locales';

const Profile = (props) => {

    const [active, setactive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(props.userData.profileImage);
    const [firstName, setFirstName] = useState(props.userData.firstName);
    const [lastName, setLastName] = useState(props.userData.lastName);
    const [email, setEmail] = useState(props.userData.email);
    const [phoneNumber, setPhoneNumber] = useState(props.userData.phoneNumber);
    const [editProfileMsg, setEditProfileMsg] = useState('');
    const [erroFlag, setErrorFlag] = useState(false);

    const apiURL = Globals.baseAPIURL + 'api/';
    const token = props.userData ? props.userData.token : '';

    useEffect(() => {
        if (!props.isUser) {
            props.history.push('/')
        }
    })

    

    const ValidateEmail = (mail) => {
        if (Globals.emailRegex.test(mail)) {
            setErrorFlag(false)
            setEditProfileMsg('')
            return (true)
        } else {

            setErrorFlag(true)
            setEditProfileMsg(i18n.enteremailmsg)
            setactive(true)
            setLoading(false)
            return (false)
        }
    }

    const editProfile = async (e) => {

        e.preventDefault();

        setLoading(true);
        setErrorFlag(false);

        if(!firstName || !email || !lastName) {
            setErrorFlag(true)
            setEditProfileMsg(i18n.fillallfields)
            setactive(true)
            setLoading(false)
            return;
        }
        if (!ValidateEmail(email)) return;

        try {

            if (profileImage !== props.userData.profileImage) {
               // uploadImage();
            }

            const url = apiURL + 'updateProfile';

            const body = {
                firstName: firstName,
                lastName: lastName,
                email: props.userData.isEmailVerified ? undefined : email,
                profileImage: profileImage === null ? undefined : profileImage
            };

            const requestOptions = {
                method: 'POST',
                headers: { "Content-type": "application/json", "Authorization" : 'Bearer ' + token },
                body: JSON.stringify(body)
            };

            let response = await fetch(url, requestOptions);
            response = await response.json();

            if (response.response_code === 0) {
                response.user.token = token;
                props.setUser(response.user, true);
                setactive(false);
                setEditProfileMsg(i18n.profileeditsuccmsg);

                setTimeout(() => {
                    setEditProfileMsg('')
                }, 5000);
            } else {
                setEditProfileMsg(i18n.profileeditfailmsg)
                console.log(response.message);
                setErrorFlag(true)
            }

        } catch (e) {
            console.log('Error in edit profile', e.message);
            setEditProfileMsg(i18n.profileeditfailmsg)
            setErrorFlag(true)
        }
        setLoading(false)
    }

    const inputFile = useRef(null)
    const clickUploadFile = (e) => {
        inputFile.current.click();
    };

    const uploadImage = async (image) => {
        console.log(image);
        let url = apiURL + 'uploadImage';

        let formData = new FormData();
        formData.append("image", image);

        axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization" : 'Bearer ' + token
            }
          }).then(res => {
              setProfileImage(res.data.imagePath);
          })
    }



    return (
        <div>
            <div className="container" style={{ width: '100%' }} >
                <div style={{ maxWidth: '400px', width: '80%', margin: '0 auto' }}>
                    {
                        active ?

                            <form onSubmit={editProfile} type="multipart/form-data">
                                <div style={{ margin: '0 auto 20%', display: 'block' }} >
                                    <h3 className="profile-title">Profile</h3>
                                </div>
                                <div className="user">
                                    <div className="avatar">
                                        <input type='file' id='file' accept="image/*" name="avatar" ref={inputFile} 
                                            style={{ display: 'none' }} 
                                            onChange={(e) => { setProfileImage(URL.createObjectURL(e.target.files[0])); uploadImage(e.target.files[0]) }} />
                                        <Link to='' onClick={(e) => { e.preventDefault(); clickUploadFile() }}>
                                            <i className={"lni-pencil edit"}></i>
                                            <img src={profileImage || 'avatar.jpg'} className="rounded-circle mb-2" alt="" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="font-weight-bold text-center">{phoneNumber}</div>
                                <div className="row">
                                    <div className="col formGridAddress1 pl-0 pr-0 mt-5">
                                        <input
                                            name="firstName"
                                            id='firstName'
                                            className="form-control profile-edit"
                                            placeholder={i18n.firstName}
                                            value={firstName}
                                            onChange={e => {
                                                setFirstName(e.target.value)
                                            }}
                                            disabled={!active} />
                                        <i className="lni-pencil-alt edit d-none"></i>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col formGridAddress1 pl-0 pr-0 mt-3">
                                        <input
                                            name="lastName"
                                            id='lastName'
                                            className="form-control profile-edit"
                                            placeholder={i18n.lastName}
                                            value={lastName}
                                            onChange={e => {
                                                setLastName(e.target.value)
                                            }}
                                            disabled={!active} />
                                        <i className="lni-pencil-alt edit d-none"></i>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col formGridAddress1 pl-0 pr-0 mt-3">
                                        <input
                                            name="email"
                                            id='email'
                                            className="form-control profile-edit"
                                            placeholder={i18n.email}
                                            value={email}
                                            onChange={e => {
                                                setEmail(e.target.value)
                                            }}
                                            disabled={!active || props.userData.isEmailVerified} />
                                        <i className="lni-pencil-alt edit d-none"></i>
                                    </div>
                                </div>
                                <button variant="primary" type="submit"
                                    className="btn-logout btn btn-primary"
                                    disabled={loading}>
                                    {loading ? i18n.pleasewait : i18n.save}
                                </button>


                            </form>

                            :
                            <form>
                                <div style={{ margin: '0 auto 20%', display: 'block' }} >
                                    <h3 className="profile-title"> {i18n.profile} </h3>
                                </div>
                                <div className="user">
                                    <div className="avatar">
                                        <img src={profileImage || 'avatar.jpg'} className="img-fluid rounded-circle mb-2" alt="" />
                                    </div>
                                    <div className="font-weight-bold text-center">{phoneNumber}</div>
                                </div>
                                <div className="row">
                                    <div className="col formGridAddress1 pl-0 pr-0 mt-5">
                                        <input
                                            className="form-control profile-edit"
                                            placeholder={i18n.firstName}
                                            value={firstName || ""}
                                            disabled={!active} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col formGridAddress1 pl-0 pr-0 mt-3">
                                        <input
                                            className="form-control profile-edit"
                                            placeholder={i18n.lastName}
                                            value={lastName || ""}
                                            disabled={!active} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col formGridAddress1 pl-0 pr-0 mt-3">
                                        <input
                                            className="form-control profile-edit"
                                            placeholder={i18n.email}
                                            value={email || ''}
                                            disabled={!active || props.userData.isEmailVerified} />
                                    </div>
                                </div>

                                <button variant="primary" type="submit" onClick={(e) => { e.preventDefault(); setactive(true) }}
                                    className='btn-logout btn btn-primary'>
                                    {i18n.edit}
                                </button>


                            </form>

                    }

                    {
                        erroFlag ?
                            <div className="text-center mt-3 text-danger text-bold">{editProfileMsg}</div>
                            :
                            <div className="text-center mt-3 text-success text-bold">{editProfileMsg}</div>
                    }
                </div>
            </div>
        </div>

    );
}
export default Profile;