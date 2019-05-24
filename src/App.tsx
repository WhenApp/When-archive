import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { Redirect, Switch } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './containers/login';
import logo from './images/when.png';
import { useAuthState } from './firebase';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#9c4dcc',
      main: '#6a1b9a',
      dark: '#38006b',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#e254ff',
      main: '#aa00ff',
      dark: '#7200ca',
      contrastText: '#ffffff',
    },
  },
});

const RedirectToLogin: React.FC = () => (
  <Redirect to="/login" />
);

const RedirectToHome: React.FC = () => (
  <Redirect to="/home" />
);

const AppContainer: React.FC = () => {
  const { initialising, user } = useAuthState();

  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3} preventDuplicate dense >
        <div className="app-container">
          { (initialising || !user) ? (
            <Router>
              <Switch>
                <Route path="/login" component={Login} />
                <Route component={RedirectToLogin} />
              </Switch>
            </Router>
          ) : (
            <Router>
              <Switch>
                <Route exact path="/home" component={HomeContainer} />
                <Route component={RedirectToHome} />
              </Switch>
            </Router>
          )}
        </div>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};

const HomeContainer: React.FC = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      It's a start, I guess?
    </p>
  </header>
);

export default AppContainer;
