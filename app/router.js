import Ember from 'ember'
import config from './config/environment'

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function() {
  this.route('user', { path: '/user/:user_id' })
  this.route('mixtape', function () {
    this.route('new', { path: '/:user_id/new' })
    this.route('add', { path: '/:user_id/:playlist_id/add' })
    this.route('edit', { path: '/:user_id/:playlist_id/edit' })
    this.route('upload', { path: '/:user_id/:playlist_id/edit/upload' })
    this.route('shared', { path: '/:user_id/:playlist_id' })
  })
  this.route('login')
})

export default Router
