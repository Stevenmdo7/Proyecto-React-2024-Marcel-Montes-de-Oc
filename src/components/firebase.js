import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtq4tNi77jj0wNLw3QvnF6F9KZIzHJJWk",
  authDomain: "proyecto-e-commerce-bc512.firebaseapp.com",
  projectId: "proyecto-e-commerce-bc512",
  storageBucket: "proyecto-e-commerce-bc512.appspot.com",
  messagingSenderId: "570622130430",
  appId: "1:570622130430:web:455fdb56215500f2ca8daf"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);