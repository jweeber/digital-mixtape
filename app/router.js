import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.resource('users', function () {
    this.route('user', { path: '/:id' }, function () {
      this.resource('mixtapes', function () {
        this.route('new') 
      })
    })
  });

  // this.resource('mixtapes', function () {
  //   this.route('new')
  // })
});

export default Router;
