import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import SpotifyWebApi from 'npm:spotify-web-api-node'

const services = Ember.inject.service()

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  store: services,
  session: services,
  tracks: [],

  queryParams: {
    search: {
      refreshModel: true
    }
  },
  
  model: function(params) {
    return this.store.find('add-music', params);
  },

  actions: {
    search: function (queryTerm) {
      let spotifyApi = new SpotifyWebApi()
      spotifyApi.searchTracks(queryTerm, { limit: 5 })
        .then( (data) => {
          for (let track of data.body.tracks.items) {
            this.get('tracks').pushObject(track)
          }
          return this.get('tracks')
        }).catch (function (err) {
          console.error(err);
      })
    }
  },

});