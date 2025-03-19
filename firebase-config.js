/// ✅ Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// ✅ Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7s5Pjjb0ctIs8oTSxRfQJRht-O6jLuE0",
    authDomain: "sender1-43e77.firebaseapp.com",
    databaseURL: "https://sender1-43e77-default-rtdb.firebaseio.com",
    projectId: "sender1-43e77",
    storageBucket: "sender1-43e77.appspot.com",
    messagingSenderId: "1072554763092",
    appId: "1:1072554763092:web:5422eab924c74c1dc11ec1",
    measurementId: "G-97NEN6WJ95"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// ✅ Export Firebase Modules
export { auth, database, ref, set, onValue };
