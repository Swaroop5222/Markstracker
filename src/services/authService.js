import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase.js';

// Sign in user
export const signInUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Get user role from Firestore using UID
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            return {
                user,
                role: userData.role, // could be 'teacher' or 'student'
                success: true
            };
        } else {
            throw new Error('User profile not found in Firestore.');
        }
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

// Register new user
export const registerUser = async (email, password, role, additionalData = {}) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user role in Firestore
        await setDoc(doc(db, 'users', user.uid), {
            email,
            role: role.toLowerCase(), // Normalize role casing
            createdAt: new Date().toISOString(),
            ...additionalData
        });

        return {
            user,
            role,
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

// Sign out user
export const signOutUser = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};
