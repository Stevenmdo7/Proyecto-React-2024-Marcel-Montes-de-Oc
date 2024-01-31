import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import Categorias from "./components/categorias";
import Checkout from "./components/Checkout";
import { CarritoProvider } from "./components/context/CarritoContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import SobreNosotros from "./components/SobreNosotros";
import Contact from "./components/Contact.jsx";
import ComoPagar from "./components/ComoPagar.jsx";
import "animate.css";
import CarouselComponent from "./components/CarouselComponent.jsx";
import ProductCard from "./components/ProductCard.jsx";
import "./App.css";

function App() {
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    quantity: "1",
    price: "10",
    amount: 10,
    description: "Some book",
  });

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    setIsLoading(true);
    fetch(
      "https://3fj2rkvc6eyxcvxuc6w4j2g4cq0usgjz.lambda-url.us-east-2.on.aws/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    )
      .then((response) => response.json())
      .then((preference) => {
        setPreferenceId(preference.id);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (values) => {
    if (values.length > 0) {
      const selectedValue = values[0].value;
      navigate(selectedValue);
    }
  };

  return (
    
    <CarritoProvider>
      
      <div className="text-center">
        <NavBar handleChange={handleChange} />
        <Routes>
        <Route
            path="/"
            element={
             <CarouselComponent />
            }
          />
          <Route
            path="/catalogo"
            element={
              <ItemListContainer />
            }
          />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/categorias/:categoria" element={<Categorias />} />
          <Route
            path="/checkout"
            element={
              <Checkout
                onClick={handleClick}
                preferenceId={preferenceId}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/sobre_nosotros" element={<SobreNosotros />} />
          <Route path="/como-pagar" element={<ComoPagar />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={2500} />
        
      </div>
    </CarritoProvider>
  );
}

export default App;
