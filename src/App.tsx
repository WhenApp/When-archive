import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { Redirect, Switch } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './containers/login';
import Home from './containers/home';
import Settings from './containers/settings';
import Tasks from './containers/tasks';
import Navigation from './containers/navigation';
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
  const [user, initializing] = useAuthState();

  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3} preventDuplicate dense >
        <div className="app-container">
          { (initializing || !user) ? (
            <Router>
              <Switch>
                <Route path="/login" component={Login} />
                <Route component={RedirectToLogin} />
              </Switch>
            </Router>
          ) : (
            <Router>
              <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/tasks" component={Tasks} />
                <Route exact path="/settings" component={Settings} />
                <Route component={RedirectToHome} />
              </Switch>
              <Navigation />
            </Router>
          )}
        </div>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};

export default AppContainer;
