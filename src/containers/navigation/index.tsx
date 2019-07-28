import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { HomeTwoTone, AvTimerTwoTone, SettingsTwoTone } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const Navigation: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
      <BottomNavigationAction label="Home" icon={<HomeTwoTone />} />
      <BottomNavigationAction label="Tasks" icon={<AvTimerTwoTone />} />
      <BottomNavigationAction label="Settings" icon={<SettingsTwoTone />} />
    </BottomNavigation>
  );
};

export default withRouter(Navigation);
