import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Eye, LogOut, TrendingUp, Award, Calendar, BookOpen, AlertCircle } from 'lucide-react';
import { signOutUser } from './services/authService.js';
import { getStudentMarksByEmail, getStudentMarksById } from './services/marksService.js';
import { useAuth } from './context/AuthContext.jsx';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [marksList, setMarksList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            fetchStudentMarks();
        }
    }, [user]);

    const fetchStudentMarks = async () => {
        try {
            setLoading(true);
            setError('');

            // Try to fetch marks by email first
            let result = await getStudentMarksByEmail(user.email);

            // If no marks found by email, try by student ID
            if (result.success && result.data.length === 0) {
                result = await getStudentMarksById(user.uid);
            }

            if (result.success) {
                setMarksList(result.data);
                if (result.data.length === 0) {
                    setError('No marks found. Please contact your teacher if you believe this is an error.');
                }
            } else {
                setError(result.error || 'Failed to fetch marks');
            }
        } catch (error) {
            console.error('Fetch marks error:', error);
            setError('An unexpected error occurred while fetching your marks');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        const result = await signOutUser();
        if (result.success) {
            navigate('/');
        }
    };

    const calculateAverage = () => {
        if (marksList.length === 0) return '0.0';
        const total = marksList.reduce((sum, item) => sum + parseFloat(item.percentage), 0);
        return (total / marksList.length).toFixed(1);
    };

    const getGradeColor = (percentage) => {
        if (percentage >= 90) return 'badge-green';
        if (percentage >= 80) return 'badge-blue';
        if (percentage >= 70) return 'badge-yellow';
        if (percentage >= 60) return 'badge-orange';
        return 'badge-red';
    };

    const getGrade = (percentage) => {
        if (percentage >= 90) return 'A+';
        if (percentage >= 80) return 'A';
        if (percentage >= 70) return 'B+';
        if (percentage >= 60) return 'B';
        return 'C';
    };

    const getPeriodIcon = (period) => {
        const icons = {
            'mid1': '📝',
            'mid2': '📝',
            'assign1': '📋',
            'assign2': '📋',
            'lab': '🔬',
            'final': '📚'
        };
        return icons[period] || '📄';
    };

    const getPeriodLabel = (period) => {
        const labels = {
            'mid1': 'Mid-Term 1',
            'mid2': 'Mid-Term 2',
            'assign1': 'Assignment 1',
            'assign2': 'Assignment 2',
            'lab': 'Lab Internal',
            'final': 'Final Exam'
        };
        return labels[period] || period;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="spinner mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading your marks...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="header">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="icon-container-lg bg-gradient-blue">
                                <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
                                <p className="text-gray-600">Welcome, {user?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="btn btn-danger"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                {error && (
                    <div className="alert alert-error fade-in">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="card p-6 fade-in">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Assessments</p>
                                <p className="text-3xl font-bold text-gray-900">{marksList.length}</p>
                            </div>
                            <div className="icon-container-lg bg-gradient-blue">
                                <BookOpen className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="card p-6 fade-in" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Average Score</p>
                                <p className="text-3xl font-bold text-gray-900">{calculateAverage()}%</p>
                            </div>
                            <div className="icon-container-lg bg-gradient-green">
                                <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="card p-6 fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Highest Score</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {marksList.length > 0 ? Math.max(...marksList.map(m => parseFloat(m.percentage))).toFixed(1) : '0'}%
                                </p>
                            </div>
                            <div className="icon-container-lg bg-gradient-purple">
                                <Award className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Marks Table */}
                <div className="card-large fade-in" style={{ animationDelay: '0.3s' }}>
                    <div className="px-8 py-6 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <div className="icon-container-md bg-gradient-indigo">
                                <Eye className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Academic Performance</h2>
                                <p className="text-gray-600">Your marks across all assessments</p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        {marksList.length === 0 ? (
                            <div className="text-center py-12">
                                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">No marks available yet</p>
                                <p className="text-gray-400">Your marks will appear here once uploaded by teachers</p>
                                <button
                                    onClick={fetchStudentMarks}
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Refresh
                                </button>
                            </div>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="text-left">Assessment</th>
                                        <th className="text-center">Marks Obtained</th>
                                        <th className="text-center">Max Marks</th>
                                        <th className="text-center">Percentage</th>
                                        <th className="text-center">Grade</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {marksList.map((item, idx) => (
                                        <tr key={idx} className="slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                                            <td>
                                                <div className="flex items-center space-x-4">
                                                    <div className="icon-container-lg bg-gradient-blue">
                                                        <span className="text-white text-lg">{getPeriodIcon(item.period)}</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-semibold text-gray-900">{getPeriodLabel(item.period)}</p>
                                                        <p className="text-sm text-gray-500">{item.year} - {item.branch} {item.section}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <span className="text-2xl font-bold text-gray-900">{item.marks}</span>
                                            </td>
                                            <td className="text-center">
                                                <span className="text-lg text-gray-600">{item.maxMarks}</span>
                                            </td>
                                            <td className="text-center">
                                                <div className="flex items-center justify-center space-x-2">
                                                    <div className="progress-bar">
                                                        <div
                                                            className="progress-fill progress-blue"
                                                            style={{ width: `${item.percentage}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-lg font-semibold text-gray-900">{item.percentage}%</span>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <span className={`badge ${getGradeColor(parseFloat(item.percentage))}`}>
                                                    {getGrade(parseFloat(item.percentage))}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Summary Footer */}
                    {marksList.length > 0 && (
                        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <Calendar className="h-5 w-5 text-gray-400" />
                                    <span className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600">Overall Average</p>
                                    <p className="text-2xl font-bold text-gray-900">{calculateAverage()}%</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;