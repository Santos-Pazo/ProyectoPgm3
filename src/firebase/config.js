
import app from 'firebase/app';
import firebase from 'firebase';
 
const firebaseConfig = {
    apiKey: "AIzaSyBx04nJXb133WzKxPR5iS9dYXMrTsSz0ak",
    authDomain: "proyectoprog-d7116.firebaseapp.com",
    projectId: "proyectoprog-d7116",
    storageBucket: "proyectoprog-d7116.appspot.com",
    messagingSenderId: "980164827243",
    appId: "1:980164827243:web:200f816f2e705607ee792e"
  };

app.initializeApp(firebaseConfig);
 
export const auth= firebase.auth();
export const storage= app.storage();
export const db= app.firestore();
