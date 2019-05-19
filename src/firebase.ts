import app from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBhIK4O_LA8s1d6I3rnve5xSzGMLUrd6oQ',
  authDomain: 'whenappreact.firebaseapp.com',
  databaseURL: 'https://whenappreact.firebaseio.com',
  projectId: 'whenappreact',
  storageBucket: 'whenappreact.appspot.com',
  messagingSenderId: '131736033973',
  appId: '1:131736033973:web:88c703250e2b683c',
};

export default {
  initialize: () => app.initializeApp(firebaseConfig),
};
