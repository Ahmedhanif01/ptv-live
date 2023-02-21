import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { timeConvert } from './Helpers'
import i18n from '../Locales';

//********** Constants  **********//

import { DT_SECRET_KEY, DRAMATIME_URL, DT_PROJECT_ID, TELCO } from '../Constants';

const RelatedContent = (props) => {

    const [relatedData, setRelatedData] = useState([])
    const [loading, setloading] = useState(true)
    const [loadMore, setLoadMore] = useState(false)
    const [currPage, setCurrPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)



    const getMoreResult = async () => {
        setLoadMore(true)

        let nextPage = currPage + 1;

        let contentType = props.data.sub_content_type === "movie" ? "movies" : props.data.sub_content_type;


        const url = `${DRAMATIME_URL}/api/home/get_related_content?telco=${TELCO}&msisdn=966111111111&content_type=${contentType}&web_user=1&video_id=${props.data.id}&page=${nextPage}&per_page=10&project_id=${DT_PROJECT_ID}&descending_order=0&secret_key=${DT_SECRET_KEY}`
        let resp = await fetch(url)
        let respObj = await resp.json()
        setCurrPage(nextPage);
        setLoadMore(false)


        await respObj.related.map((item) => {
            setRelatedData(relatedData => [...relatedData, item]);
        })

        if (respObj.related < 10) setTotalPages(nextPage)
        else setTotalPages(nextPage + 1)
    }

    useEffect(() => {

        const getRelatedData = async () => {
            try {

                let contentType = props.data.sub_content_type === "movie" ? "movies" : props.data.sub_content_type;

                const url = `${DRAMATIME_URL}/api/home/get_related_content?telco=${TELCO}&msisdn=966111111111&content_type=${contentType}&web_user=1&video_id=${props.data.id}&page=${currPage}&per_page=10&project_id=${DT_PROJECT_ID}&descending_order=0&secret_key=${DT_SECRET_KEY}`
                let resp = await fetch(url)
                let respObj = await resp.json()


                console.log('relate dreponse', respObj)
                setStateRelatedData(respObj)

            } catch (e) {
                console.log("Error in VideoPlayer -> getRelatedData", e.error)
            }
        }

        const setStateRelatedData = async (body) => {
            if (body.status !== 0) {
                let d = []
                if (body.special_content) d.push(body.special_content)
                if (body.object.sub_content_type === "movie" || body.object.sub_content_type === "tele_film") {
                    await body.data.map((item) => {
                        let newItem = { ...item.content[0] }
                        newItem['thumbnails'] = item.thumbnails
                        d.push(newItem)
                    })
                } else {
                    await body.related.map((item) => {
                        d.push(item)
                    })
                }
                if (d.length < 10) setTotalPages(currPage)
                else setTotalPages(currPage + 1)
                setRelatedData(d)
                setloading(false)
            } else {
            }
            setloading(false)
        }
        getRelatedData()

    }, [props.data.id])

    console.log("related data", relatedData)

    return (

        <Fragment>
            {
                <div className="container pl-0 pr-0 related-conatiner ml-md-0 mr-md-0" style={{ position: 'relative' }}>
                    <h5 className="section-title episodes m-0 mb-2 p-0"> {i18n.relatedcontent} </h5>
                    <ul className="row list-unstyled">
                        {
                            relatedData.length > 0 ? relatedData.map((item) => {
                                return (
                                    <li className="col-lg-12 col-md-6 col-sm-12 col-xs-12" key={'related-' + item.id} >
                                        <Link key={item.id} to={{
                                            pathname: "/play",
                                            state: item
                                        }}
                                        >

                                            <div className="row mb-2" >
                                                <div className={`pr-0 ${item.sub_content_type === 'movie' ? 'pl-3 movie-thumb' : 'col-5'}`}>
                                                    <img
                                                        width={item.sub_content_type === 'movie' ? '110px' : '100%'}
                                                        height={'autos'}
                                                        className="rounded bgsimple"
                                                        src={item.sub_content_type === 'movie' ? item.custom_thumbnails.original : item.thumbs.medium}
                                                        alt=""
                                                    /></div>
                                                <div className="row col-7 pl-1 position-relative">

                                                    <div className="col-12"><h6 className="imgTitle pt-0 ml-2 ellipsis"> {item['title'+props.lang]} </h6>
                                                        {item.sub_content_type === 'drama' && <p className="imgDescription ml-2"> {item.order === 0 ? "OST" : (i18n.episode+item.order)} </p>}
                                                    </div>
                                                    <div className="col-12 align-self-end"><p className="imgDescription ml-2 align-text-bottom">{timeConvert(item.duration)}</p></div>

                                                    {/* <p className="text-light text-right days"> 09 days</p> */}
                                                </div>

                                            </div>
                                        </Link>
                                    </li>
                                )
                            })
                                :
                                loading === false && <li className="col-lg-12 col-md-6 col-sm-12 col-xs-12 text-left mt-5" style={{opacity: 0.5}}>{i18n.norelatedcontent}</li>
                        }
                    </ul>
                    {((currPage < totalPages) && !loading) && <button disabled={loadMore} className="btn btn-primary btn-loadmore mr-auto ml-auto mb-5 mt-5" onClick={getMoreResult}> {loadMore ? i18n.loading : i18n.loadmore} </button>}

                </div>
            }
        </Fragment>
    )
}


export default RelatedContent;