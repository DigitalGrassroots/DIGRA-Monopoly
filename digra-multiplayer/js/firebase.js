// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyBuMuTyZlfKPRKf3VMoUi36OYjj6bmOcP8",
    authDomain: "digra-57268.firebaseapp.com",
    projectId: "digra-57268",
    storageBucket: "digra-57268.appspot.com",
    messagingSenderId: "1067149621501",
    appId: "1:1067149621501:web:f758ffa1f65d354bfca694",
    measurementId: "G-36048C87FT"
};

// Initialize Firebase
app = initializeApp(firebaseConfig);


import { getDatabase, set, get, update, remove, ref, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

db = getDatabase();

export { initializeApp, getDatabase, set, get, update, remove, ref, child };