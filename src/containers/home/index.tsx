import React from 'react';
import { Avatar, Theme, Typography } from '@material-ui/core';
import withStyles, { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import AvTimerIcon from '@material-ui/icons/AvTimer';

interface HomeContainerWithStylesProps {
  classes: Record<string, string>;
}

const styles: StyleRulesCallback<Theme, {}> = (theme: Theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#2F2F2F',
    width: 128,
    height: 128,
  },
  avTimerIcon: {
    fontSize: theme.typography.pxToRem(128),
  },
});

const HomeContainer: React.FC<HomeContainerWithStylesProps> = ({ classes }) => (
  <div className="page-container home">
    <Avatar className={classes.avatar}>
      <AvTimerIcon className={classes.avTimerIcon} />
    </Avatar>
    <Typography component="h1" variant="h5" style={{
      color: '#fff',
    }}>
      It's a start, I guess?
    </Typography>
  </div>
);

export default withStyles(styles)(HomeContainer);
