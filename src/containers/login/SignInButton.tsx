import React from 'react';
import { Button } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from 'firebase/app';
import { IProvider } from './SupportedProviders';
import { useAuthState } from '../../firebase';
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
  });
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      marginRight: theme.spacing(1),
    },
  }),
);

const SignInButton: React.FC<SignInButtonProps> = ({ provider }) => {
  const classes = useStyles();

  const { initialising } = useAuthState();
  const onButtonClick = () => {
    logger.debug(`Triggering sign in with provider "${provider.name}"`);

    if (provider.instance) {
      firebase.auth().signInWithRedirect(provider.instance);
    }
  };

  return (
    <MuiThemeProvider theme={generateMuiTheme(provider.color)}>
      <Button
        color="primary"
        disabled={initialising}
        size="large"
        variant="contained"
        fullWidth
        onClick={onButtonClick}
        style={{
          marginTop: 10,
        }}
      >
        <FontAwesomeIcon icon={provider.icon} className={classes.icon} />
        &nbsp;&nbsp;
        {provider.name}
      </Button>
    </MuiThemeProvider>
  );
};

export default SignInButton;
