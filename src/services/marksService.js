import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

const marksCollection = collection(db, 'studentMarks');

// ✅ Create - Add new marks
export const addMarks = async (marksData) => {
    try {
        await addDoc(marksCollection, {
            ...marksData,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error("Add Marks Error:", error);
        return { success: false, error: error.message };
    }
};

// ✅ Read - Get all marks
export const getAllMarks = async () => {
    try {
        const snapshot = await getDocs(marksCollection);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return { success: true, data };
    } catch (error) {
        console.error("Get All Marks Error:", error);
        return { success: false, error: error.message };
    }
};

// ✅ Read with Filters - Get marks by branch and/or section (for teachers)
export const getStudentMarks = async (branch, section) => {
    try {
        const q = query(
            marksCollection,
            where('branch', '==', branch.toUpperCase()),
            where('section', '==', section.toUpperCase())
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return { success: true, data };
    } catch (error) {
        console.error("Get Filtered Marks Error:", error);
        return { success: false, error: error.message };
    }
};

// ✅ NEW - Get marks by student email (for students)
export const getStudentMarksByEmail = async (studentEmail) => {
    try {
        const q = query(
            marksCollection,
            where('studentEmail', '==', studentEmail)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return { success: true, data };
    } catch (error) {
        console.error("Get Student Marks by Email Error:", error);
        return { success: false, error: error.message };
    }
};

// ✅ NEW - Get marks by student ID (alternative method)
export const getStudentMarksById = async (studentId) => {
    try {
        const q = query(
            marksCollection,
            where('studentId', '==', studentId)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return { success: true, data };
    } catch (error) {
        console.error("Get Student Marks by ID Error:", error);
        return { success: false, error: error.message };
    }
};

// ✅ Update - Update specific marks by document ID
export const updateMarks = async (docId, updatedData) => {
    try {
        const docRef = doc(db, 'studentMarks', docId);
        await updateDoc(docRef, {
            ...updatedData,
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error("Update Marks Error:", error);
        return { success: false, error: error.message };
    }
};

// ✅ Delete - Delete a document by ID
export const deleteMarks = async (docId) => {
    try {
        await deleteDoc(doc(db, 'studentMarks', docId));
        return { success: true };
    } catch (error) {
        console.error("Delete Marks Error:", error);
        return { success: false, error: error.message };
    }
};