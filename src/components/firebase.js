import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig =  {
  apiKey: "AIzaSyCygD4lfcjwr7qswTCZQYMlZxAZtKpDkUk",
  authDomain: "typmaquillaje-d61e2.firebaseapp.com",
  projectId: "typmaquillaje-d61e2",
  storageBucket: "typmaquillaje-d61e2.appspot.com",
  messagingSenderId: "570796123175",
  appId: "1:570796123175:web:1d130589adef9a71711a02"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
