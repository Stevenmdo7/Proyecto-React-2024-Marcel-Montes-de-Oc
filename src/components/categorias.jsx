import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductosCategoria from "./ProductosCategoria";
import "./Categorias.css";

const Categorias = () => {
  const navigate = useNavigate();
  const { categoria } = useParams();

  const handleCategoriaClick = (categoria) => {
    navigate(`/categorias/${categoria.toLowerCase()}`);
  };

  return (
    <div>
      <div id="categorias-buttons">
        <button onClick={() => handleCategoriaClick("Labiales")}>
          Labiales
        </button>
        <button onClick={() => handleCategoriaClick("Bases")}>Bases</button>
        <button onClick={() => handleCategoriaClick("Desmaquillantes")}>
          Desmaquillantes
        </button>
        <button onClick={() => handleCategoriaClick("Sombras")}>Sombras</button>
        <button onClick={() => handleCategoriaClick("Delineadores")}>
          Delineadores
        </button>
        <button onClick={() => handleCategoriaClick("Polvos")}>Polvos</button>
        <button onClick={() => handleCategoriaClick("Rimels")}>Rimels</button>
        <button onClick={() => handleCategoriaClick("Esponjas")}>
          Esponjas
        </button>
        <button onClick={() => handleCategoriaClick("Kits")}>Kits</button>
      </div>
      {categoria && <ProductosCategoria categoria={categoria} />}
    </div>
  );
};

export default Categorias;
