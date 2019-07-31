import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { HomeTwoTone, AvTimerTwoTone, SettingsTwoTone } from '@material-ui/icons';
import { defineMessages, useIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const Navigation: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const intl = useIntl();
  const [value, setValue] = React.useState(0);

  const messages = defineMessages({
    home: {
      id: 'nav.home',
    },
    tasks: {
      id: 'nav.tasks',
    },
    settings: {
      id: 'nav.settings',
    },
  });

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);

        switch (newValue) {
          case 0:
            return history.push('/home');
          case 1:
            return history.push('/tasks');
          case 2:
            return history.push('/settings');
          default:
            return history.push('/home');
        }
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label={intl.formatMessage(messages.home)} icon={<HomeTwoTone />} />
      <BottomNavigationAction label={intl.formatMessage(messages.tasks)} icon={<AvTimerTwoTone />} />
      <BottomNavigationAction label={intl.formatMessage(messages.settings)} icon={<SettingsTwoTone />} />
    </BottomNavigation>
  );
};

export default withRouter(Navigation);
