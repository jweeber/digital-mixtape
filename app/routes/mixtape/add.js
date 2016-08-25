import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import SpotifyWebApi from 'npm:spotify-web-api-node'

const services = Ember.inject.service()

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  session: services,
  store: services,

  queryParams: {
    query: {
      refreshModel: true
    }
  },
  
  model: function (params) {
    this.set('playlistId', params.id)
    this.set('userId', this.get('session.data.authenticated.user_id'))

    let spotifyApi = new SpotifyWebApi()
    if ((params.query === undefined) || (params.query.length >= 3)) {
      return spotifyApi.searchTracks(params.query, { limit: 5 })
        .then( (data) => {
          return data.body.tracks.items;
        }).catch (function (err) {
          
      })
    } else { return null }

  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('playlistId', this.get('playlistId'));
    controller.set('userId', this.get('userId'))
  }
});