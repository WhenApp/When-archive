import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import LoginForm from './LoginForm';
import ThirdPartyPanel from './ThirdPartyPanel';
import './index.css';

const LoginContainer: React.FC = () => {
  const { initialising, user } = useAuthState(firebase.auth());
  const [showDebug, setShowDebug] = useState(false);

  const toggleShowDebug = () => {
    setShowDebug(!showDebug);
  };

  if (initialising) {
    return (
      <div className="login-container">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  return (
    <div className="login-container">
      <LoginForm onIconClick={toggleShowDebug} />
      <br />
      <Typography component="h1" variant="h5" style={{
        color: '#fff',
      }}>
        Or log in with:
      </Typography>
      <br />
      <ThirdPartyPanel />
      { showDebug && (
        <div>
          <h3>Debug Data:</h3>
          <pre>
            {JSON.stringify({ initialising, user }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default LoginContainer;
