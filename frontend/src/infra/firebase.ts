// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZAYC8FbvWQo_hv14MRpG4t78dLiw1xXk",
  authDomain: "jael-fb416.firebaseapp.com",
  projectId: "jael-fb416",
  storageBucket: "jael-fb416.firebasestorage.app",
  messagingSenderId: "553852554628",
  appId: "1:553852554628:web:95ad19257a731981a1a1d1",
  measurementId: "G-TCTFPQFZ2V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
