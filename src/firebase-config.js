import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBPLVE2H7OAAG0vKA_Yj4XL7tagnnYtMI",
  authDomain: "threexpo-aut.firebaseapp.com",
  projectId: "threexpo-aut",
  storageBucket: "threexpo-aut.appspot.com",
  messagingSenderId: "236550975959",
  appId: "1:236550975959:web:1cb42ea74af5c0c7299b92",
  measurementId: "G-1ZSMXKJDDJ",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
