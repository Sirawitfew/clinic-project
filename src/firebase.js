import { initializeApp } from 'firebase/app'
import { getFirestore , connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
    apiKey: 'AIzaSyA4XXl12m7X5r4Mpx3TEa92w-W6t_aFzBs',
    authDomain: 'clinic-final-pj.firebaseapp.com',
    databaseURL: 'https://clinic-final-pj-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'clinic-final-pj',
    storageBucket: 'clinic-final-pj.appspot.com',
    messagingSenderId: '674039328648',
    appId: '1:674039328648:web:4f7c8897005fd151e3543d'
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
connectFirestoreEmulator(db, '127.0.0.1', 8080)

const auth = getAuth(app);
connectAuthEmulator(auth, "http://127.0.0.1:9099");

export {
    db,
    auth
}