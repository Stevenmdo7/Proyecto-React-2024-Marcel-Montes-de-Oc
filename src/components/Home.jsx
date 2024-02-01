import React from "react";
import ItemListContainer from "./ItemListContainer";

const Home = () => {
  return (
    <div>
      <h3>Productos Destacados</h3>
      <ItemListContainer greeting="¡Bienvenido a nuestra tienda!" />
    </div>
  );
};

export default Home;
