import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { HomeTwoTone, AvTimerTwoTone, SettingsTwoTone } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const Navigation: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
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

export default Navigation;
