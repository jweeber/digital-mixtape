import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import SpotifyWebApi from 'npm:spotify-web-api-node'

const services = Ember.inject.service()

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  store: services,
  session: services,

  queryParams: {
    query: {
      refreshModel: true
    }
  },
  
  model: function(keywords) {
    let spotifyApi = new SpotifyWebApi()
    return spotifyApi.searchTracks(keywords.query)
      .then( (data) => {
        console.log(data.body.tracks.items)
          return data.body.tracks.items;
      }).catch (function (err) {
        console.error(err);
    })
  },

  actions: {
  },

});