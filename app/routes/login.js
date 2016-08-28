import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {

  session: Ember.inject.service(),

  actions: {
    login () {
      return this.get('session').authenticate('authenticator:torii', 'spotify-oauth2-bearer')
    }
  }
});
