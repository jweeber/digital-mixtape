import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import SpotifyWebApi from 'npm:spotify-web-api-node'

const services = Ember.inject.service()

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  session: services,
  store: services,

  model: function (params) {

    let store = this.get('store')
    let token = this.get('session.data.authenticated.access_token')
    let spotifyApi = new SpotifyWebApi()

    spotifyApi.setAccessToken(token)

    this.set('playlistId', params.id)
    this.set('userId', this.get('session.data.authenticated.user_id'))

    return store.query('image', {
      filter: {
        mixtapes: this.get('playlistId')
      }
    }).then((images) => {
      return this.set('mixtapePhotos', images.content)
    })
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('playlistId', this.get('playlistId'));
    controller.set('userId', this.get('userId'));
    controller.set('mixtapePhotos', this.get('mixtapePhotos'))
  }
});
