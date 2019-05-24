import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { logger } from './logger';
import * as serviceWorker from './serviceWorker';
import { initialize } from './firebase';

initialize();

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();

logger.log('Want to help develop When?');
logger.log('We\'re open-source! https://github.com/WhenApp/When');
