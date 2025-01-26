// firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDdbzDqzZ8Jj66HxRkAimb45q_9L_X7cXE",
  authDomain: "planta-en-marte.firebaseapp.com",
  databaseURL: "https://planta-en-marte-default-rtdb.firebaseio.com",
  projectId: "planta-en-marte",
  storageBucket: "planta-en-marte.firebasestorage.app",
  messagingSenderId: "971753485789",
  appId: "1:971753485789:web:aed27e003d3e2d9685f234"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
