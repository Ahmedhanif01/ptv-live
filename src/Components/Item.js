import React from 'react';
import { Link } from 'react-router-dom';
const Item = (props) => {

    if (props.type === "channel") {

        return (
            <>
                <Link to={{
                    pathname: "/live",
                    state: props.data
                }}>
                    <img
                        alt=""
                        className="channels-img"
                        src={props.data.thumbnail}
                        width="100"
                    />
                </Link>

            </>
        );
    } else {
        return (
            <>
                <Link to={{
                    pathname: "/play",
                    state: props.data
                }}>
                    <img
                        alt=""
                        className="imgThumb"
                        style={{height: window.screen.width > 769 ? '144px' : '100px', width: '255px'}}
                        src={props.data.thumbnails && props.type.indexOf("movie") >= 0 ? props.data.thumbnails.mobile_n_movie : props.data.thumbs.original}
                    />

                    {
                        // props.type.indexOf("detail") >= 0
                        // &&
                        // <div>
                        //     <h6 className="imgTitle mt-1 ellipsis"> {props.data.title} </h6>
                        //     <p className="imgDescription"> {props.type === "drama-detail" ?
                        //         (props.data.order === 0 ? "OST" : `Episode ${props.data.order}`)
                        //         :
                        //         new Date(props.data.created_at).toDateString()}
                        //     </p>
                        // </div>
                    }
                </Link>

            </>
        );
    }

}

export default Item;