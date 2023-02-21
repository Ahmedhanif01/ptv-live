import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const Promotion = (props) => {
  const settings = {
    dots: false,
    //lazyLoad: true,
    infinite: true,
    className: "center",
    centerMode: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1.9,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          arrows: false,
        },
      },
      {
        breakpoint: 769,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          infinite: true,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="sliderTop">
      {props.links.map((item) => {
        return (
          <div key={Math.random() + item.id}>
            {
              item.linkAddress.length ?
                <Link
                  to={ {pathname: "/livestream", state: item }}
                >
                  <img className="imgSlider" src={item.thumbnail} alt="" />
                </Link>
                :
                  <img 
                    className="imgSlider"
                    src={item.thumbnail} alt="" 
                    style={{cursor: 'pointer'}}
                    onClick= { () => window.open('https://cricwick.net/fantasy') } />
            }
          </div>
        );
      })}
    </Slider>
  );
};

export default Promotion;
