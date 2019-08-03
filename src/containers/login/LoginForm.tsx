import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Avatar, Button, CircularProgress,
  FormControl, Input, InputLabel,
  Paper, Theme, Typography,
} from '@material-ui/core';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import withStyles, { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { useSnackbar, OptionsObject } from 'notistack';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { useAuthState } from '../../firebase';
import { logger } from '../../logger';

interface LoginFormWithStylesProps {
  classes: Record<string, string>;
}

const styles: StyleRulesCallback<Theme, {}> = (theme: Theme) => ({
  main: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  thinWeight: {
    fontWeight: 100,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    position: 'relative',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#2F2F2F',
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  signup: {
    color: theme.palette.secondary.dark,
    textDecoration: 'underline',
    cursor: 'pointer',
    paddingLeft: 5,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: theme.shape.borderRadius,
    zIndex: 9001,
  },
});

const LoginForm: React.FC<LoginFormWithStylesProps> = ({ classes }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [formType, setFormType] = useState('login');
  const [, initializing] = useAuthState();
  const intl = useIntl();

  const messages = defineMessages({
    emailAlreadyInUse: {
      id: 'login.error.emailAlreadyInUse',
    },
    operationNotAllowed: {
      id: 'login.error.operationNotAllowed',
    },
    weakPassword: {
      id: 'login.error.weakPassword',
    },
    invalidEmail: {
      id: 'login.error.invalidEmail',
    },
    accountDisabled: {
      id: 'login.error.accountDisabled',
    },
    userError: {
      id: 'login.error.userError',
    },
    unmatchingPasswords: {
      id: 'login.error.unmatchingPasswords',
    },
    unexpectedError: {
      id: 'general.unexpectedError',
    },
    callToActionLogIn: {
      id: 'login.callToActionLogIn',
    },
    callToActionSignUp: {
      id: 'login.callToActionSignUp',
    },
  });

  const snackBarOptions: OptionsObject = {
    variant: 'error',
    persist: true,
    action: key => (
      <Button onClick={() => closeSnackbar(key)} style={{ color: '#fff' }}>
        <FormattedMessage
          id="general.gotIt"
        />
      </Button>
    ),
  };

  const handleAuthError = (error: any) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        firebase.auth().fetchSignInMethodsForEmail(email)
          .then((data) => {
            console.log(data);
          });
        return enqueueSnackbar(intl.formatMessage(messages.emailAlreadyInUse), snackBarOptions);
      case 'auth/operation-not-allowed':
        return enqueueSnackbar(intl.formatMessage(messages.operationNotAllowed), snackBarOptions);
      case 'auth/weak-password':
        return enqueueSnackbar(intl.formatMessage(messages.weakPassword), snackBarOptions);
      case 'auth/invalid-email':
        return enqueueSnackbar(intl.formatMessage(messages.invalidEmail), snackBarOptions);
      case 'auth/user-disabled':
        return enqueueSnackbar(intl.formatMessage(messages.accountDisabled), snackBarOptions);
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return enqueueSnackbar(intl.formatMessage(messages.userError), snackBarOptions);
      default:
        return enqueueSnackbar(intl.formatMessage(messages.unexpectedError), snackBarOptions);
    }
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formType === 'register') {
      logger.debug(`Triggering registration for email "${email}"`);

      if (password2 !== password) {
        return enqueueSnackbar(intl.formatMessage(messages.unmatchingPasswords), snackBarOptions);
      }

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(handleAuthError);
    } else {
      logger.debug(`Triggering sign in with email "${email}"`);

      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(handleAuthError);
    }
  };

  const toggleFormType = () => {
    setFormType(formType === 'login' ? 'register' : 'login');
  };

  return (
    <main className={classes.main}>
      <Paper className={classes.paper} elevation={6}>
        { initializing && (
          <div className={classes.overlay}>
            <CircularProgress />
          </div>
        )}
        <Avatar className={classes.avatar}>
          <AvTimerIcon fontSize="large" />
        </Avatar>
        { formType === 'login' && (
          <div>
            <Typography className={classes.thinWeight} variant="h5">
            <FormattedMessage
              id="login.blurbLogIn"
            />
            </Typography>
            <Typography className={classes.thinWeight} variant="subtitle1">
              <FormattedMessage
                id="login.newHere"
              />
              <span
                className={classes.signup}
                onClick={toggleFormType}
              >
                <FormattedMessage
                  id="login.signUpForFree"
                />
              </span>
            </Typography>
          </div>
        )}
        { formType === 'register' && (
          <div>
            <Typography className={classes.thinWeight} variant="h5">
              <FormattedMessage
                id="login.blurbSignUp"
              />
            </Typography>
            <Typography className={classes.thinWeight} variant="subtitle1">
              <FormattedMessage
                id="login.alreadySignedUp"
              />
              <span
                className={classes.signup}
                onClick={toggleFormType}
              >
                <FormattedMessage
                  id="login.callToActionLogIn"
                />
              </span>
            </Typography>
          </div>
        )}
        <form className={classes.form} onSubmit={onFormSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">
              <FormattedMessage
                id="login.form.emailAddress"
              />
            </InputLabel>
            <Input
              id="email"
              name="email"
              type="text"
              autoComplete="email username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus={!initializing}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">
              <FormattedMessage
                id="login.form.password"
              />
            </InputLabel>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete={ formType === 'login' ? 'current-password' : 'new-password' }
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
          { formType === 'register' && (
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password-2">
                <FormattedMessage
                  id="login.form.reEnterPassword"
                />
              </InputLabel>
              <Input
                id="password-2"
                name="password-2"
                type="password"
                autoComplete="new-password"
                value={password2}
                onChange={e => setPassword2(e.target.value)}
              />
            </FormControl>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {
              formType === 'login'
              ? intl.formatMessage(messages.callToActionLogIn)
              : intl.formatMessage(messages.callToActionSignUp)
            }
          </Button>
        </form>
      </Paper>
    </main>
  );
};

export default withStyles(styles)(LoginForm);
