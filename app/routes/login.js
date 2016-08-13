import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const services = Ember.inject.service()

export default Ember.Route.extend(UnauthenticatedRouteMixin, {

  session: services,

  actions: {
    login () {
      this.get('session').authenticate('authenticator:torii', 'spotify-oauth2-bearer')
    }
  }
});
