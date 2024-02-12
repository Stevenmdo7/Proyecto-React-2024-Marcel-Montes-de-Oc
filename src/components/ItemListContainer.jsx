// ItemListContainer.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import "./ItemListContainer.css";
import Product from "./Product.jsx";
import { useCarrito } from "./context/CarritoContext";
import { getCategories, extractModelosFromDocData } from "./firebase.jsx";

function ItemListContainer({ greeting }) {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("Mostrar todo");
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        let q;
        if (categoriaSeleccionada === "Mostrar todo") {
          q = collection(db, "Maquillaje");
        } else {
          q = query(
            collection(db, "Maquillaje"),
            where("category", "==", categoriaSeleccionada)
          );
        }
        const querySnapshot = await getDocs(q);
        const products = [];
        querySnapshot.forEach((doc) => {
          const productData = doc.data();
          const modelos = extractModelosFromDocData(productData);
          products.push({
            id: doc.id,
            ...productData,
            modelos,
            imagenes: getProductImages(productData),
          });
        });
        setProductos(products);
      } catch (error) {
        console.error("Error al cargar productos desde Firebase:", error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const categorias = await getCategories();
        setCategorias(["Mostrar todo", ...categorias]);
      } catch (error) {
        console.error("Error al cargar categorías desde Firebase:", error);
      }
    };

    fetchProductos();
    fetchCategorias();
  }, [categoriaSeleccionada]);

  const handleCategoriaChange = (e) => {
    setCategoriaSeleccionada(e.target.value);
  };

  const getProductImages = (product) => {
    const images = [];
    let i = 1;
    while (product[`img${i}`]) {
      images.push(product[`img${i}`]);
      i++;
    }
    return images;
  };

  return (
    <div
      className="container mt-4 text-center"
      style={{ overflowY: "auto", minHeight: "500px" }}
    >
      <div>
        <h2 className=".h2">Catalogo</h2>
      </div>
      <div className="label-container">
        <label>Ordenar por categoría:</label>
        <select value={categoriaSeleccionada} onChange={handleCategoriaChange}>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>
      <div className="product-container">
        {productos.map((producto) => (
          <Product
            key={producto.id}
            {...producto}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;
