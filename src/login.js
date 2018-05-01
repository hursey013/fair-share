import { firebaseApp } from './config'
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui'

const ui = new firebaseui.auth.AuthUI(firebaseApp.auth());
const uiConfig = {
  autoUpgradeAnonymousUsers: true,
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      return true;
    },
    signInFailure: function(error) {
      if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
        return Promise.resolve();
      }
    }
  },
  uiShown: function() {
    // The widget is rendered.
    // Hide the loader.
    document.getElementById('loader').style.display = 'none';
  },
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    }
  ]
};

ui.start('#firebaseui-auth-container', uiConfig);