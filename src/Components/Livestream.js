import React, { useState } from 'react';
import ShakaVideoPlayer from './ShakaVideoPlayer';
import 'shaka-player/dist/controls.css';

import i18n from '../Locales';

import Login from './Login';

function Livestream (props) {

    const [streamObject, setStreamObject]= useState(props.location.state || null);

    return (
        props.isUser 
        ?
            streamObject.linkAddress && streamObject.linkAddress.length > 0
            ?
                <div className="play-container mt-5">
                    <ShakaVideoPlayer 
                    style={{width: window.screen.width > 769 ? '80%' : '100%',
                        height: window.screen.width > 769 ? '80%' : '100%', 
                        marginLeft: window.screen.width > 769 ? '10%' : '0%', 
                        marginRight: window.screen.width > 769 ? '10%' : '0%'}}
                     content={props.location.state || streamObject} ></ShakaVideoPlayer>
                    <h1 className="mt-3 live-title" style={{ marginLeft: window.screen.width > 769 ? '10%' : '0%',}}>{streamObject.title}</h1>
                    <p>Watch live sports</p>

                </div>
            :
            <div className="" style={{ maxWidth: '100%', width: '100%', margin: '0 auto -3rem' }} >
                 <div className="bg-top">
                    <div className="bg-bottom">
                        <div style={{ maxWidth: '400px', width: '80%', margin: '0 auto' }}>
                            <div className="row" >
                                <div className="col">
                                    <h5 className="subscription-title">{i18n.streamNotAvailable}</h5>
                                </div>
                            </div>
                            <div className="row">
                                        <div className="col">
                                            <button variant="primary" type="submit" onClick={(e) => {
                                                e.preventDefault();
                                                window.location.href = '/';
                                            }}
                                                className='btn-next btn btn-primary'>
                                                Go Back
                                            </button>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>    
            </div>
        :
        <Login setUser={props.setUser} />
    )
}

export default Livestream;