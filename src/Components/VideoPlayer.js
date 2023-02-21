import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom';
import ReactJWPlayer from 'react-jw-player';
import { DRAMATIME_URL, DT_SECRET_KEY, DT_PROJECT_ID, PLAYER_SCRIPT_URL } from '../Constants';

import i18n from '../Locales';

//import { SimpleShareButtons } from "react-simple-share";

const getOS = () => {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
        window.location = 'https://apps.apple.com/us/app/dramatime-app/id1356475302?ls=1'
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
        window.location = 'https://apps.apple.com/us/app/dramatime-app/id1356475302?ls=1'
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
        window.location = 'https://play.google.com/store/apps/details?id=com.kh.dramatime&hl=en'
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
        window.location = 'https://play.google.com/store/apps/details?id=com.kh.dramatime&hl=en'
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
        window.location = 'https://play.google.com/store/apps/details?id=com.kh.dramatime&hl=en'
    }

    return os;
}

const ShareVideo = (props) => {


    const [hide, setHide] = useState(false);

    return (
        <div className="row  justify-content-end position-relative" style={{ maxHeight: '60px' }}>

            {/* <div className="col-1">
                <Link to=""
                    onClick={(e) => { e.preventDefault(); return false; }}
                    className="icon-chromecast">
                </Link>
            </div> */}
            <div className="col-lg-1 col-md-1 col-sm-2 col">
                <Link to=""
                    onClick={(e) => { e.preventDefault(); getOS(); return false; }}
                    className="icon-download">
                </Link>
            </div>
            <div className="col-lg-1 col-md-1 col-sm-2 col pr-0">
                <Link to=""
                    onClick={(e) => { e.preventDefault(); setHide(!hide); return false }}
                    className="icon-share">
                </Link>
            </div>

            {
                hide && <div className="row justify-content-end social-sharing">
                    <div className="col">
                        <a className="secondary-button mr-2" target="blank" href={`https://www.facebook.com/sharer/sharer.php?u=dramatime.mobi?video=${props.data.id}`}><i className="lni-facebook-filled"></i></a>
                        <a className="secondary-button mr-2" target="blank" href={`https://twitter.com/intent/tweet?text=dramatime.mobi?video=${props.data.id}`}><i className="lni-twitter-filled"></i></a>
                        <a className="secondary-button" target="blank" href={`whatsapp://send?text=dramatime.mobi?video=${props.data.id}`} data-action="share/whatsapp/share"><i className="lni-whatsapp"></i></a>
                    </div>
                </div>

            }

        </div>
    );
}

const LessText = ({ text, maxLength }) => {
    const [hidden, setHidden] = useState(true);
    if (text <= maxLength) {
        return <span>{text}</span>;
    }
    return (
        <div className="row m-row-urdu">
            <div className="col-11 text-light mb-3 ">
               <p> {hidden ? `${text.substr(0, maxLength).trim()} ...` : text}</p>
            </div>
            <div className="col-1 text-right pr-md-0 pl-0">
                {hidden ?
                    <span onClick={() => setHidden(false)} className="description-arrow"></span>
                    :
                    <span onClick={() => setHidden(true)} className="description-arrow up"></span>
                }
            </div>
        </div>
    );
}

const getSources = (data) => {
    let qualities = []
    data.map((q) => {
        qualities.push({ file: q.url, label: q.height.toString(), default: (q.height === 360 ? true : false) })
    })

    return qualities
}


async function addItemToRecentlyPlayedOnPlay(video, user) {

    try {

        const url = `${DRAMATIME_URL}/api/continue_watching/set?secret_key=${DT_SECRET_KEY}&project_id=${DT_PROJECT_ID}&video_id=${video.id}&seek_time=0&msisdn=${user.phone}&web_user=1`
        const resp = await fetch(url)
        const respObj = await resp.json()
        console.log('Video added to recently watched!',respObj)

    } catch (e) {
        console.log('Videoplayer -> setRW error', e.message)
    }
}


async function removeItemToRecentlyPlayedOnPlay(video, user) {

    try {

        const url = `${DRAMATIME_URL}/api/continue_watching/remove?secret_key=${DT_SECRET_KEY}&project_id=${DT_PROJECT_ID}&video_id=${video.id}&seek_time=0&msisdn=${user.phone}&web_user=1`
        const resp = await fetch(url)
        const respObj = await resp.json()
        console.log('Video removed from recently watched!', respObj)

    } catch (e) {
        console.log('Videoplayer -> removeRW error', e.message)
    }
}

const Player = (props) => {

    let data = props.data.data
    let user = props.data.userData

    const playList = getSources(data.qualities)

    return (

        <ReactJWPlayer
            playerId='player'
            playerScript={PLAYER_SCRIPT_URL}
            image={data.sub_content_type === 'movie' ? data.custom_thumbnails.original:data.thumbs.medium}
            playlist={[{ image: data.sub_content_type === 'movie' ? data.custom_thumbnails.original:data.thumbs.original, sources: playList }]}
            isMuted={false}
            isAutoPlay={false}
            onPlay={() => { addItemToRecentlyPlayedOnPlay(data, user) }}
            onOneHundredPercent={() => { removeItemToRecentlyPlayedOnPlay(data, user) }}
            key="2HZsFtRYlzQZJpY2SmrCGnAe6fBk5mGtGN8MgA=="
        />
    )
}

const renderLiveChannel = (props) => {

    return (

        <Fragment>
            {
                <ReactJWPlayer
                    playerId='player'
                    playerScript={PLAYER_SCRIPT_URL}
                    image={props.data.thumbnail}
                    file={props.data.streaming_url}
                    isMuted={false}
                    isAutoPlay={true}
                    videoType={'m3u8'}
                    key="2HZsFtRYlzQZJpY2SmrCGnAe6fBk5mGtGN8MgA=="
                />
            }

            <div className="container title-description">
                <div className="row">
                    <div>
                        <h5 className="text-light mb-0 mt-2">{props.data.name}</h5>
                    </div>

                </div>
            </div >

        </Fragment>
    );
}

const renderVideo = (props) => {

    return (
        <Fragment>
            {
                props.data.thumbs && <div><div className="player-container-small-screen">
                    <Player data={props} />
                    </div>
                    <div className="container title-description">
                        <div className="row">
                            <div className="col pl-0 pr-0">
                                <h5 className="text-light mb-0 mt-2 ellipsis">{props.data['title'+props.lang]}</h5>
                                {/* <span className="icon-share text-center"> Share </span> */}
                                {props.data.sub_content_type === 'drama' && <p className="">  {props.data.order === 0 ? "OST" : (i18n.episode + props.data.order) }</p>}
                            </div>
                        </div>
                        <div className="row">
                        {
                            props.data.description.length > 0 && 
                                <div className="col d-block video-description d-md-none mt-3 pl-0 pr-0">
                                    <LessText
                                        text={props.data['description'+props.lang]}
                                        maxLength={120}
                                    />
                                </div>
                        } {
                            props.data.description.length > 0 &&
                                <div className="col d-none d-md-block video-description mt-3 pl-0 pr-0">
                                    <LessText
                                        text={props.data['description'+props.lang]}
                                        maxLength={160}
                                    />

                                </div>
                            

                        }
                            </div>
                        <ShareVideo {...props} />
                    </div >
                </div>


            }
        </Fragment>
    );
}

const VideoPlayer = (props) => {
    useEffect(() => { }, [props])

    return (
        'streaming_url' in props.data ? renderLiveChannel(props) : renderVideo(props)
    );
}


export default VideoPlayer;
