import React from 'react';
import Slider from "react-slick";
import ItemVideoSong from './ItemVideoSong';

const SquareTwoLiines = (props) => {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 10.2,
        slidesToScroll: 2,
        //initialSlide: 0,
        lazyLoad: false,
        rows: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 8.2
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 7.2
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 4.2,
                    rows: 2,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3.2,
                    rows: 2,
                    arrows: false
                }
            }
        ]
    };
    return (
        <div>
            <Slider {...settings}>

                {
                    props.data.map((item) => {
                        return (
                            <div key={"square-two-lines-" + item.id}>
                                <ItemVideoSong data={item} type={props.type} />
                            </div>
                        );
                    })
                }

            </Slider>
        </div>
    )
}
export default SquareTwoLiines;