import React from 'react';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import LoginForm from './LoginForm';
import ThirdPartyPanel from './ThirdPartyPanel';

const LoginContainer: React.FC = () => (
  <div className="page-container text-center login" style={{ paddingTop: 50 }}>
    <LoginForm />
    <br />
    <Typography variant="h5" style={{
      color: '#fff',
      fontWeight: 100,
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
