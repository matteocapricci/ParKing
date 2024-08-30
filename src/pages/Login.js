import React, { useState, useContext } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import theme from '../style/palette';
import CustomButton from '../components/CustomButton';
import {
  formContainer,
  heading,
  form,
  input,
  inputGroup,
  error,
  label,
  link,
} from '../style/styles.js';
import CenterLogo from '../components/CenterLogo.js';
import PageContainer from '../components/PageContainer.js';
import { AuthContext } from '../contexts/authContext/index.jsx';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const [emailError, setEmailError] = useState('');
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();
  const { doSignInWithEmailAndPassword, doSignInWithGoogle } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        const result = await doSignInWithEmailAndPassword(email, password, navigate);
        if(!result){
          setErrorMessage('Invalid email or password. Please try again.');
          setIsSigningIn(false);
        }
      } catch (error) {
        setIsSigningIn(false);
      }
    }
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        const result = doSignInWithGoogle(navigate);
        if(!result){
          setErrorMessage('Google sign-in failed. Please try again.');
          setIsSigningIn(false);
        }
      } catch (error) {
        setIsSigningIn(false);
      }
    }
  };

  const loginButton = {
    name: "Login",
    size: "large",
    variant: "contained",
    backgroundColor: isButtonHovered ? theme.palette.primary.dark : theme.palette.primary.main,
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email) => {
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  return (
    <div>
      <Header page={"login"} />
      <CenterLogo />
      <PageContainer>
        <div style={formContainer}>
          <h2 style={heading}>Login</h2>
          <form onSubmit={handleLogin} style={form}>
            <div style={inputGroup}>
              <label htmlFor="email" style={label}>Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onBlur={(e) => validateEmail(e.target.value)}
                onChange={(e) => setEmail(e.target.value)}
                style={input}
                placeholder="Enter your email"
                required
              />
              {emailError && <p style={error}>{emailError}</p>}
            </div>
            <div style={inputGroup}>
              <label htmlFor="password" style={label}>Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                style={input}
                placeholder="Enter your password"
                required
              />
            </div>
            {/* Display error message if credentials are incorrect */}
            {errorMessage && <p style={error}>{errorMessage}</p>}
            <CustomButton
              type="submit"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              onClick={handleLogin}
              {...loginButton}
            />
          </form>
          <p style={link}>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
          <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', width: '100%', marginBottom: '15px' }}>
            <div style={{ borderBottom: '2px solid black', marginBottom: '10px', marginRight: '8px', width: '100%' }}></div>
            <div style={{ fontSize: '0.875rem', fontWeight: 'bold', width: 'fit-content', }}>OR</div>
            <div style={{ borderBottom: '2px solid black', marginBottom: '10px', marginLeft: '8px', width: '100%' }}></div>
          </div>
          <button
            disabled={isSigningIn}
            onClick={handleGoogleSignIn}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '10px 0',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: isSigningIn ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s',
              backgroundColor: isSigningIn ? '#e5e7eb' : 'white'
            }}
            onMouseEnter={(e) => {
              if (!isSigningIn) {
                e.target.style.backgroundColor = '#f3f4f6';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSigningIn) {
                e.target.style.backgroundColor = 'white';
              }
            }}
            onMouseDown={(e) => {
              if (!isSigningIn) {
                e.target.style.backgroundColor = '#f3f4f6';
              }
            }}
            onMouseUp={(e) => {
              if (!isSigningIn) {
                e.target.style.backgroundColor = '#f3f4f6';
              }
            }}
          >
            <svg
              style={{ width: '20px', height: '20px' }}
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_17_40)">
                <path
                  d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                  fill="#4285F4"
                />
                <path
                  d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                  fill="#34A853"
                />
                <path
                  d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                  fill="#FBBC04"
                />
                <path
                  d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_40">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {isSigningIn ? 'Signing In...' : 'Continue with Google'}
          </button>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default Login;
