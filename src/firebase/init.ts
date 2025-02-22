import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCqReX1RpJ9MoCr4aSlLRkiv-gUXuVVHA",
    authDomain: "open-class-modelagerm.firebaseapp.com",
    projectId: "open-class-modelagerm",
    storageBucket: "open-class-modelagerm.appspot.com",
    messagingSenderId: "250839182667",
    appId: "1:250839182667:web:464a2b344f9be2ad020cce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();


provider.setCustomParameters({   
    prompt : "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(app);