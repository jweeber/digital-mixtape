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
          redirectUri: 'https://www.digitalmixtape.com',
          scope: 'playlist-modify-public user-read-email'
        }
      }
    },

    contentSecurityPolicy: {
      'script-src': "'self' 'unsafe-eval' apis.google.com",
      'frame-src': "'self' https://*.firebaseapp.com",
      'connect-src': "'self' wss://*.firebaseio.com https://*.googleapis.com",
      'font-src': "'self' fonts.gstatic.com",
      'style-src': "'self' fonts.googleapis.com"
    },

    firebase: {
      apiKey: process.env.FIREBASE_KEY,
      authDomain: 'digital-mixtape-635ce.firebaseapp.com',
      databaseURL: 'https://digital-mixtape-635ce.firebaseio.com',
      storageBucket: ''
    },

    googleFonts: [
      'Lakki Reddy',
      'Baloo Da',
      'Indie Flower',
      'Original Surfer',
      'Orbitron',
      'Finger Paint',
      'Kranky',
      'Special Elite',
      'Eagle Lake',
      'Love Ya Like A Sister',
      'Codystar',
      'Slackey',
      'Crafty Girls'
    ],

    filepickerKey: process.env.FILEPICKER_KEY,

    APP: {}
  }

  if (environment === 'development') {}

  if (environment === 'test') {
    ENV.locationType = 'none'
    ENV.APP.LOG_ACTIVE_GENERATION = false
    ENV.APP.LOG_VIEW_LOOKUPS = false
    ENV.APP.rootElement = '#ember-testing'
  }

  if (environment === 'production') {}

  return ENV
}
