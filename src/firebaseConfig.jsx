import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyC3iuWmdDvY7cYo7vGnEORcOGBFqAINN64",
    authDomain: "reactauth-2525b.firebaseapp.com",
    projectId: "reactauth-2525b",
    storageBucket: "reactauth-2525b.firebasestorage.app",
    messagingSenderId: "624343253920",
    appId: "1:624343253920:web:f52e0949be446838771ac5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };