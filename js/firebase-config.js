
// js/firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyDyHr2H_Bj8eMvuQTBtAQQ2CHqpHvxYQ7w",
    authDomain: "inmobilaria-509d0.firebaseapp.com",
    projectId: "inmobilaria-509d0",
    storageBucket: "inmobilaria-509d0.firebasestorage.app",
    messagingSenderId: "629838176125",
    appId: "1:629838176125:web:30a6f94db65537ecee7614",
    measurementId: "G-2M771PBSKG"
};

// Inicializar Firebase (CDN global)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();