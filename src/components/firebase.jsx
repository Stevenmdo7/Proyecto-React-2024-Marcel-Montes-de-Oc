import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

const extractModelosFromDocData = (docData) => {
  const modelos = [];
  for (const key in docData) {
    if (key.startsWith("model")) {
      modelos.push(docData[key]);
    }
  }
  return modelos;
};

const getProductsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, "Maquillaje"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);

    const products = [];
    querySnapshot.forEach((doc) => {
      const product = {
        id: doc.id,
        nombre: doc.data().name,
        descripcion: doc.data().description,
        precio: doc.data().price,
        imagen: doc.data().img,
        imagen2: doc.data().img2,
        categoria: doc.data().category,
        modelos: extractModelosFromDocData(doc.data()), // Obtener modelos
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
        modelos: extractModelosFromDocData(doc.data()),
      };
      products.push(product);
    });
    return products;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

const getCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Maquillaje"));
    const categories = new Set();
    querySnapshot.forEach((doc) => {
      categories.add(doc.data().category);
    });
    return Array.from(categories);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  }
};

export { getProductsByCategory, getProducts, getCategories, extractModelosFromDocData };
