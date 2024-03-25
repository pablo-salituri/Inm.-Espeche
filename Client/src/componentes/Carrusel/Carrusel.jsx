import React from "react";
import { Carousel } from "react-bootstrap";
import carrucel1 from "../../assets/carrucel1.jpg";
import carrucel2 from "../../assets/carrucel2.jpg";
import carrucel4 from "../../assets/carrucel4.jpg";
import styles from "./Carrusel.module.css";

const Carrucel = () => {
  return (
    <div style={{ height: "100%" }}>
      <Carousel
        style={{
          /* width: "125%", marginLeft: "-11%" */
          height: "100%",
        }}
      >
        <Carousel.Item
          className={styles.carouselItem}
          style={{ height: "100%" }}
        >
          <img
            className="d-block w-100"
            src={carrucel1}
            alt="First slide"
            style={{ objectFit: "cover", height: "21vh" }}
          />
        </Carousel.Item>
        <Carousel.Item
          className={styles.carouselItem}
          style={{ height: "100%" }}
        >
          <img
            className="d-block w-100"
            src={carrucel2}
            alt="Second slide"
            style={{ objectFit: "cover", height: "21vh" }}
          />
        </Carousel.Item>
        <Carousel.Item
          className={styles.carouselItem}
          style={{ height: "100%" }}
        >
          <img
            className="d-block w-100"
            src={carrucel4}
            alt="Third slide"
            style={{ objectFit: "cover", height: "21vh" }}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Carrucel;
