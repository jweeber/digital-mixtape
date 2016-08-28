import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  store: Ember.inject.service(),
  session: Ember.inject.service(),
  mixtapePhotos: [],

  beforeModel: function(transition) {
    if (!this.get('session.data.authenticated.user_id')) {
      return this.transitionTo('login');
    }
  },

  model(params) {
    this.set('playlistId', params.playlist_id)
    this.set('userId', params.user_id)
 
    return this.queryPhotos()
  },

  queryPhotos: function () {
    return this.get('store').query('image', { 
      orderBy: 'playlist',
      equalTo: this.get('playlistId')
    }).then( (images) => {
      for (var photo of images.get('content')) {
        if (!this.get('mixtapePhotos').contains(photo._data.url)) {
          this.get('mixtapePhotos').pushObject(photo._data.url) 
        }
      }
      return this.get('mixtapePhotos')
    })
  },

  setupController: function (controller, model) {
    this._super(controller, model)
    controller.set('playlistId', this.get('playlistId'))
    controller.set('userId', this.get('userId'))
    controller.set('mixtapePhotos', this.get('mixtapePhotos'))
  }
});
