import React from 'react';
import { Theme } from '@material-ui/core';
import withStyles, { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import SignInButton from './SignInButton';
import Providers from './SupportedProviders';

interface ThirdPartyPanelProps {
  classes: Record<string, string>;
}

const styles: StyleRulesCallback = (theme: Theme) => ({
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
});

const ThirdPartyPanel: React.FC<ThirdPartyPanelProps> = ({ classes }) => {
  return (
    <main className={classes.main}>
      <SignInButton provider={Providers.Google} />
      <SignInButton provider={Providers.Facebook} />
      <SignInButton provider={Providers.Twitter} />
      <SignInButton provider={Providers.GitHub} />
      <SignInButton provider={Providers.Microsoft} />
      <SignInButton provider={Providers.Yahoo} />
    </main>
  );
};

export default withStyles(styles)(ThirdPartyPanel);
