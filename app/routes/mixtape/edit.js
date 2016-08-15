import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import SpotifyWebApi from 'npm:spotify-web-api-node'

const services = Ember.inject.service()

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  session: services,

  model: function (params) {
    let token = this.get('session.data.authenticated.access_token')
    let spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(token)

    this.set('playlistId', params.id)
    this.set('userId', this.get('session.data.authenticated.user_id'))

    return this.get('playlistId'), this.get('userId')
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('playlistId', this.get('playlistId'));
    controller.set('userId', this.get('userId'));
  }
});
