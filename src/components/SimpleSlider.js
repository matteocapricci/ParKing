import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div style={{ marginLeft: "0px", marginRight: "0px", width: "100%" }}>
      <Slider style={{ marginLeft: "0px", marginRight: "0px", width: "100%" }} {...settings}>
        {images.map((img, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                overflow: "hidden"
              }}
            >
              <img
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto"
                }}
                src={img}
                alt={`Img ${index + 1}`}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
