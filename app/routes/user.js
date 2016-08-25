import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
  
const services = Ember.inject.service();

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  session: services,

  model: function(params) {
    this.set('userId', params.user_id)
    
    return this.store.findRecord('user', this.get('userId'))
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('userId', this.get('userId'))
  }

});