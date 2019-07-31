import React from 'react';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';

const TasksContainer: React.FC = () => (
  <div className="page-container tasks">
    <Typography component="h1" variant="h5" style={{
      color: '#fff',
    }}>
      <FormattedMessage
        id="tasks.blurb"
      />
    </Typography>
  </div>
);

export default TasksContainer;
