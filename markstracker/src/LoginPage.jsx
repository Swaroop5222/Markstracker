import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Users, ArrowRight } from 'lucide-react';
import { signInUser } from './services/authService.js';

const LoginPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
        role: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!form.role) {
            setError('Please select a role');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const result = await signInUser(form.email, form.password);

            if (result.success) {
                const userRole = result.role.toLowerCase();
                const selectedRole = form.role.toLowerCase();

                if (userRole !== selectedRole) {
                    setError(`You're registered as a ${userRole}, not a ${selectedRole}`);
                    setIsLoading(false);
                    return;
                }

                // Navigate based on role
                if (userRole === 'teacher') {
                    navigate('/teacher');
                } else if (userRole === 'student') {
                    navigate('/student');
                } else {
                    setError('Invalid user role');
                }
            } else {
                setError(result.error || 'Login failed');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto icon-container mb-6">
                        <GraduationCap className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">Welcome Back</h2>
                    <p className="text-gray-600 text-lg">Sign in to College Marks Portal</p>
                </div>

                {/* Form */}
                <div className="card p-8 space-y-6">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <div className="input-group">
                                <div className="input-icon"><Mail className="h-5 w-5" /></div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    className="form-input pl-12"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <div className="input-icon"><Lock className="h-5 w-5" /></div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    required
                                    value={form.password}
                                    onChange={handleChange}
                                    className="form-input pl-12"
                                />
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className="space-y-2">
                            <label htmlFor="role" className="form-label">Select Role</label>
                            <div className="input-group">
                                <div className="input-icon"><Users className="h-5 w-5" /></div>
                                <select
                                    id="role"
                                    name="role"
                                    required
                                    value={form.role}
                                    onChange={handleChange}
                                    className="form-select pl-12"
                                >
                                    <option value="">Choose your role</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="student">Student</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn btn-primary py-4 px-6"
                        >
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="spinner"></div>
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <span>Sign In</span>
                                    <ArrowRight className="h-5 w-5 hover-translate" />
                                </div>
                            )}
                        </button>
                    </form>
                </div>

                {/* Link to Register */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-sm text-gray-500">
                        Secure access to your academic portal
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
