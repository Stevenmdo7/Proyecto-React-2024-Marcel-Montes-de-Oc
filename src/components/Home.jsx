import React from "react";
import ItemListContainer from "./ItemListContainer";

const Home = () => {
  return (
    <div>
      <h2>Productos Destacados</h2>
      <ItemListContainer greeting="¡Bienvenido a nuestra tienda!" />
    </div>
  );
};

export default Home;
