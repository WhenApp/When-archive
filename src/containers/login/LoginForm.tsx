import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Avatar, Button, FormControl, Input, InputLabel, Paper, Theme, Typography } from '@material-ui/core';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import withStyles, { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { useSnackbar, OptionsObject } from 'notistack';
import { logger } from '../../logger';

interface LoginFormProps {
  classes: Record<string, string>;
  onIconClick: () => void;
}

const styles: StyleRulesCallback = (theme: Theme) => ({
  main: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: '#2F2F2F',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  signup: {
    color: theme.palette.secondary.dark,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
});

const LoginForm: React.FC<LoginFormProps> = ({ classes, onIconClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [formType, setFormType] = useState('login');

  const snackBarOptions: OptionsObject = {
    variant: 'error',
    persist: true,
    action: key => (
      <Button onClick={() => closeSnackbar(key)} style={{ color: '#fff' }}>
        Got it
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
        return enqueueSnackbar('An account with this email address already exists.', snackBarOptions);
      case 'auth/operation-not-allowed':
        return enqueueSnackbar('Account creation is currently disabled.', snackBarOptions);
      case 'auth/weak-password':
        return enqueueSnackbar('Your password is too weak.', snackBarOptions);
      case 'auth/invalid-email':
        return enqueueSnackbar('Please enter a valid email address.', snackBarOptions);
      case 'auth/user-disabled':
        return enqueueSnackbar('Your account has been disabled.', snackBarOptions);
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return enqueueSnackbar('Check your email/password and try again.', snackBarOptions);
      default:
        return enqueueSnackbar('An unexpected error has occurred. Please try again.', snackBarOptions);
    }
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formType === 'register') {
      logger.debug(`Triggering registration for email "${email}"`);

      if (password2 !== password) {
        return enqueueSnackbar('Your passwords do not match!', snackBarOptions);
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
        <Avatar className={classes.avatar} onClick={onIconClick}>
          <AvTimerIcon fontSize="large" />
        </Avatar>
        { formType === 'login' && (
          <div>
            <Typography component="h1" variant="h5">
              Log in to When
            </Typography>
            <Typography component="h1" variant="subtitle1">
              New here?&nbsp;
              <span
                className={classes.signup}
                onClick={toggleFormType}
              >
                Sign up for free!
              </span>
            </Typography>
          </div>
        )}
        { formType === 'register' && (
          <div>
            <Typography component="h1" variant="h5">
              Sign up for When
            </Typography>
            <Typography component="h1" variant="subtitle1">
              Already signed up?&nbsp;
              <span
                className={classes.signup}
                onClick={toggleFormType}
              >
                Log in!
              </span>
            </Typography>
          </div>
        )}
        <form className={classes.form} onSubmit={onFormSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
          { formType === 'register' && (
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password-2">Re-enter Password</InputLabel>
              <Input
                name="password-2"
                type="password"
                id="password-2"
                autoComplete="current-password"
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
            { formType === 'login' ? 'Log in' : 'Sign up' }
          </Button>
        </form>
      </Paper>
    </main>
  );
};

export default withStyles(styles)(LoginForm);
