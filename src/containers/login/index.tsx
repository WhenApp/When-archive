import React from 'react';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import LoginForm from './LoginForm';
import ThirdPartyPanel from './ThirdPartyPanel';

const LoginContainer: React.FC = () => (
  <div className="page-container login">
    <LoginForm />
    <br />
    <Typography component="h1" variant="h5" style={{
      color: '#fff',
    }}>
      <FormattedMessage
        id="login.orLogInWith"
      />
    </Typography>
    <br />
    <ThirdPartyPanel />
  </div>
);

export default LoginContainer;
