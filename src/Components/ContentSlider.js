import React from 'react'
import Item from './Item';
import Slider from "react-slick";

const ContentSlider = (props) => {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow:  (props.type.indexOf("movie") >= 0  ? 11.2: 7.2),
        //initialSlide: 0,
        slidesToScroll:2,
        arrows: true,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow:  (props.type.indexOf("movie") >= 0  ? 7.2: 5.2)
                }
            },
            {
                breakpoint: 1025,
                settings: {
                    arrows: false
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: (props.type.indexOf("movie") >= 0  ? 3.2: 2.2),
                    arrows: false
                }
            }
        ]
    };


    return (
        <Slider {...settings}>
            {
                props.data.map(function (d, index) {
                    return (
                        <Item key={d.id} data={d} type={props.type} />
                    )
                })
            }

        </Slider>
    )
}


export default ContentSlider;