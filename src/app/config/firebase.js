import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDQHeqHn5wtIG74rn6ZDin0OYsTtazVSdg",
  authDomain: "portfolio-sanjay-feb04.firebaseapp.com",
  projectId: "portfolio-sanjay-feb04",
  storageBucket: "portfolio-sanjay-feb04.appspot.com",
  messagingSenderId: "555307684881",
  appId: "1:555307684881:web:b0574c4bfbf3bc635acdb0"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
