// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// Replace these placeholder values with your actual Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAzAMLSbS3tZhpe7l-YOdPFQ9wDl_5GO7s",
    authDomain: "marks-tracker-28a28.firebaseapp.com",
    projectId: "marks-tracker-28a28",
    storageBucket: "marks-tracker-28a28.firebasestorage.app",
    messagingSenderId: "469136985188",
    appId: "1:469136985188:web:ed8b09cf8a19395bfaa371"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;