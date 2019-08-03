import React from 'react';
import {
  Icon, List, ListSubheader, ListItem, ListItemIcon, ListItemText, Theme,
} from '@material-ui/core';
import { Info, Lock, Person, Shop } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import withStyles, { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import pkg from '../../../package.json';

interface SettingsContainerWithStylesProps {
  classes: Record<string, string>;
}

const styles: StyleRulesCallback<Theme, {}> = (theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    alignSelf: 'center',
    marginTop: 50,
    paddingBottom: 0,
  },
  faIcon: {
    textAlign: 'center',
  },
  iconRoot: {
    minWidth: 36,
  },
});

const SettingsContainer: React.FC<SettingsContainerWithStylesProps> = ({ classes }) => {
  const intl = useIntl();

  const messages = defineMessages({
    discordTitle: {
      id: 'settings.social.discord.title',
    },
    discordSubTitle: {
      id: 'settings.social.discord.subTitle',
    },
    githubTitle: {
      id: 'settings.social.github.title',
    },
    githubSubTitle: {
      id: 'settings.social.github.subTitle',
    },
  });

  // TODO: these ListItems cause errors in the console due to the inability to forward refs.
  // their functionality is fine, but the errors are ugly so maybe we should fix them sometime.
  return (
    <div className="page-container settings">
      <List
        subheader={<ListSubheader><FormattedMessage id="settings.title" /></ListSubheader>}
        className={classes.root}
      >
        <ListItem button divider component="a" href="https://play.google.com/store/apps/details?id=tech.akpmakes.android.taskkeeper">
          <ListItemIcon className={classes.iconRoot}><Shop /></ListItemIcon>
          <ListItemText>
            <FormattedMessage id="settings.version" values={{ version: pkg.version }} />
          </ListItemText>
        </ListItem>
        <ListItem alignItems="flex-start" button divider component="a" href="https://discord.gg/9GpztdT">
          <ListItemIcon className={classes.iconRoot}>
            <Icon className={classes.faIcon}><FontAwesomeIcon icon={faDiscord} /></Icon>
          </ListItemIcon>
          <ListItemText
            primary={intl.formatMessage(messages.discordTitle)}
            secondary={intl.formatMessage(messages.discordSubTitle)}
          />
        </ListItem>
        <ListItem alignItems="flex-start" button divider component="a" href="https://github.com/WhenApp/When">
          <ListItemIcon className={classes.iconRoot}>
            <Icon className={classes.faIcon}><FontAwesomeIcon icon={faGithubAlt} /></Icon>
          </ListItemIcon>
          <ListItemText
            primary={intl.formatMessage(messages.githubTitle)}
            secondary={intl.formatMessage(messages.githubSubTitle)}
          />
        </ListItem>
        <ListItem button divider component="a" href="https://when.akpmakes.tech/privacy.html">
          <ListItemIcon className={classes.iconRoot}><Lock /></ListItemIcon>
          <ListItemText><FormattedMessage id="settings.privacyPolicy" /></ListItemText>
        </ListItem>
        <ListItem button divider component="a" href="https://when.akpmakes.tech/">
          <ListItemIcon className={classes.iconRoot}><Info /></ListItemIcon>
          <ListItemText><FormattedMessage id="settings.moreInfo" /></ListItemText>
        </ListItem>
        <ListItem button divider component={props => <Link {...props} to="/logout" />}>
          <ListItemIcon className={classes.iconRoot}><Person /></ListItemIcon>
          <ListItemText><FormattedMessage id="settings.signOut" /></ListItemText>
        </ListItem>
      </List>
    </div>
  );
};

export default withStyles(styles)(SettingsContainer);
