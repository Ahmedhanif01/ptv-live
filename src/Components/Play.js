import React, { Fragment, useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import RelatedContent from './RelatedContent';
import Login from './Login';
import RecentlyWatched from './RecentlyWatched';
import { DRAMATIME_URL, DT_PROJECT_ID, DT_SECRET_KEY } from '../Constants';



const Play = (props) => {

    const [videoContent, setVideoContent] = useState(props.location.state || null)

    useEffect(() => {

        const getSharedContent = async (id) => {
            console.log('video id', id)
            let url = `${DRAMATIME_URL}/api/home/get_related_content?increase_views=1&msisdn=${props.userData.phone}&video_id=${id}&project_id=${DT_PROJECT_ID}&secret_key=${DT_SECRET_KEY}&web_user=1`
            let resp = await fetch(url)
            let respObj = await resp.json()
            setVideoContent(respObj.object)
            console.log('Single video call obj ', respObj)

        }


        if (props.isUser) {
            let url = new URL(window.location.href)
            let video = url.searchParams.get('video')
            if (video) getSharedContent(video)
        }

    }, [props.isUser, props.userData.phone])


    return (
        props.isUser ?

            videoContent && <Fragment>
                <div className="play-container">
                    <div className="row">
                        <div className='col-lg-8 col-md-12 col-sm-12 col-xs-12'>
                            <VideoPlayer data={props.location.state || videoContent} userData={props.userData} lang={props.lang}/>
                            <RecentlyWatched  userData={props.userData} lang={props.lang}/>
                            <div className="mb-4"></div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                            <RelatedContent data={props.location.state || videoContent}  lang={props.lang}/>
                        </div>
                    </div>
                </div>
            </Fragment>
            :
            <Login setUser={props.setUser} />
    );
}

export default Play;