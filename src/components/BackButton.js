import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import theme from '../style/palette.js';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(-1)} 
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        color: theme.palette.primary.main,
        cursor: 'pointer',
        fontSize: '16px',
        padding: '10px 20px',
      }}
    >
      <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '8px' }} />
      <span>Go Back</span>
    </button>
  );
};

export default BackButton;
