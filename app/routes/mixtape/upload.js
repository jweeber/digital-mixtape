// Route for the upload photos page
import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  session: Ember.inject.service(),

  beforeModel: function(transition) {
    if (!this.get('session.data.authenticated.user_id')) {
      return this.transitionTo('login')
    }
  },

  model: function (params) {
    return this.set('userId', params.user_id), this.set('playlistId', params.playlist_id)
  },

  setupController: function (controller, model) {
    this._super(controller, model)
    controller.set('playlistId', this.get('playlistId'))
    controller.set('userId', this.get('userId'))
  }
})
