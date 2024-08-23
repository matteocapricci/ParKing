import React, { useState } from 'react';
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Perform validation before login attempt
    validateEmail(email);

    // Mock authentication logic
    if (email === 'user@example.com' && password === 'password123') {
      alert('Login successful!');
    } else {
      setErrorMessage('Incorrect email or password.');
    }
  };

  const loginButton = {
    name: "Login",
    size: "large",
    variant: "contained",
    handleClick: handleLogin,
    backgroundColor: isButtonHovered ? theme.palette.primary.dark : theme.palette.primary.main,
  }


  // Regular expression for a valid email format
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
      <CenterLogo></CenterLogo>
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
            <CustomButton 
                type="submit" 
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                {...loginButton}
            />
          </form>
          <p style={link}>
            Don't have an account? <a href="/register">Sign up</a>
          </p>
          <p style={link}>
            <a href="/forgot-password">Forgot your password?</a>
          </p>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default Login;
