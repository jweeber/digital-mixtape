import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('user', { path: '/user/:id' })
  this.route('mixtape', function () {
    this.route('new')
    this.route('add', { path: '/mixtape/add/:id'});
  })
  this.route('login');
});

export default Router;
