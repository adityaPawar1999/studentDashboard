import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCp9cG4Nbx31AqcltPHbTI8QYmC-iurigc",
    authDomain: "studentdashboard-7aa26.firebaseapp.com",
    projectId: "studentdashboard-7aa26",
    storageBucket: "studentdashboard-7aa26.firebasestorage.app",
    messagingSenderId: "884771627773",
    appId: "1:884771627773:web:47f5b0e5cdca8549589494",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);



