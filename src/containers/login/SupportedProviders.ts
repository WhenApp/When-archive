import { FunctionComponent } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { ReactComponent as GoogleImage } from './images/google.svg';
import { ReactComponent as FacebookImage } from './images/facebook.svg';
import { ReactComponent as TwitterImage } from './images/twitter.svg';
import { ReactComponent as GitHubImage } from './images/github.svg';
import { ReactComponent as MicrosoftImage } from './images/microsoft.svg';
import { ReactComponent as YahooImage } from './images/yahoo.svg';

export interface IProvider {
  name: string;
  color: string;
  image: FunctionComponent;
  instance: firebase.auth.AuthProvider | null;
}

export default {
  Google: {
    name: 'Google',
    color: '#fff',
    image: GoogleImage,
    instance: new firebase.auth.GoogleAuthProvider(),
  } as IProvider,
  Facebook: {
    name: 'Facebook',
    color: '#3b5998',
    image: FacebookImage,
    instance: new firebase.auth.FacebookAuthProvider(),
  } as IProvider,
  Twitter: {
    name: 'Twitter',
    color: '#38A1F3',
    image: TwitterImage,
    instance: new firebase.auth.TwitterAuthProvider(),
  } as IProvider,
  GitHub: {
    name: 'GitHub',
    color: '#f5f5f5',
    image: GitHubImage,
    instance: new firebase.auth.GithubAuthProvider(),
  } as IProvider,
  Microsoft: {
    name: 'Microsoft',
    color: '#2f2f2f',
    image: MicrosoftImage,
    instance: new firebase.auth.OAuthProvider('microsoft.com'),
  } as IProvider,
  Yahoo: {
    name: 'Yahoo!',
    color: '#400090',
    image: YahooImage,
    instance: new firebase.auth.OAuthProvider('yahoo.com'),
  } as IProvider,
};
