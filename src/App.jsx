import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import Categorias from "./components/categorias";
import Checkout from "./components/Checkout";
import { CarritoProvider } from "./components/context/CarritoContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import Contact from "./components/Contact.jsx";

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

  const handleClick = () => {
    setIsLoading(true);
    fetch("https://3fj2rkvc6eyxcvxuc6w4j2g4cq0usgjz.lambda-url.us-east-2.on.aws/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
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

  return (
    <Router>
      <CarritoProvider>
        <div className="text-center">
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={<ItemListContainer greeting="¡Bienvenido a nuestra tienda!" />}
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
          </Routes>
          <ToastContainer position="top-center" autoClose={2500} />
        </div>
      </CarritoProvider>
    </Router>
  );
}

export default App;
