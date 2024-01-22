import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import "./ItemListContainer.css";
import Product from "./Product.jsx";
import { useCarrito } from "./context/CarritoContext";

function ItemListContainer({ greeting }) {
  const [productos, setProductos] = useState([]);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Maquillaje"));
        const products = [];
        querySnapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
        });
        setProductos(products);
      } catch (error) {
        console.error("Error al cargar productos desde Firebase:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="container mt-4 text-center">
      <h2
        className="animate__animated animate__fadeIn"
        style={{ marginTop: "70px" }}
      >
        {greeting}
      </h2>
      <div className="product-container">
        {productos.map((producto) => (
          <Product
            key={producto.id}
            id={producto.id}
            nombre={producto.name}
            descripcion={producto.description}
            precio={producto.price}
            imagen={producto.img}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;
