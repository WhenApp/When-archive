import React from 'react';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';

const SettingsContainer: React.FC = () => (
  <div className="page-container settings">
    <Typography component="h1" variant="h5" style={{
      color: '#fff',
    }}>
      <FormattedMessage
        id="settings.blurb"
      />
    </Typography>
  </div>
);

export default SettingsContainer;
