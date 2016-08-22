import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import SpotifyWebApi from 'npm:spotify-web-api-node'

const services = Ember.inject.service()

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  session: services,
  store: services,
  mixtapePhotos: [],

  queryParams: {
    query: { refreshModel: true }
  },

  model: function (params) {
    let token = this.get('session.data.authenticated.access_token')
    let spotifyApi = new SpotifyWebApi()

    spotifyApi.setAccessToken(token)
    this.set('playlistId', params.id)
    this.set('userId', this.get('session.data.authenticated.user_id'))

    // return this.get('userId'), this.get('playlistId')
    return this.get('store').query('image', { 
      orderBy: 'playlist',
      equalTo: params.id
    }).then( (images) => {
        for (let photo of images.content) {
          this.get('mixtapePhotos').pushObject(photo._data.url)
        }
        return this.get('mixtapePhotos')
    })
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('playlistId', this.get('playlistId'));
    controller.set('userId', this.get('userId'));
    // this.set('mixtapePhotos', this.get('mixtapePhotos'))
    // console.log('controller', this.get('mixtapePhotos'))
    controller.set('mixtapePhotos', this.get('mixtapePhotos'))
  },

  // actions: {
  //   refreshModel: function() {
  //     this.refresh();
  //   }
  // }

});
