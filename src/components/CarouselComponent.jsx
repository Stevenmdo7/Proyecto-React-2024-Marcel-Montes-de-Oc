import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeFirebase2 } from "./Firebase2";
import "./CarouselComponent.css";

const dbFirebase2 = initializeFirebase2();

const CarouselComponent = () => {
  const [productData, setProductData] = useState([]);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(dbFirebase2, "Pasarela")
        );
        const products = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProductData(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleMouseEnter = () => {
    setIsMouseOver(true);
    setIsCarouselPaused(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
    setIsCarouselPaused(false);
  };

  const products = productData.map((item) => (
    <ProductCard
      key={item.id}
      name={item.name}
      img={item.img}
      price={item.price}
      description={item.description}
    />
  ));

  return (
    <div className="App">
      <div
        className="CarouselContainer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h1>¡Bienvenidos a nuestra tienda!</h1>
        <div className="CarouselWrapper">
          <Carousel
            showDots={true}
            responsive={responsive}
            infinite={true}
            autoPlay={!isCarouselPaused && !isMouseOver}
            autoPlaySpeed={2500}
            pauseOnHover={!isCarouselPaused}
          >
            {products}
          </Carousel>
        </div>
        <h2>¡Los mas comprados!</h2>
      </div>
    </div>
  );
};

export default CarouselComponent;
