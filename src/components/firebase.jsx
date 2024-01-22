import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

const getProductsByCategory = async (category) => {
  try {
    const q = query(collection(db, "Maquillaje"), where("category", "==", category));
    const querySnapshot = await getDocs(q);

    const products = [];
    querySnapshot.forEach((doc) => {
      const product = {
        id: doc.id,
        nombre: doc.data().name,
        descripcion: doc.data().description,
        precio: doc.data().price,
        imagen: doc.data().img,
        categoria: doc.data().category,
      };
      products.push(product);
    });

    return products;
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    throw error;
  }
};

const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Maquillaje")); 
    const products = [];
    querySnapshot.forEach((doc) => {
      const product = {
        id: doc.id,
        nombre: doc.data().name,
        descripcion: doc.data().description,
        precio: doc.data().price,
        imagen: doc.data().img,
        categoria: doc.data().category,
      };
      products.push(product);
    });
    return products;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

export { getProductsByCategory, getProducts };
