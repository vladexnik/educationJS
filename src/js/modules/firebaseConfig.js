import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCF0RoMjWmezvWyXitGn2aAVqlp-bBTGqg",
  authDomain: "educateoop.firebaseapp.com",
  projectId: "educateoop",
  storageBucket: "educateoop.appspot.com",
  messagingSenderId: "134642381543",
  appId: "1:134642381543:web:359bdf338df7f81cc3e842"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);