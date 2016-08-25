import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model: function (params) {
    this.set('playlistId', params.playlist_id)
    this.set('userId', params.user_id)
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('playlistId', this.get('playlistId'))
    controller.set('userId', this.get('userId'))
  }
});
