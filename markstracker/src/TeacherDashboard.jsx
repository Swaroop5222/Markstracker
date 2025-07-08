import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Upload, LogOut, AlertCircle, CheckCircle } from 'lucide-react';
import { signOutUser } from './services/authService.js';
import { useAuth } from './context/AuthContext.jsx';
import {
    addMarks,
    getStudentMarks,
    deleteMarks,
    updateMarks
} from './services/marksService.js';

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [form, setForm] = useState({
        year: '',
        branch: '',
        section: '',
        rollNumber: '',
        studentName: '',
        studentEmail: '', // Added student email field
        studentId: '',
        period: '',
        marks: '',
        maxMarks: '100'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [students, setStudents] = useState([]);
    const [filter, setFilter] = useState({ branch: '', section: '' });
    const [editingStudent, setEditingStudent] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setMessage({ type: '', text: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            const marksData = {
                year: form.year,
                branch: form.branch.toUpperCase(),
                section: form.section.toUpperCase(),
                rollNumber: form.rollNumber,
                studentName: form.studentName,
                studentEmail: form.studentEmail, // Include student email
                studentId: form.studentId || `${form.year}${form.branch}${form.section}${form.rollNumber}`,
                period: form.period,
                marks: parseInt(form.marks),
                maxMarks: parseInt(form.maxMarks),
                percentage: ((parseInt(form.marks) / parseInt(form.maxMarks)) * 100).toFixed(2),
                teacherId: user.uid
            };

            const result = await addMarks(marksData);

            if (result.success) {
                setMessage({
                    type: 'success',
                    text: `Marks uploaded successfully for ${form.studentName} (Roll: ${form.rollNumber})`
                });
                setForm({
                    year: '',
                    branch: '',
                    section: '',
                    rollNumber: '',
                    studentName: '',
                    studentEmail: '',
                    studentId: '',
                    period: '',
                    marks: '',
                    maxMarks: '100'
                });
            } else {
                setMessage({ type: 'error', text: result.error || 'Upload failed.' });
            }
        } catch (error) {
            console.error('Submit error:', error);
            setMessage({ type: 'error', text: 'Unexpected error. Please try again.' });
        }

        setIsSubmitting(false);
    };

    const handleFetchStudents = async () => {
        if (!filter.branch || !filter.section) {
            setMessage({ type: 'error', text: 'Please enter both branch and section' });
            return;
        }

        const result = await getStudentMarks(filter.branch, filter.section);
        if (result.success) {
            setStudents(result.data);
            if (result.data.length === 0) {
                setMessage({ type: 'info', text: 'No marks found for this branch and section' });
            }
        } else {
            setMessage({ type: 'error', text: result.error });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this entry?")) return;

        const result = await deleteMarks(id);
        if (result.success) {
            setStudents(students.filter(s => s.id !== id));
            setMessage({ type: 'success', text: 'Entry deleted successfully.' });
        } else {
            setMessage({ type: 'error', text: result.error });
        }
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        setForm({
            ...student,
            marks: student.marks.toString(),
            maxMarks: student.maxMarks.toString()
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const updated = {
            year: form.year,
            branch: form.branch.toUpperCase(),
            section: form.section.toUpperCase(),
            rollNumber: form.rollNumber,
            studentName: form.studentName,
            studentEmail: form.studentEmail,
            period: form.period,
            marks: parseInt(form.marks),
            maxMarks: parseInt(form.maxMarks),
            percentage: ((parseInt(form.marks) / parseInt(form.maxMarks)) * 100).toFixed(2)
        };

        const result = await updateMarks(editingStudent.id, updated);
        if (result.success) {
            setMessage({ type: 'success', text: 'Marks updated successfully.' });
            setEditingStudent(null);
            setForm({
                year: '',
                branch: '',
                section: '',
                rollNumber: '',
                studentName: '',
                studentEmail: '',
                studentId: '',
                period: '',
                marks: '',
                maxMarks: '100'
            });
            handleFetchStudents();
        } else {
            setMessage({ type: 'error', text: result.error });
        }
        setIsSubmitting(false);
    };

    const handleCancelEdit = () => {
        setEditingStudent(null);
        setForm({
            year: '',
            branch: '',
            section: '',
            rollNumber: '',
            studentName: '',
            studentEmail: '',
            studentId: '',
            period: '',
            marks: '',
            maxMarks: '100'
        });
    };

    const handleLogout = async () => {
        const result = await signOutUser();
        if (result.success) navigate('/');
    };

    const periodOptions = [
        { value: 'mid1', label: 'Mid-Term 1' },
        { value: 'mid2', label: 'Mid-Term 2' },
        { value: 'assign1', label: 'Assignment 1' },
        { value: 'assign2', label: 'Assignment 2' },
        { value: 'lab', label: 'Lab Internal' },
        { value: 'final', label: 'Final Exam' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br">
            {/* Header */}
            <header className="header">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="icon-container-lg bg-gradient-blue">
                                <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
                                <p className="text-gray-600">Welcome, {user?.email}</p>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="btn btn-danger">
                            <LogOut className="h-4 w-4 mr-2" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="card-large p-8">
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="icon-container-md bg-gradient-green">
                            <Upload className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {editingStudent ? 'Edit Student Marks' : 'Upload Student Marks'}
                            </h2>
                            <p className="text-gray-600">
                                {editingStudent ? 'Update the marks information' : 'Enter student details and marks information'}
                            </p>
                        </div>
                    </div>

                    {/* Message */}
                    {message.text && (
                        <div className={`mb-6 px-4 py-3 rounded-lg flex items-center ${message.type === 'success'
                            ? 'bg-green-100 border border-green-400 text-green-700'
                            : 'bg-red-100 border border-red-400 text-red-700'
                            }`}>
                            {message.type === 'success' ? (
                                <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                            ) : (
                                <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                            )}
                            <span>{message.text}</span>
                        </div>
                    )}

                    {/* Upload/Edit Form */}
                    <form onSubmit={editingStudent ? handleUpdate : handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="year"
                            placeholder="Academic Year (e.g., 2024)"
                            value={form.year}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                        <select
                            name="branch"
                            value={form.branch}
                            onChange={handleChange}
                            required
                            className="form-select"
                        >
                            <option value="">Select Branch</option>
                            <option value="CSE">CSE</option>
                            <option value="CSD">CSD</option>
                            <option value="CSM">CSM</option>
                            <option value="ECE">ECE</option>
                            <option value="EEE">EEE</option>
                            <option value="CIVIL">CIVIL</option>
                            <option value="MECH">MECH</option>
                            <option value="IT">IT</option>
                            <option value="MBA">MBA</option>
                        </select>
                        <input
                            name="section"
                            placeholder="Section (e.g., A)"
                            value={form.section}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                        <input
                            name="rollNumber"
                            placeholder="Roll Number (e.g., 21A91A0501)"
                            value={form.rollNumber}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                        <input
                            name="studentName"
                            placeholder="Student Full Name"
                            value={form.studentName}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                        <input
                            name="studentEmail"
                            type="email"
                            placeholder="Student Email Address"
                            value={form.studentEmail}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                        <select
                            name="period"
                            value={form.period}
                            onChange={handleChange}
                            required
                            className="form-select"
                        >
                            <option value="">Select Assessment Period</option>
                            {periodOptions.map(p => (
                                <option key={p.value} value={p.value}>{p.label}</option>
                            ))}
                        </select>
                        <input
                            name="marks"
                            type="number"
                            placeholder="Marks Obtained"
                            value={form.marks}
                            onChange={handleChange}
                            required
                            min="0"
                            className="form-input"
                        />
                        <input
                            name="maxMarks"
                            type="number"
                            placeholder="Maximum Marks"
                            value={form.maxMarks}
                            onChange={handleChange}
                            required
                            min="1"
                            className="form-input"
                        />
                        <div className="col-span-full flex gap-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-success flex-1"
                            >
                                {isSubmitting ? (
                                    editingStudent ? 'Updating...' : 'Uploading...'
                                ) : (
                                    editingStudent ? 'Update Marks' : 'Submit Marks'
                                )}
                            </button>
                            {editingStudent && (
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* View/Manage Section */}
                <div className="card-large p-6 mt-8">
                    <h2 className="text-xl font-semibold mb-4">View / Manage Student Marks</h2>
                    <div className="flex gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Branch (e.g. CSE)"
                            value={filter.branch}
                            onChange={(e) => setFilter({ ...filter, branch: e.target.value })}
                            className="form-input"
                        />
                        <input
                            type="text"
                            placeholder="Section (e.g. A)"
                            value={filter.section}
                            onChange={(e) => setFilter({ ...filter, section: e.target.value })}
                            className="form-input"
                        />
                        <button onClick={handleFetchStudents} className="btn btn-primary">Get Students</button>
                    </div>

                    {students.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full text-left border-collapse border">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border px-4 py-2">Roll No.</th>
                                        <th className="border px-4 py-2">Name</th>
                                        <th className="border px-4 py-2">Email</th>
                                        <th className="border px-4 py-2">Period</th>
                                        <th className="border px-4 py-2">Marks</th>
                                        <th className="border px-4 py-2">Percentage</th>
                                        <th className="border px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map(student => (
                                        <tr key={student.id}>
                                            <td className="border px-4 py-2 font-medium">{student.rollNumber}</td>
                                            <td className="border px-4 py-2">{student.studentName}</td>
                                            <td className="border px-4 py-2 text-sm text-gray-600">{student.studentEmail}</td>
                                            <td className="border px-4 py-2 text-center">
                                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                                    {student.period}
                                                </span>
                                            </td>
                                            <td className="border px-4 py-2 text-center font-semibold">
                                                {student.marks}/{student.maxMarks}
                                            </td>
                                            <td className="border px-4 py-2 text-center">
                                                <span className="font-semibold">{student.percentage}%</span>
                                            </td>
                                            <td className="border px-4 py-2 text-center space-x-2">
                                                <button
                                                    onClick={() => handleEdit(student)}
                                                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(student.id)}
                                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default TeacherDashboard;