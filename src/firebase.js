// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyB-eRO_ICwhHIr0XZzhyQPrcFrdTMUFuWg",
//   authDomain: "trackline-sols.firebaseapp.com",
//   projectId: "trackline-sols",
//   storageBucket: "trackline-sols.appspot.com",
//   messagingSenderId: "416352605191",
//   appId: "1:416352605191:web:d25e861739ad7a0b0b86a2",
//   measurementId: "G-GJDWNC2HEY",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCG0mRC4fNRMr1Vp4uKoqylphYbUGZkRy4",
  authDomain: "control-emission.firebaseapp.com",
  projectId: "control-emission",
  storageBucket: "control-emission.appspot.com",
  messagingSenderId: "140116332751",
  appId: "1:140116332751:web:b386bfe032759140c4a7ba",
  measurementId: "G-V517TKNHE1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// For Administrative tasks (creating new user without authenticating)
const secondaryApp = initializeApp(firebaseConfig, "Secondary");
export const adminAuth = getAuth(secondaryApp);
