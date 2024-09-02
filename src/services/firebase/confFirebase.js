import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, updateProfile  } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCkcbWKo75lIsZ-z5DdFj7LRAjBeQD9X1U",
  authDomain: "parking-11ff0.firebaseapp.com",
  databaseURL: "https://parking-11ff0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "parking-11ff0",
  storageBucket: "parking-11ff0.appspot.com",
  messagingSenderId: "628164372688",
  appId: "1:628164372688:web:35520b38f8126e32e5d6d5",
  measurementId: "G-DPSZWES8WV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage=getStorage(app);