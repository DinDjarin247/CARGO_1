import React, { useState } from "react";
import "./BMI.css";

const images = ["w1.gif", "w2.gif", "w3.gif", "w4.gif", "w6.gif", "w7.gif"];

function BMI() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const showSlide = (index) => {
    if (index >= images.length) {
      setCurrentSlide(0);
    } else if (index < 0) {
      setCurrentSlide(images.length - 1);
    } else {
      setCurrentSlide(index);
    }
  };

  const changeSlide = (step) => {
    showSlide(currentSlide + step);
  };

  return (
    <div className="slider">
      <div className="slides">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            className="slide"
            alt={`Slide ${index}`}
            style={{ display: index === currentSlide ? "block" : "none" }}
          />
        ))}
      </div>
      <button className="prev" onClick={() => changeSlide(-1)}>
        &#10094;
      </button>
      <button className="next" onClick={() => changeSlide(1)}>
        &#10095;
      </button>
    </div>
  );
}

export default BMI;
