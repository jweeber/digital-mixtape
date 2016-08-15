import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import SpotifyWebApi from 'npm:spotify-web-api-node'

const services = Ember.inject.service()

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  session: services,
  // playlistId: null,
  // userId: null,


  beforeModel: function (params) {
    console.log(params.mixtape)
    let token = this.get('session.data.authenticated.access_token')
    let spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(token)

    this.set('playlistId', params.id)
    this.set('userId', this.get('session.data.authenticated.user_id'))

    console.log(this.get('playlistId'), this.get('userId'))
    return this.get('playlistId'), this.get('userId')

    // return spotifyApi.getPlaylist(user, playlist)
    //   .then( (data) => {
    //     this.set('playlistId', data.body.uri)
    //     // this.set('userId', user)
    //     // this.set('userPlaylist', data.body.uri)
    //     return this.get('playlistId')
    //   }).catch (function (err) {
        
    // })
  }
});
