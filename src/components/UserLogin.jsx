import { useState, useContext, useEffect } from 'react';
import Navbar from './Navbar';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { assets } from '../assets/assets'; // ensure you have person_icon, email_icon, lock_icon
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom'


export default function AuthForm() {



    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobile: '',
    });
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate()
    const { setShowUserLogin, setCurrentUser } = useContext(AppContext);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormData({ name: '', email: '', password: '', mobile: '' });
        setErrors({});
    };

    const validate = () => {
        const errs = {};
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/;

        if (!formData.password || !passwordRegex.test(formData.password)) {
            errs.password = 'Min 8 chars, 1 capital letter, 1 number & 1 special char';
        }

        if (!isLogin) {
            if (!formData.name) errs.name = 'Full name is required';
            if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
                errs.email = 'Valid email is required';
            if (!formData.mobile || !/^\d{10}$/.test(formData.mobile))
                errs.mobile = 'Valid 10-digit mobile is required';
            if (formData.password !== formData.confirmPassword)
                errs.confirmPassword = 'Passwords do not match';
        } else {
            if (!formData.email)
                errs.email = 'Email or mobile is required';
        }
        return errs;
    };

    const handleForgotPassword = () => {
        if (!formData.email) {
            alert('Please enter your email to reset password');
            return;
        }
        fetch('http://localhost:8080/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email }),
        })
            .then((res) => res.json())
            .then((data) => alert(data.message || 'Password reset link sent'))
            .catch((err) => alert('Error: ' + err.message));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        const url = isLogin
            ? 'http://localhost:8080/api/user/login'
            : 'http://localhost:8080/api/user/register';

        const payload = isLogin
            ? {
                username: formData.email || formData.mobile,
                password: formData.password,
            }
            : formData;

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok) {
                alert(result.message || 'Something went wrong');
                return;
            }

            alert(result.message || (isLogin ? 'Login success' : 'Registration successful'));

            if (!isLogin) {
                setIsLogin(true);
                setFormData({ name: '', email: '', password: '', confirmPassword: '', mobile: '' });
                setErrors({});
            } else {
                // ✅ Store accessToken in localStorage
                if (result.accessToken) {
                    localStorage.setItem('token', result.accessToken);

                    // Decode and store current user
                    const user = JSON.parse(atob(result.accessToken.split('.')[1]));
                    setCurrentUser(user);
                }

                navigate('/home');
                setShowUserLogin(false);
            }
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    useEffect(() => {
        // Disable scroll when modal is open
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');

        // Trap focus inside the form
        const form = document.querySelector("form");
        if (form) {
            const focusableElements = form.querySelectorAll(
                'input, button, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            const trapFocus = (e) => {
                if (e.key === "Tab") {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            };

            document.addEventListener("keydown", trapFocus);

            // Autofocus first input
            if (firstElement) firstElement.focus();

            return () => {
                document.removeEventListener("keydown", trapFocus);
                document.body.style.overflow = 'auto';
                document.body.classList.remove('modal-open');
            };
        }
    }, [isLogin]);


    return (
        <>
            {/* <Navbar /> */}
            <section style={{ marginTop: '120px' }}></section>
            <div className="modal-active position-fixed w-100 mt-5 top-0 start-0 bottom-0 z-1 d-flex justify-content-center align-items-center" style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <form onSubmit={handleSubmit} className="mx-sm-auto col-11 col-sm-8 col-md-6 col-lg-5 col-xl-3 position-relative bg-white p-4 mt-4 rounded text-secondary" noValidate>
                    <h1 className="text-center h4 text-secondary fw-medium">{isLogin ? 'User Login' : 'Create Your Profile'}</h1>
                    <p className="text-center ">Welcome! Please {isLogin ? 'sign in' : 'sign up'} to continue</p>

                    {!isLogin && (
                        <>
                            {/* Name Input */}
                            <div className='border px-3 py-2 d-flex align-items-center gap-2 rounded-pill mt-3'>
                                <img src={assets.person_icon} alt="" />
                                <input
                                    className='form-control form-control-sm border-0 shadow-none'
                                    type="text"
                                    placeholder='Full Name'
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            {errors.name && <small className="text-danger ms-3">{errors.name}</small>}

                            {/* Mobile Input */}
                            <div className='border px-3 py-2 d-flex align-items-center gap-2 rounded-pill mt-3'>
                                <img src={assets.email_icon} alt="" />
                                <input
                                    className='form-control form-control-sm border-0 shadow-none'
                                    type="tel"
                                    placeholder='Mobile Number'
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                />
                            </div>
                            {errors.mobile && <small className="text-danger ms-3">{errors.mobile}</small>}

                        </>
                    )}

                    {/* Email Input */}
                    <div className='border px-3 py-2 d-flex align-items-center gap-2 rounded-pill mt-3'>
                        <img src={assets.email_icon} alt="" />
                        <input
                            className='form-control form-control-sm border-0 shadow-none'
                            type="email"
                            placeholder={isLogin ? 'Email or Mobile' : 'Email'}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    {errors.email && <small className="text-danger ms-3">{errors.email}</small>}

                    {/* Password Input */}
                    <div className='border px-3 py-2 d-flex align-items-center gap-2 rounded-pill mt-3 position-relative'>
                        <img src={assets.lock_icon} alt="" />
                        <input
                            className='form-control form-control-sm border-0 shadow-none'
                            type={showPassword ? 'text' : 'password'}
                            placeholder={isLogin ? 'Password' : 'Create password'}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        {showPassword ? (
                            <AiOutlineEye
                                onClick={() => setShowPassword(false)}
                                style={{ cursor: 'pointer', fontSize: '20px' }}
                            />
                        ) : (
                            <AiOutlineEyeInvisible
                                onClick={() => setShowPassword(true)}
                                style={{ cursor: 'pointer', fontSize: '20px' }}
                            />
                        )}
                    </div>
                    {!isLogin && (
                        <small className="text-muted ms-3">
                            (Min 8 chars, 1 Cap.letter, 1 num & 1 spec.char)
                        </small>
                    )}



                    {errors.password && <small className="text-danger ms-3">{errors.password}</small>}

                    {/* Confirm Password - only in sign up */}
                    {!isLogin && (
                        <>
                            <div className='border px-3 py-2 d-flex align-items-center gap-2 rounded-pill mt-1 position-relative'>
                                <img src={assets.lock_icon} alt="" />
                                <input
                                    className='form-control form-control-sm border-0 shadow-none'
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder='Confirm Password'
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value })}
                                />
                                {showConfirmPassword ? (
                                    <AiOutlineEye
                                        onClick={() => setShowConfirmPassword(false)}
                                        style={{ cursor: 'pointer', fontSize: '20px' }}
                                    />
                                ) : (
                                    <AiOutlineEyeInvisible
                                        onClick={() => setShowConfirmPassword(true)}
                                        style={{ cursor: 'pointer', fontSize: '20px' }}
                                    />
                                )}
                            </div>
                            {errors.confirmPassword && <small className="text-danger ms-3">{errors.confirmPassword}</small>}
                        </>
                    )}

                    {/* Forgot Password */}
                    {isLogin && (
                        <div className="d-flex">
                            <a className="small mt-1 mt-0 text-primary ms-auto " style={{ cursor: 'pointer' }} onClick={handleForgotPassword}>Forgot password?</a>
                        </div>


                        // <p className="small text-primary mt-2 mb-0 text-end" style={{ cursor: 'pointer' }} onClick={handleForgotPassword}>
                        //     Forgot password?
                        // </p>
                    )}

                    {/* Submit Button */}
                    <button type="submit" className="w-100 py-2 rounded-pill mt-2" style={{ background: '#00c4e6', color: 'white', border: 'none' }}>
                        {isLogin ? 'Login' : 'Register'}
                    </button>

                    {/* Switch Form */}
                    <p className='mt-2 mb-0 text-center'>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                        <span className="text-primary" onClick={toggleForm} style={{ cursor: 'pointer' }}>
                            {isLogin ? 'Sign Up' : 'Login'}
                        </span>
                    </p>
                    {/* Cross icon */}
                    <img onClick={() => setShowUserLogin(false)}
                        className='position-absolute'
                        style={{ cursor: 'pointer', top: '20px', right: '20px' }}
                        src={assets.cross_icon} alt="" />

                </form>
            </div>

        </>
    );
}
