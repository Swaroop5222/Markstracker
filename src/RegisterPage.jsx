import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, Users, ArrowRight, CheckCircle, AlertCircle, Eye, EyeOff, GraduationCap, BookOpen, Sparkles, Shield } from 'lucide-react';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '', role: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Basic validation
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        if (!form.email.includes('@')) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSuccess('Registration successful! Redirecting to your dashboard...');
            setTimeout(() => {
                navigate(form.role === 'teacher' ? '/teacher' : '/student');
            }, 2000);
        } catch (err) {
            setError('Registration failed. Please check your connection and try again.');
        }
        setLoading(false);
    };

    const handleLoginRedirect = () => {
        navigate('/');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Embedded CSS Styles
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradientShift 15s ease infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        },
        backgroundDecoration: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            overflow: 'hidden'
        },
        floatingShape: {
            position: 'absolute',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            animation: 'float 20s infinite linear'
        },
        shape1: {
            width: '80px',
            height: '80px',
            top: '20%',
            left: '10%',
            animationDelay: '0s'
        },
        shape2: {
            width: '120px',
            height: '120px',
            top: '60%',
            right: '15%',
            animationDelay: '-5s'
        },
        shape3: {
            width: '60px',
            height: '60px',
            bottom: '30%',
            left: '20%',
            animationDelay: '-10s'
        },
        shape4: {
            width: '100px',
            height: '100px',
            top: '10%',
            right: '30%',
            animationDelay: '-15s'
        },
        content: {
            width: '100%',
            maxWidth: '500px',
            zIndex: 10
        },
        card: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '24px',
            padding: '48px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            animation: 'cardEntrance 0.8s ease-out'
        },
        header: {
            textAlign: 'center',
            marginBottom: '40px'
        },
        logoContainer: {
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            position: 'relative',
            boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)',
            animation: 'logoFloat 3s ease-in-out infinite'
        },
        logoGlow: {
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            right: '-2px',
            bottom: '-2px',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            borderRadius: '22px',
            zIndex: -1,
            filter: 'blur(10px)',
            opacity: 0.7
        },
        title: {
            fontSize: '32px',
            fontWeight: '800',
            color: '#1f2937',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1f2937, #4f46e5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
        },
        subtitle: {
            color: '#6b7280',
            fontSize: '16px',
            fontWeight: '500'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
        },
        fieldGroup: {
            marginBottom: '28px'
        },
        label: {
            display: 'flex',
            alignItems: 'center',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px',
            fontSize: '14px',
            gap: '8px'
        },
        inputWrapper: {
            position: 'relative',
            transition: 'all 0.3s ease'
        },
        input: {
            width: '100%',
            padding: '18px 24px 18px 56px',
            border: '2px solid #e5e7eb',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            outline: 'none'
        },
        inputFocus: {
            borderColor: '#3b82f6',
            boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.1), 0 10px 25px -5px rgba(59, 130, 246, 0.1)',
            background: 'white'
        },
        inputIcon: {
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: '#9ca3af'
        },
        passwordToggle: {
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            color: '#9ca3af'
        },
        passwordToggleHover: {
            background: 'rgba(59, 130, 246, 0.1)'
        },
        roleSelection: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        },
        roleOption: {
            display: 'flex',
            alignItems: 'center',
            padding: '20px',
            border: '2px solid #e5e7eb',
            borderRadius: '16px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)'
        },
        roleOptionHover: {
            borderColor: '#d1d5db',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-2px)'
        },
        roleOptionSelected: {
            borderColor: '#3b82f6',
            background: 'rgba(59, 130, 246, 0.05)',
            boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.1)'
        },
        roleIcon: {
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '16px',
            color: 'white'
        },
        roleIconTeacher: {
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
        },
        roleIconStudent: {
            background: 'linear-gradient(135deg, #22c55e, #16a34a)'
        },
        roleContent: {
            flex: 1
        },
        roleTitle: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '4px'
        },
        roleDescription: {
            fontSize: '14px',
            color: '#6b7280',
            fontWeight: '500'
        },
        roleCheck: {
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        submitBtn: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '20px 32px',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)',
            position: 'relative',
            overflow: 'hidden'
        },
        submitBtnHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 15px 35px -5px rgba(59, 130, 246, 0.5)'
        },
        submitBtnDisabled: {
            opacity: 0.6,
            cursor: 'not-allowed',
            transform: 'none'
        },
        spinner: {
            width: '20px',
            height: '20px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderTop: '2px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        },
        footer: {
            marginTop: '40px',
            textAlign: 'center'
        },
        loginRedirect: {
            marginBottom: '32px',
            paddingBottom: '32px',
            borderBottom: '1px solid #e5e7eb'
        },
        loginText: {
            color: '#6b7280',
            marginBottom: '12px',
            fontWeight: '500'
        },
        loginLink: {
            color: '#2563eb',
            fontWeight: '600',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
            transition: 'all 0.2s ease'
        },
        loginLinkHover: {
            color: '#1d4ed8',
            textDecorationThickness: '2px'
        },
        featureHighlights: {
            display: 'flex',
            justifyContent: 'space-around',
            gap: '16px'
        },
        feature: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            fontWeight: '600',
            color: '#6b7280',
            textAlign: 'center'
        },
        alert: {
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderRadius: '16px',
            fontWeight: '500',
            marginBottom: '24px',
            border: '1px solid',
            animation: 'slideDown 0.3s ease-out'
        },
        alertError: {
            background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
            color: '#dc2626',
            borderColor: '#fecaca'
        },
        alertSuccess: {
            background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
            color: '#16a34a',
            borderColor: '#bbf7d0'
        },
        alertIcon: {
            marginRight: '12px'
        }
    };

    // Add CSS animations via style tag
    const cssAnimations = `
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-30px) rotate(120deg); }
            66% { transform: translateY(30px) rotate(240deg); }
        }
        
        @keyframes cardEntrance {
            0% {
                opacity: 0;
                transform: translateY(50px) rotateX(10deg);
            }
            100% {
                opacity: 1;
                transform: translateY(0) rotateX(0deg);
            }
        }
        
        @keyframes logoFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes slideDown {
            0% {
                opacity: 0;
                transform: translateY(-20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
            .register-card-mobile {
                padding: 32px 24px !important;
                margin: 16px !important;
                border-radius: 20px !important;
            }
            
            .register-title-mobile {
                font-size: 28px !important;
            }
            
            .logo-container-mobile {
                width: 64px !important;
                height: 64px !important;
            }
        }
        
        @media (max-width: 480px) {
            .register-container-mobile {
                padding: 12px !important;
            }
            
            .register-card-small {
                padding: 24px 20px !important;
            }
            
            .register-title-small {
                font-size: 24px !important;
            }
        }
    `;

    return (
        <>
            <style>{cssAnimations}</style>
            <div style={styles.container}>
                {/* Animated Background Elements */}
                <div style={styles.backgroundDecoration}>
                    <div style={{ ...styles.floatingShape, ...styles.shape1 }}></div>
                    <div style={{ ...styles.floatingShape, ...styles.shape2 }}></div>
                    <div style={{ ...styles.floatingShape, ...styles.shape3 }}></div>
                    <div style={{ ...styles.floatingShape, ...styles.shape4 }}></div>
                </div>

                {/* Main Content */}
                <div style={styles.content}>
                    <div style={styles.card} className="register-card-mobile register-card-small">
                        {/* Header Section */}
                        <div style={styles.header}>
                            <div style={styles.logoContainer} className="logo-container-mobile">
                                <GraduationCap className="h-8 w-8 text-white" />
                                <div style={styles.logoGlow}></div>
                            </div>
                            <h1 style={styles.title} className="register-title-mobile register-title-small">
                                Create Your Account
                                <Sparkles className="h-6 w-6 text-yellow-400 ml-2 inline animate-pulse" />
                            </h1>
                            <p style={styles.subtitle}>
                                Join our advanced academic management platform
                            </p>
                        </div>

                        {/* Alert Messages */}
                        {error && (
                            <div style={{ ...styles.alert, ...styles.alertError }}>
                                <AlertCircle className="h-5 w-5 flex-shrink-0" style={styles.alertIcon} />
                                <span>{error}</span>
                            </div>
                        )}

                        {success && (
                            <div style={{ ...styles.alert, ...styles.alertSuccess }}>
                                <CheckCircle className="h-5 w-5 flex-shrink-0" style={styles.alertIcon} />
                                <span>{success}</span>
                            </div>
                        )}

                        {/* Registration Form */}
                        <form onSubmit={handleRegister} style={styles.form}>
                            {/* Email Field */}
                            <div style={styles.fieldGroup}>
                                <label htmlFor="email" style={styles.label}>
                                    <Mail className="h-4 w-4" />
                                    Email Address
                                </label>
                                <div style={styles.inputWrapper}>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        style={styles.input}
                                        disabled={loading}
                                        onFocus={(e) => e.target.style = { ...styles.input, ...styles.inputFocus }}
                                        onBlur={(e) => e.target.style = styles.input}
                                    />
                                    <div style={styles.inputIcon}>
                                        <Mail className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>

                            {/* Password Field */}
                            <div style={styles.fieldGroup}>
                                <label htmlFor="password" style={styles.label}>
                                    <Lock className="h-4 w-4" />
                                    Password
                                </label>
                                <div style={styles.inputWrapper}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        placeholder="Create a strong password (min 6 characters)"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        minLength="6"
                                        style={{ ...styles.input, paddingRight: '56px' }}
                                        disabled={loading}
                                        onFocus={(e) => e.target.style = { ...styles.input, ...styles.inputFocus, paddingRight: '56px' }}
                                        onBlur={(e) => e.target.style = { ...styles.input, paddingRight: '56px' }}
                                    />
                                    <div style={styles.inputIcon}>
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        style={styles.passwordToggle}
                                        disabled={loading}
                                        onMouseEnter={(e) => e.target.style = { ...styles.passwordToggle, ...styles.passwordToggleHover }}
                                        onMouseLeave={(e) => e.target.style = styles.passwordToggle}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div style={styles.fieldGroup}>
                                <label htmlFor="role" style={styles.label}>
                                    <Users className="h-4 w-4" />
                                    Account Type
                                </label>
                                <div style={styles.roleSelection}>
                                    <div
                                        style={{
                                            ...styles.roleOption,
                                            ...(form.role === 'teacher' ? styles.roleOptionSelected : {})
                                        }}
                                        onClick={() => setForm({ ...form, role: 'teacher' })}
                                        onMouseEnter={(e) => {
                                            if (form.role !== 'teacher') {
                                                e.target.style = { ...styles.roleOption, ...styles.roleOptionHover };
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (form.role !== 'teacher') {
                                                e.target.style = styles.roleOption;
                                            }
                                        }}
                                    >
                                        <div style={{ ...styles.roleIcon, ...styles.roleIconTeacher }}>
                                            <BookOpen className="h-6 w-6" />
                                        </div>
                                        <div style={styles.roleContent}>
                                            <h3 style={styles.roleTitle}>Teacher</h3>
                                            <p style={styles.roleDescription}>Manage students and assessments</p>
                                        </div>
                                        <div style={styles.roleCheck}>
                                            {form.role === 'teacher' && <CheckCircle className="h-5 w-5 text-blue-600" />}
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            ...styles.roleOption,
                                            ...(form.role === 'student' ? styles.roleOptionSelected : {})
                                        }}
                                        onClick={() => setForm({ ...form, role: 'student' })}
                                        onMouseEnter={(e) => {
                                            if (form.role !== 'student') {
                                                e.target.style = { ...styles.roleOption, ...styles.roleOptionHover };
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (form.role !== 'student') {
                                                e.target.style = styles.roleOption;
                                            }
                                        }}
                                    >
                                        <div style={{ ...styles.roleIcon, ...styles.roleIconStudent }}>
                                            <Users className="h-6 w-6" />
                                        </div>
                                        <div style={styles.roleContent}>
                                            <h3 style={styles.roleTitle}>Student</h3>
                                            <p style={styles.roleDescription}>Access grades and progress</p>
                                        </div>
                                        <div style={styles.roleCheck}>
                                            {form.role === 'student' && <CheckCircle className="h-5 w-5 text-green-600" />}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading || !form.email || !form.password || !form.role}
                                style={{
                                    ...styles.submitBtn,
                                    ...(loading || !form.email || !form.password || !form.role ? styles.submitBtnDisabled : {})
                                }}
                                onMouseEnter={(e) => {
                                    if (!loading && form.email && form.password && form.role) {
                                        e.target.style = { ...styles.submitBtn, ...styles.submitBtnHover };
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!loading && form.email && form.password && form.role) {
                                        e.target.style = styles.submitBtn;
                                    }
                                }}
                            >
                                {loading ? (
                                    <>
                                        <div style={styles.spinner}></div>
                                        Creating Your Account...
                                    </>
                                ) : (
                                    <>
                                        <Shield className="h-5 w-5" />
                                        Create Account
                                        <ArrowRight className="h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <div style={styles.footer}>
                            <div style={styles.loginRedirect}>
                                <p style={styles.loginText}>Already have an account?</p>
                                <button
                                    onClick={handleLoginRedirect}
                                    style={styles.loginLink}
                                    disabled={loading}
                                    onMouseEnter={(e) => {
                                        if (!loading) {
                                            e.target.style = { ...styles.loginLink, ...styles.loginLinkHover };
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!loading) {
                                            e.target.style = styles.loginLink;
                                        }
                                    }}
                                >
                                    Sign in here
                                </button>
                            </div>

                            <div style={styles.featureHighlights}>
                                <div style={styles.feature}>
                                    <Shield className="h-5 w-5 text-blue-500" />
                                    <span>Secure & Private</span>
                                </div>
                                <div style={styles.feature}>
                                    <Sparkles className="h-5 w-5 text-purple-500" />
                                    <span>Modern Interface</span>
                                </div>
                                <div style={styles.feature}>
                                    <BookOpen className="h-5 w-5 text-green-500" />
                                    <span>Academic Excellence</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;