import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig2 = {
  apiKey: "AIzaSyC63HTu7IOl-sgFzGynS60CBptbRE9pd0U",
  authDomain: "reactjs-pasarella.firebaseapp.com",
  projectId: "reactjs-pasarella",
  storageBucket: "reactjs-pasarella.appspot.com",
  messagingSenderId: "217369262242",
  appId: "1:217369262242:web:641604d1309b0a1d2d7ffb",
};

let app2;

export const initializeFirebase2 = () => {
  if (!app2) {
    app2 = initializeApp(firebaseConfig2, "[SECONDARY]");
  }
  return getFirestore(app2);
};

export default initializeFirebase2;
