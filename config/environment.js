/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'digital-mixtape',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {}
    },

    torii: {
      sessionServiceName: 'session',
      providers: {
        'spotify': {
          apiKey: process.env.SPOTIFY_ID,
          redirectUri: 'http://localhost:4200',
          scope: 'playlist-read-private playlist-modify-private playlist-modify-public user-read-email'
        }
      }
    },

    firebase: {
      apiKey: process.env.FIREBASE_KEY,
      authDomain: process.env.FIREBASE_DOMAIN,
      databaseURL: process.env.FIREBASE_DB,
      storageBucket: process.env.FIREBASE_STORAGE
    },

    contentSecurityPolicy: {
      'script-src': "'self' 'unsafe-eval' apis.google.com",
      'frame-src': "'self' https://*.firebaseapp.com",
      'connect-src': "'self' wss://*.firebaseio.com https://*.googleapis.com"
    },

    APP: {}
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
