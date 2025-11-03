// Import the functions you need from the SDKs you need
import app from 'firebase/app'
import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHJBmjqCOt8QgiH7iX8naGeprcO23iIaM",
  authDomain: "crisramonpedro.firebaseapp.com",
  projectId: "crisramonpedro",
  storageBucket: "crisramonpedro.firebasestorage.app",
  messagingSenderId: "421007739701",
  appId: "1:421007739701:web:b3803df9c336340032da7c"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()