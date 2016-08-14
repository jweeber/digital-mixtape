import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  // this.route('users')
  this.route('user', { path: '/user/:id' }, function () {
  })
  this.route('mixtape', function () {
    this.route('new')
    this.route('add-music');
  })
  this.route('login');
});

export default Router;
