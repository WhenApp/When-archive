import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Login from './containers/login';
import logo from './logo.png';
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
  typography: {
    useNextVariants: true,
  },
});

const AppContainer: React.FC = () => (
  <MuiThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={3} preventDuplicate dense >
      <div className="app-container">
        <Router>
          <Route exact path="/" component={HomeContainer} />
          <Route path="/login" component={Login} />
        </Router>
      </div>
    </SnackbarProvider>
  </MuiThemeProvider>
);

const HomeContainer: React.FC = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      It's a start, I guess?
    </p>
  </header>
);

export default AppContainer;
