// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyAY6SX-ZBTmldtEIfhoVFbVXTWcECmYeb0",
  authDomain: "bestbuylol.firebaseapp.com",
  projectId: "bestbuylol",
  storageBucket: "bestbuylol.appspot.com",
  messagingSenderId: "819133129105",
  appId: "1:819133129105:web:7e7c2666ca3c731fe6fa30"
};

console.log(process.env);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
setPersistence(auth, browserLocalPersistence);
export { db };
