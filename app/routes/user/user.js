import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
  
const services = Ember.inject.service();

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  currentUser: services,
  session: services,
  // store: services,

  model: function() {
    var currentUser = this.get('session.data.authenticated.user_id')
    return this.store.findRecord('user', currentUser)
  }

});
