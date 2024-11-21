import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCSHwXj4LIt1dJ_vWbaSDyYGUb1weOBsds",
  authDomain: "tamazine-29548.firebaseapp.com",
  projectId: "tamazine-29548",
  storageBucket: "tamazine-29548.firebasestorage.app",
  messagingSenderId: "602488949662",
  appId: "1:602488949662:web:29b9b654401587b405e48f",
  measurementId: "G-SPZ3NRYP1B"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); 
const analytics = getAnalytics(app); 

async function subirImagen(file) {
    try {
        const storageRef = ref(storage, `imagenes/${file.name}`); 
        const snapshot = await uploadBytes(storageRef, file); 
        const downloadURL = await getDownloadURL(storageRef); 
        return downloadURL; 
    } catch (error) {
        console.error("Error al subir la imagen:", error); 
    }
}

export { subirImagen }; 
