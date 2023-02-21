import React, { Fragment, useState, useEffect } from 'react';
import { Globals } from '../Constants';
import ContentSlider from './ContentSlider';
import i18n from '../Locales';

const RecentlyWatched = (props) => {

    const [recentlyWatched, setRecentlyWatched] = useState([])
    useEffect(() => {

        const getRecentlyWatched = async () => {


            try {
                const url = `${Globals.contentURL}/api/continue_watching/list?secret_key=${Globals.contentSecretKey}&project_id=${Globals.contentProjectId}&msisdn=${props.userData.phoneNumber}&type=2&page=1&per_page=10&web_user=1`
                console.log(url)
                const resp = await fetch(url)
                const respObj = await resp.json()
                if(respObj.status === 1)    setRecentlyWatched(respObj.data);

            } catch (e) {
                console.log('RecentlyWatched -> RW error', e.message)
            }

        }

        getRecentlyWatched()

    }, [])

    return (
        recentlyWatched.length > 0 && <Fragment>
            <h5 className="section-title episodes"> {i18n.recentlywatched} </h5>
            <ContentSlider type="recently-watched" data={recentlyWatched} />
        </Fragment>
    );
}

export default RecentlyWatched;