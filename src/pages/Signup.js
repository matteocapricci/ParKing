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

const Signup = () => {
  
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const { doCreateUserWithEmailAndPassword} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    if(!isRegistering){
      setIsRegistering(true);
      try{
        const result = await doCreateUserWithEmailAndPassword(name, surname, username, email, password, navigate);
        if(!result){
          setErrorMessage('Please try again.');
          setIsRegistering(false);
        }
      } catch (error) {
        setIsRegistering(false);
      }
    }

  };


  const signupButton = {
    name: "Sign",
    size: "large",
    variant: "contained",
    backgroundColor: isButtonHovered ? theme.palette.primary.dark : theme.palette.primary.main,
  }

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   const validateEmail = (email) => {
     if (!emailRegex.test(email)) {
       setEmailError('Please enter a valid email address.');
     } else {
       setEmailError('');
     }
   };

    const isPasswordValid = () => {
        return password.length >= 6;
    };

  return (
    <div>
      <Header page={"Signup"} />
      <CenterLogo></CenterLogo>
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
              <label htmlFor="surname" style={label}>Surname:</label>
               <input
                    value={surname}
                    name="surname"
                    onChange={(e) => setSurname(e.target.value)}
                    id="surname"
                    placeholder="Enter your surame"
                    style={input}
              />
              <label htmlFor="username" style={label}>Username:</label>
               <input
                    value={username}
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    id="username"
                    placeholder="Enter your surame"
                    style={input}
              />
              <label htmlFor="email" style={label}>Email:</label>
              <input
                value={email}
                onBlur={(e) => validateEmail(e.target.value)}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="youremail@gmail.com"
                id="email"
                name="email"
                required
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                title="Please enter a valid email address."
                style={input}
              />
              {emailError && <p style={error}>{emailError}</p>}
              <label htmlFor="password" style={label}>Password:</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                    required
                    style={input}
                />
                {formSubmitted && !isPasswordValid() &&
                <p className="error-message">Password must be at least 6 characters long.</p>}
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
          Already have an account? <a href="/signup">Login</a>
          </p>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default Signup;