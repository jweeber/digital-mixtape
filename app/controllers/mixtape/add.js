import Ember from 'ember'
import SpotifyWebApi from 'npm:spotify-web-api-node'

const services = Ember.inject.service()

export default Ember.Controller.extend({

  queryParams: "query",
  query: "",

  session: services,
  playlist: [],

  actions: {
    addToPlaylist: function (trackURI, trackId) {
      let playlist = this.get('playlistId')
      let user = this.get('userId')
      let token = this.get('session.data.authenticated.access_token')

      let spotifyApi = new SpotifyWebApi()
      spotifyApi.setAccessToken(token)

      return spotifyApi.addTracksToPlaylist(user, playlist, [trackURI])
        .then( (data) => {
          return this.addToCurrentTracks(trackId)
        }).catch (function (err) {
          console.error(err)
      })
    },

    removeFromPlaylist: function (trackURI, trackId) {
      let playlist = this.get('playlistId')
      let user = this.get('userId')
      let token = this.get('session.data.authenticated.access_token')

      let spotifyApi = new SpotifyWebApi()
      spotifyApi.setAccessToken(token)

      return spotifyApi.removeTracksFromPlaylist(user, playlist, [{"uri": trackURI}])
        .then( (data) => {
          return this.removeFromCurrentTracks(trackId)
        }).catch (function (err) {
          console.error(err)
      })
    },

    finished: function () {
      this.set('playlist', [])
      return this.transitionToRoute('mixtape.edit', this.get('userId'), this.get('playlistId'))
    }
  },

  addToCurrentTracks: function (trackId) {
    let token = this.get('session.data.authenticated.access_token')

    let spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(token)

    return spotifyApi.getTrack(trackId)
      .then( (data) => {
        return this.get('playlist').pushObject({ 
          id: data.body.id,
          uri: data.body.uri,
          image: data.body.album.images[0].url, 
          artist_name: data.body.artists[0].name,
          track_name: data.body.name
        })
      }).catch( function (err) {
        console.log(err)
    })
  },

  removeFromCurrentTracks: function (trackId) {
    var currentPlaylist = this.get('playlist')
    for (let track of currentPlaylist) {
      if (track.id === trackId) {
        currentPlaylist.removeObject(track)
      } 
    }
    return this.set('playlist', currentPlaylist)
  }
})
