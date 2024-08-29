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
import{ createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase/confFirebase.js";

const Signup = () => {
  
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // New state variables for required field errors
  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const { doCreateUserWithEmailAndPassword } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message
    setNameError(''); // Reset name error
    setSurnameError(''); // Reset surname error
    setPasswordError(''); // Reset password error
    
    let hasError = false;

    // Custom validation for required fields
    if (!name.trim()) {
      setNameError('Name is required.');
      hasError = true;
    }
    if (!surname.trim()) {
      setSurnameError('Surname is required.');
      hasError = true;
    }
    if (!email.trim()) {
      setEmailError('Email is required.');
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address.');
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError('Password is required.');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      hasError = true;
    }

    // Prevent form submission if there are errors
    if (hasError) {
      return;
    }

    if (!isRegistering) {
      setIsRegistering(true);
      try {
        const result = await doCreateUserWithEmailAndPassword(name, surname, email, password, navigate);
        if (!result) {
          setErrorMessage('Email already used, please login.');
          setIsRegistering(false);
        }
      } catch (error) {
        setIsRegistering(false);
      }
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email) => {
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const signupButton = {
    name: "Sign",
    size: "large",
    variant: "contained",
    backgroundColor: isButtonHovered ? theme.palette.primary.dark : theme.palette.primary.main,
  };

  return (
    <div>
      <Header page={"Signup"} />
      <CenterLogo />
      <PageContainer>
        <div style={formContainer}>
          <h2 style={heading}>Sign-up</h2>
          <form onSubmit={handleSubmit} style={form}>
            <div style={inputGroup}>
              <label htmlFor="name" style={label}>Name:</label>
              <input
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="Enter your name"
                style={input}
              />
              {nameError && <p style={error}>{nameError}</p>}

              <label htmlFor="surname" style={label}>Surname:</label>
              <input
                value={surname}
                name="surname"
                onChange={(e) => setSurname(e.target.value)}
                id="surname"
                placeholder="Enter your surname"
                style={input}
              />
              {surnameError && <p style={error}>{surnameError}</p>}

              <label htmlFor="email" style={label}>Email:</label>
              <input
                value={email}
                onBlur={(e) => validateEmail(e.target.value)}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="youremail@gmail.com"
                id="email"
                name="email"
                style={input}
              />
              {emailError && <p style={error}>{emailError}</p>}
              {errorMessage && <p style={error}>{errorMessage}</p>}

              <label htmlFor="password" style={label}>Password:</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="********"
                id="password"
                name="password"
                style={input}
              />
              {passwordError && <p style={error}>{passwordError}</p>}
            </div>
            <CustomButton 
              type="submit" 
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              onClick={handleSubmit}
              {...signupButton}
            />
          </form>
          <p style={link}>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default Signup;
