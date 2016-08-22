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

  afterModel: function () {
    // this.rerender()
  },

  model: function (params) {
    console.log('in model')
    let token = this.get('session.data.authenticated.access_token')
    let spotifyApi = new SpotifyWebApi()

    spotifyApi.setAccessToken(token)
    this.set('playlistId', params.id)
    this.set('userId', this.get('session.data.authenticated.user_id'))

    return this.queryPhotos(params.id)
    
  },

  queryPhotos: function (id) {
    let currentPhotos = this.get('mixtapePhotos')
    console.log('current photos: ', currentPhotos)
   return this.get('store').query('image', { 
      orderBy: 'playlist',
      equalTo: id
    }).then( (images) => {
      console.log('current saved images: ', images.content)
      // why doesn't this loop go through each saved photo? If there are 3 photos,
      // it goes through only twice. It does not hit the new photo added.
      for (var i = 0; i < images.content.length; i++) {
        console.log(i, images.content[i])
        if (!this.get('mixtapePhotos').contains(images.content[i]._data.url)) {
          console.log('photo on iteration: ', images.content[i]._data.url)
          this.get('mixtapePhotos').pushObject(images.content[i]._data.url)
        }
        console.log('after adding photo: ', this.get('mixtapePhotos'))
      }
      return this.get('mixtapePhotos')
    })
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('playlistId', this.get('playlistId'));
    controller.set('userId', this.get('userId'));
    console.log('setup controller')
    controller.set('mixtapePhotos', this.get('mixtapePhotos'))
    console.log('after controller setup: ', this.get('mixtapePhotos'))
  },
});
