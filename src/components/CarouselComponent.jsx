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
          showAlternateImage: false,
        }));
        setProductData(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleMouseEnter = () => {
    setIsMouseOver(true);
    setIsCarouselPaused(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
    setIsCarouselPaused(false);
  };

  const handleToggleAlternateImage = (productId) => {
    setProductData((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, showAlternateImage: !product.showAlternateImage }
          : product
      )
    );
  };

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
      breakpoint: { max: 800, min: 0 },
      items: 2,
    },
  };

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
            {productData.map((item) => (
              <div className="card-container" key={item.id}>
                <ProductCard
                  id={item.id}
                  name={item.name}
                  img={item.img}
                  img2={item.img2}
                  price={item.price}
                  description={item.description}
                  showAlternateImage={item.showAlternateImage}
                  model={Object.keys(item)
                    .filter((key) => key.startsWith("model"))
                    .map((key) => item[key])}
                  onToggleAlternateImage={handleToggleAlternateImage}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <h2>¡Los mas comprados!</h2>
      </div>
    </div>
  );
};

export default CarouselComponent;
