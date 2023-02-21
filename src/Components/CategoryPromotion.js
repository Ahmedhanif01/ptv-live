import React from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

function itemCategoryPromotion(data) {
    return (
        <Link to={{
            pathname: `/play`,
            state: data

        }}>
            <div className="">
                <img
                    className="imgSlider"
                    src={data.thumbs.original}
                    alt=""
                />
                <div className="icon-play-songs"></div>
            </div>
        </Link>
    )
}

const CategoryPromotion = (props) => {
    const settings = {
        infinite: true,
        className: "center",
        centerMode: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 2.6,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 2.6
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
                    dots: true,
                    arrows: false,
                    slidesToShow: 1,
                    centerMode: false
                }
            }
        ]
    };


    return (
        <div>
            <Slider {...settings} className="sliderTop">
                {
                    props.data.map((item) => {
                        return (
                            <div key={item.id} className="vsongs-slider">
                                {itemCategoryPromotion(item)}
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    )
}
export default CategoryPromotion;