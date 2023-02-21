import React from 'react';

import 'shaka-player/dist/controls.css';

const shaka = window.shaka;

class ShakaVideoPlayer extends React.PureComponent {
    constructor (props) {
        super(props);

        this.videoComponent = React.createRef();

        this.onErrorEvent = this.onErrorEvent.bind(this);
        this.onError = this.onError.bind(this);

        this.state = {
            streamObject: props.content
        }
        shaka.polyfill.installAll();

        this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    }

    onErrorEvent(event) {
        // Extract the shaka.util.Error object from the event.
        this.onError(event.detail);
    }

    onError(error) {
        // Log the error.
        console.error('Error code', error.code, 'object', error);
    }

    componentDidMount() {
        var manifestUri = this.state.streamObject.linkAddress;
        
        //var manifestUri = 'https://32x2cn7zz29m47vnqt4z-q8r7uo.p5cdn.com/abr_DRMStream/dvrstream/manifest.mpd';

        const video = this.videoComponent.current;

        var player = new shaka.Player(video);

        let userToken = this.user ? this.user.token : '';

        if (this.state.streamObject.isDrmAvailable) {

            player.configure({
                drm: {
                    servers: {
                        'com.widevine.alpha': `https://widevine-dash.ezdrm.com/widevine-php/widevine-foreignkey.php?pX=7447AB&token=${userToken}`,
                        'com.microsoft.playready': `https://playready.ezdrm.com/cency/preauth.aspx?pX=5C7B79&token=${userToken}`
                    }
                }
            });
        }

        window.player = player;


        player.addEventListener('error', this.onErrorEvent);

        player.load(manifestUri).then(function () {
            console.log('Video Loaded Now!');
        }).catch(this.onError);

    }
    componentDidUpdate() {
        console.log(3);
    }

    render () {
        return(
            <>
            <video 
                style={{width: window.screen.width > 769 ? '80%' : '100%',
                 height: window.screen.width > 769 ? '80%' : '100%', 
                 marginLeft: window.screen.width > 769 ? '10%' : '0%', 
                 marginRight: window.screen.width > 769 ? '10%' : '0%'}}
                autoPlay={true}
                ref={this.videoComponent}
                controls
            />
                {/* <img className='img-fluid' src={'https://cricwick-fantasy.s3-us-west-2.amazonaws.com/Assets/MTA_LiveStream.jpg'} alt=""></img> */}
            </>
        ); 
    }
}

export default ShakaVideoPlayer;

