import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChange } from '../services/authService.js';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase.js';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChange(async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Get user role from Firestore
                    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                    if (userDoc.exists()) {
                        setUser(firebaseUser);
                        setUserRole(userDoc.data().role);
                    } else {
                        setUser(null);
                        setUserRole(null);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setUser(null);
                    setUserRole(null);
                }
            } else {
                setUser(null);
                setUserRole(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        user,
        userRole,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};