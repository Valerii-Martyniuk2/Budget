import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtZ0JC55Yf3K8X7j0ecoqk7KrKEAqzCZM",
  authDomain: "budget-689a8.firebaseapp.com",
  projectId: "budget-689a8",
  storageBucket: "budget-689a8.appspot.com",
  messagingSenderId: "81976532392",
  appId: "1:81976532392:web:13e9c1e66a309becc6919d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
