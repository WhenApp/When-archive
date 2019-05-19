import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';
import 'firebase/auth';
import { IProvider } from './SupportedProviders';
import { logger } from '../../logger';

interface SignInButtonProps {
  provider: IProvider;
}

const generateMuiTheme = (color: string) => {
  return createMuiTheme({
    palette: {
      primary: {
        main: color,
      },
    },
    typography: {
      useNextVariants: true,
    },
  });
};

const SignInButton: React.FC<SignInButtonProps> = ({ provider }) => {
  const onButtonClick = () => {
    logger.debug(`Triggering sign in with provider "${provider.name}"`);

    if (provider.instance) {
      firebase.auth().signInWithRedirect(provider.instance);
    }
  };

  return (
    <MuiThemeProvider theme={generateMuiTheme(provider.color)}>
      <Button color="primary" variant="contained" fullWidth onClick={onButtonClick} style={{
        marginBottom: 10,
      }}>
        <provider.image />
        &nbsp;&nbsp;
        {provider.name}
      </Button>
    </MuiThemeProvider>
  );
};

export default SignInButton;
