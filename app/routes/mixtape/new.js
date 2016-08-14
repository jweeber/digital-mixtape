import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import SpotifyWebApi from 'npm:spotify-web-api-node'

const services = Ember.inject.service()

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  store: services,
  session: services,

  actions: {
    
    createMixtape: function (title) {
      let user = this.get("session.data.authenticated.user_id")
      let token = this.get('session.data.authenticated.access_token')
      let store = this.get('store')
      let spotifyApi = new SpotifyWebApi()
      spotifyApi.setAccessToken(token)

      spotifyApi.createPlaylist(user, title, { 'public': true })
        .then(function (playlist) {
          let currentUser = store.peekRecord('user', user);
          let newMixtape = store.createRecord('mixtape', {
            id: playlist.body.id,
            title: playlist.body.name,
            user: currentUser
          });
          return newMixtape.save();
        }).catch(function (err) {
            console.error(err);
      });
      this.transitionTo('mixtape.add-music')
    }
  }
});
