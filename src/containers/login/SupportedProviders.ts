import firebase from 'firebase/app';
import 'firebase/auth';
import { faGoogle, faFacebook, faTwitter, faGithub, faMicrosoft, faYahoo } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IProvider {
  name: string;
  color: string;
  icon: IconProp;
  instance: firebase.auth.AuthProvider | null;
}

export default {
  Google: {
    name: 'Google',
    color: '#fff',
    icon: faGoogle,
    instance: new firebase.auth.GoogleAuthProvider(),
  } as IProvider,
  Facebook: {
    name: 'Facebook',
    color: '#3b5998',
    icon: faFacebook,
    instance: new firebase.auth.FacebookAuthProvider(),
  } as IProvider,
  Twitter: {
    name: 'Twitter',
    color: '#38A1F3',
    icon: faTwitter,
    instance: new firebase.auth.TwitterAuthProvider(),
  } as IProvider,
  GitHub: {
    name: 'GitHub',
    color: '#f5f5f5',
    icon: faGithub,
    instance: new firebase.auth.GithubAuthProvider(),
  } as IProvider,
  Microsoft: {
    name: 'Microsoft',
    color: '#2f2f2f',
    icon: faMicrosoft,
    instance: new firebase.auth.OAuthProvider('microsoft.com'),
  } as IProvider,
  Yahoo: {
    name: 'Yahoo!',
    color: '#400090',
    icon: faYahoo,
    instance: new firebase.auth.OAuthProvider('yahoo.com'),
  } as IProvider,
};
