import React from 'react';
import CustomButton from '../components/CustomButton.js';

const ProfileActions = ({ onChangeImageClick, onChangePasswordClick }) => {
    return (
        <div style={{ marginTop: '20px' }}>
            <CustomButton name="Change Image" onClick={onChangeImageClick} />
            <div style={{ marginTop: '15px' }}></div>
            <CustomButton name="Change Password" onClick={onChangePasswordClick} />
        </div>
    );
}

export default ProfileActions;
