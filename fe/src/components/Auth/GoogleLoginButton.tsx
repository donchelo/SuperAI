import React from 'react';
import { Button } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { loginWithGoogle } from '../../services/authService';

const GoogleLoginButton: React.FC = () => {
    return (
        <Button 
            variant="contained" 
            color="primary" 
            startIcon={<GoogleIcon />} 
            onClick={loginWithGoogle}
        >
            Login with Google
        </Button>
    );
};

export default GoogleLoginButton;
