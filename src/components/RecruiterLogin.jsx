import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const RecruiterLogin = () => {
  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(false);
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate()
  const { setShowRecruiterLogin } = useContext(AppContext);
 

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const apiUrl = 'http://localhost:8080/api/recruiter';

    if (state === "Sign Up") {
      if (!isTextDataSubmited) {
        // Validate basic details before moving to next step
        if (!email.includes("@gmail.com")) {
          setError("Invalid email ID. Please use a @gmail.com address.");
          return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/;

        if (!password || !passwordRegex.test(password)) {
          setError("Min 8 chars, 1 Cap.letter, 1 num & 1 spec.char");
          return;
        }

        if (password !== confirmPassword) {
          setError("Passwords do not match!");
          return;
        }

        try {
          const checkResponse = await fetch(`${apiUrl}/check-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, name })
          });

          const checkData = await checkResponse.json();

          if (!checkResponse.ok) {
            throw new Error(checkData.message || "Error checking email.");
          }

          if (checkData.exists) {
            setError("Company name or email already registered.");
            return;
          }

          // All validation passed
          setError('');
          setIsTextDataSubmited(true);

        } catch (err) {
          console.error("Email check error:", err);
          setError("Something went wrong while checking email.");
        }

        return; // Stop here after 'Next' button click
      }

      // After 'Next' (upload logo + signup)
      if (!image) {
        setError("Please upload a company logo!");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);

        const response = await fetch(`${apiUrl}/signup`, {
          method: "POST",
          body: formData
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Sign up failed");
        }

        alert("Account created successfully!");
        setShowRecruiterLogin(false);

      } catch (err) {
        console.error("Signup error:", err);
        setError(err.message);
      }
    }

    if (state === "Login") {
      try {
        const response = await fetch(`${apiUrl}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });

        if (response.ok) {
          const data = await response.json();

          // Save recruiter info to localStorage
          localStorage.setItem('token', data.token);
          localStorage.setItem('recruiterName', data.recruiterName);
          localStorage.setItem('recruiterImage', data.recruiterImage);

          alert("Login successful!");
          navigate('/Dashboard');  // ✅ Go to Dashboard
          setShowRecruiterLogin(false); // ✅ Hide login form
        } else {
          // ❌ If wrong credentials  
          setError("Invalid email or password."); // ✅ Show custom message
        }

      } catch (err) {
        console.error("Login error:", err);
        setError("Something went wrong. Please try again."); // Server error etc.
      }
    }
  }

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
  }, [state, isTextDataSubmited]);

  return (
    <div className="modal-active position-fixed w-100 mt-5 vh-100 top-0 start-0 bottom-0 z-1 d-flex justify-content-center align-items-center" style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <form key={`${state}-${isTextDataSubmited}`} onSubmit={onSubmitHandler} className="mx-sm-auto col-11 col-sm-8 col-md-6 col-lg-5 col-xl-3 position-relative bg-white p-4 rounded text-secondary">

        <h1 className="text-center h4 text-secondary fw-medium">Recruiter {state}</h1>
      <p className="text-center ">Welcome back! Please {state === 'Login' ? "Sign In" : "Sign Up"} to continue  </p>

        {/* Upload Logo */}
        {state === "Sign Up" && isTextDataSubmited && (
          <div className='d-flex align-items-center gap-3 my-5'>
            <label htmlFor="image">
              <img className='rounded-circle' style={{ width: '64px' }} src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
              <input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden />
            </label>
            <p>Upload Company <br />logo</p>
          </div>


        )}

        {/* Company Name input */}
        {state === 'Sign Up' && !isTextDataSubmited && (
          <div className='border px-3 py-2 d-flex align-items-center gap-2 rounded-pill mt-1'>
            <img src={assets.person_icon} alt="" />
            <input
              className='form-control form-control-sm border-0 shadow-none'
              onChange={e => {
                setName(e.target.value);
                setError('');
              }}
              value={name}
              type="text"
              placeholder='Company Name'
              required
            />
          </div>
        )}

        {/* Email input */}
        <div className='border px-3 py-2 d-flex align-items-center gap-2 rounded-pill mt-3'>
          <img src={assets.email_icon} alt="" />
          <input
            className='form-control form-control-sm border-0 shadow-none'
            onChange={e => {
              setEmail(e.target.value);
              setError('');
            }}
            value={email}
            type="email"
            placeholder='Email Id'
            required
          />
        </div>

        {/* Password field */}
        <div className='border px-3 py-2 d-flex align-items-center gap-2 rounded-pill mt-3 position-relative'>
          <img src={assets.lock_icon} alt="" />
          <input
            className='form-control form-control-sm border-0 shadow-none'
            onChange={e => {
              setPassword(e.target.value);
              setError('');
            }}
            value={password}
            type={showPassword ? 'text' : 'password'}
            placeholder={state === 'Login' ? 'Password' : 'Create Password'}
            required
          />
          {showPassword ? (
            <AiOutlineEyeInvisible
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer', fontSize: '20px' }}
            />
          ) : (
            <AiOutlineEye
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer', fontSize: '20px' }}
            />
          )}
        </div>

        {/* Confirm Password field */}
        {state === "Sign Up" && !isTextDataSubmited && (
          <>
            <small className="text-muted ms-3">
              (Min 8 chars, 1 Cap.letter, 1 num & 1 spec.char)
            </small>
            <div className='border px-3 py-2 d-flex align-items-center gap-2 rounded-pill mt-2 position-relative'>
              <img src={assets.lock_icon} alt="" />
              <input
                className='form-control form-control-sm border-0 shadow-none'
                onChange={e => {
                  setConfirmPassword(e.target.value);
                  setError('');
                }}
                value={confirmPassword}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Confirm Password'
                required
              />
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ cursor: 'pointer', fontSize: '20px' }}
                />
              ) : (
                <AiOutlineEye
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ cursor: 'pointer', fontSize: '20px' }}
                />
              )}
            </div>
          </>
        )}

        {/* Error message */}
        {error && <p className="text-danger text-center mt-2">{error}</p>}

        {state === "Login" && (
          <p className="small text-primary mt-2 mb-0" style={{ cursor: 'pointer' }}>Forgot password</p>
        )}

        {/* Submit button */}
        <button type='submit' className="w-100 py-2 rounded-pill mt-3" style={{ background: '#00c4e6', color: 'white',border: 'none' }}>
          {state === 'Login' ? 'Login' : isTextDataSubmited ? 'Create Account' : 'Next'}
        </button>

        {/* Back button */}
        {state === 'Sign Up' && isTextDataSubmited && (
          <button
            type="button"
            onClick={() => setIsTextDataSubmited(false)}
            className="w-100 py-2 rounded-pill mt-2" style={{ background: '#00c4e6', color: 'white',border: 'none' }}
          >
            Back
          </button>
        )}

        {/* Switch between login/signup */}
        {state === 'Login'
          ? <p className='mt-2 text-center'>Don't have an account? <span className="text-primary my-2" onClick={() => { setState("Sign Up"); setError(''); setIsTextDataSubmited(false); }} style={{ cursor: 'pointer' }}>Sign Up</span></p>
          : <p className='mt-2 text-center'>Already have an account? <span className="text-primary my-2" onClick={() => { setState("Login"); setError(''); }} style={{ cursor: 'pointer' }}>Login</span></p>
        }

        {/* Cross icon */}
        <img onClick={() => setShowRecruiterLogin(false)} className='position-absolute' style={{ cursor: 'pointer', top: '20px', right: '20px' }} src={assets.cross_icon} alt="" />
      </form>
    </div>
  );
};

export default RecruiterLogin;
