// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";


//Importo las variables de entorno de Firebase
const apiKeyFromEnv = process.env.REACT_APP_FIREBASE_API_KEY
const authDomainFromEnv = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
const projectIdFromEnv = process.env.REACT_APP_FIREBASE_PROJECT_ID
const storageBucketFromEnv = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
const messagingSenderIdFromEnv = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
const appIdFromEnv = process.env.REACT_APP_FIREBASE_APP_ID

// Añade aquí tus credenciales
const firebaseConfig = {
    apiKey: apiKeyFromEnv,
    authDomain: authDomainFromEnv,
    projectId: projectIdFromEnv,
    storageBucket: storageBucketFromEnv,
    messagingSenderId: messagingSenderIdFromEnv,
    appId: appIdFromEnv,
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;