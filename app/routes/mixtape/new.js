import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import SpotifyWebApi from 'npm:spotify-web-api-node'

const services = Ember.inject.service()

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  store: services,
  session: services,

  actions: {
    
    createMixtape: function (title) {
      var user = this.get("session.data.authenticated.user_id")
      var token = this.get('session.data.authenticated.access_token')
      var store = this.get('store')
      var spotifyApi = new SpotifyWebApi()
      spotifyApi.setAccessToken(token)

      spotifyApi.createPlaylist(user, title, { 'public': true }).then(function (playlist) {
        var newMixtape = store.createRecord('mixtape', {
            id: playlist.body.id,
            title: playlist.body.name
        })
        return newMixtape.save()
        }, function(err) {
          console.error(err);
      });
    }
  }
});
