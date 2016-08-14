import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import SpotifyWebApi from 'npm:spotify-web-api-node'

const services = Ember.inject.service()

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  store: services,
  session: services,
  tracks: [],

  queryParams: {
    query: {
      refreshModel: true
    }
  },
  
  model: function(query) {
    let spotifyApi = new SpotifyWebApi()
    spotifyApi.searchTracks(query, { limit: 5 })
      .then( (data) => {
        return this.store.query('add-music', query);
        console.error(err);
    })
  },

  actions: {
  },

});