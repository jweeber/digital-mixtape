import Ember from 'ember';
import SpotifyWebApi from 'npm:spotify-web-api-node'

const services = Ember.inject.service()

export default Ember.Controller.extend({

  session: services,
  playlist: [],

  actions: {
    addToPlaylist: function (trackURI, trackId) {
      let playlist = this.get('playlistId')
      let user = this.get('session.data.authenticated.user_id')
      let token = this.get('session.data.authenticated.access_token')

      let spotifyApi = new SpotifyWebApi()
      spotifyApi.setAccessToken(token)


      return spotifyApi.addTracksToPlaylist(user, playlist, [trackURI])
        .then( (data) => {
          this.addToCurrentTracks(trackId)
          return data
        }).catch (function (err) {
          console.error(err);
      })
    },

    removeFromPlaylist: function (trackURI, trackId) {
      let playlist = this.get('playlistId')
      let user = this.get('session.data.authenticated.user_id')
      let token = this.get('session.data.authenticated.access_token')

      let spotifyApi = new SpotifyWebApi()
      spotifyApi.setAccessToken(token)


      return spotifyApi.removeTracksFromPlaylist(user, playlist, [{ "uri": trackURI }])
        .then( (data) => {
          this.get('playlist').forEach(function (track) {
            console.log(track.id, trackId);
            if (track.id === trackId) {
              this.get('playlist').removeObject(track)
            } 
          });
          return this.get('playlist')
        }).catch (function (err) {
          console.error(err);
      })
    },

    finished: function () {
      return this.transitionToRoute('mixtape.edit', this.get('playlistId'))
    }
  },

  addToCurrentTracks: function (trackId) {
    let token = this.get('session.data.authenticated.access_token')

    let spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(token)

    return spotifyApi.getTrack(trackId)
      .then( (data) => {
        this.get('playlist').pushObject(data.body)
        return this.get('playlist')
      }).catch( function (err) {
        console.log(err)
    })
  },
});
