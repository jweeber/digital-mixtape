import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model: function (params) {
    return this.set('playlistId', params.id)
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('playlistId', this.get('playlistId'));
  }
});
