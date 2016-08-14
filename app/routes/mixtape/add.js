import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import SpotifyWebApi from 'npm:spotify-web-api-node'

const services = Ember.inject.service()

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  store: services,
  session: services,
  playlistId: null,

  queryParams: {
    query: {
      refreshModel: true
    }
  },
  
  model: function (params) {
    this.set('playlistId', params.id)
    let spotifyApi = new SpotifyWebApi()
    return spotifyApi.searchTracks(params.query, { limit: 5 })
      .then( (data) => {
        return data.body.tracks.items;
      }).catch (function (err) {
        console.error(err);
    })
  },

  actions: {
    addToPlaylist: function (trackId) {
      let playlist = this.get('playlistId')
      let user = this.get('session.data.authenticated.user_id')
      let token = this.get('session.data.authenticated.access_token')

      let spotifyApi = new SpotifyWebApi()
      spotifyApi.setAccessToken(token)

      return spotifyApi.addTracksToPlaylist(user, playlist, [trackId])
        .then( (data) => {
          console.log(data)
            return data
        }).catch (function (err) {
          console.error(err);
      })
    }
  },

});