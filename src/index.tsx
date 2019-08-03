import React from 'react';
import ReactDOM from 'react-dom';
import WhenIntlProvider from './i18n';
import App from './App';
import { logger } from './logger';
import * as serviceWorker from './serviceWorker';
import { initialize } from './firebase';
import './index.css';

initialize();

ReactDOM.render(
  <React.StrictMode>
    <WhenIntlProvider>
      <App />
    </WhenIntlProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.register();

logger.log('Want to help develop When?');
logger.log('We\'re open-source! https://github.com/WhenApp/When');
