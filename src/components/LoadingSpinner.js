import React from 'react';

const spinnerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh' 
};

const spinnerAnimation = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const spinnerInnerStyle = {
    border: '8px solid #f3f3f3',
    borderTop: '8px solid #3498db', 
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    animation: 'spin 1s linear infinite'
};

const LoadingSpinner = () => (
    <div style={spinnerStyle}>
        <div style={spinnerInnerStyle}>
            <style>{spinnerAnimation}</style>
        </div>
    </div>
);

export default LoadingSpinner;
