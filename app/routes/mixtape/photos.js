import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  store: Ember.inject.service(),
  mixtapePhotos: [],

  model: function (params) {
    this.set('userId', params.user_id)
    this.set('playlistId', params.playlist_id)

    return this.queryPhotos(this.get('playlistId'))
  },

  queryPhotos: function (id) {
    return this.get('store').query('image', { 
      orderBy: 'playlist',
      equalTo: id
    }).then( (images) => {
      // for (let photo of images) {
        return this.set('mixtapePhotos', images.content)
        // if (!this.get('mixtapePhotos').contains(photo._data.url)) {
          // this.get('mixtapePhotos').pushObject(photo._data.url)
        // }
      // }
    })
  },

  setupController: function (controller, model) {
    this._super(controller, model)
    controller.set('userId', this.get('userId'))
    controller.set('playlistId', this.get('playlistId'))
    controller.set('mixtapePhotos', this.get('mixtapePhotos'))
  }
});
