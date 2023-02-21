import React from 'react';
import { Link } from 'react-router-dom';


const videoItem = ( data, type ) => {
    return(
        <div>
            <div className="col vsongs">
                <Link to={{ pathname: "/play", state: data }}>
                    <img
                        className="imgThumb imgThumbSqr"
                        src={data.custom_thumbnails.original}
                        alt=""
                    />
                    <div className="icon-play-songs"></div>
                </Link>
            </div>
            <div className="w-100 mt-2 clearfix"></div>
        </div>
    )
}

const ItemVideoSong = ( props ) => {

    return (
        <div>
            <div className="row">
                {videoItem(props.data, props.type)}   
                
            </div>
        </div>
    );
}

export default ItemVideoSong;