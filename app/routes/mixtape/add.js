// Route for adding tracks to a mixtape.
// @TODO: error handling.
import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'
import SpotifyWebApi from 'npm:spotify-web-api-node'

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  session: Ember.inject.service(),
  store: Ember.inject.service(),

  queryParams: {
    query: {
      refreshModel: true
    }
  },

  beforeModel: function(transition) {
    if (!this.get('session.data.authenticated.user_id')) {
      return this.transitionTo('login')
    }
  },
  
  model: function (params) {
    this.set('playlistId', params.playlist_id)
    this.set('userId', params.user_id)
    let spotifyApi = new SpotifyWebApi()
    if ((params.query === undefined) || (params.query.length >= 3)) {
      return spotifyApi.searchTracks(params.query, { limit: 6 })
        .then( (data) => {
          return data.body.tracks.items
        }).catch (function (err) {})
    } else { return null }
  },

  setupController: function (controller, model) {
    this._super(controller, model)
    controller.set('playlistId', this.get('playlistId'))
    controller.set('userId', this.get('userId'))
  }
})