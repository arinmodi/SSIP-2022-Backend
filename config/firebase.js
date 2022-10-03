const { initializeApp } = require("firebase/app");
const { uploadBytes, getStorage, ref, getDownloadURL } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyCKApz8mVhc6e_gqXougfg1Yy4mFqi63Y0",
  authDomain: "ssip-2022.firebaseapp.com",
  projectId: "ssip-2022",
  storageBucket: "ssip-2022.appspot.com",
  messagingSenderId: "837887226215",
  appId: "1:837887226215:web:e08efdc87eecede2557fc2",
  measurementId: "G-TR67TQ9L4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = { storage, uploadBytes, ref, getDownloadURL }