import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig2 = {
  apiKey: "AIzaSyCOWDYryt_G4KkcjPuu4aZiE3fg8lQGzTU",
  authDomain: "typ-pasarela.firebaseapp.com",
  projectId: "typ-pasarela",
  storageBucket: "typ-pasarela.appspot.com",
  messagingSenderId: "430983060512",
  appId: "1:430983060512:web:2eb90e39f63c2e6479b045"
};

let app2;

export const initializeFirebase2 = () => {
  if (!app2) {
    app2 = initializeApp(firebaseConfig2, "[SECONDARY]");
  }
  return getFirestore(app2);
};

export default initializeFirebase2;
