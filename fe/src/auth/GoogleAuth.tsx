import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useAuth } from './AuthContext';

const GoogleAuth: React.FC = () => {
  const { login } = useAuth();

  const onSuccess = (res: any) => {
    console.log('Login Success: currentUser:', res.profileObj);
    login(res.profileObj);
  };

  const onFailure = (res: any) => {
    console.log('Login failed: res:', res);
  };

  return (
    <GoogleLogin
      clientId="YOUR_GOOGLE_CLIENT_ID"
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
  );
};

export default GoogleAuth;