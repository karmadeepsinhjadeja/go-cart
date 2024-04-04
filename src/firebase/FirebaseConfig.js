import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSswxIINXXtbvgEYsbH9XZRdZPkY_6HNc",
  authDomain: "go-cart-ae58d.firebaseapp.com",
  projectId: "go-cart-ae58d",
  storageBucket: "go-cart-ae58d.appspot.com",
  messagingSenderId: "422736843227",
  appId: "1:422736843227:web:eaac726a278da41ae1d7fe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
export { fireDB, auth };
