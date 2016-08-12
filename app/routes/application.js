import Ember from 'ember'
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin'

const services = Ember.inject.service()

export default Ember.Route.extend(ApplicationRouteMixin, {

  currentUser: services,
  session: services,

  beforeModel: function () {
    return this._loadCurrentUser()
  },

    sessionAuthenticated: function () {
      this._super(...arguments)
      this._loadCurrentUser().catch(() => this.get('session').invalidate())
      this.sessionAuthenticationSucceeded()
    },

    _loadCurrentUser: function () {
      return this.get('currentUser').load()
    },

    sessionAuthenticationSucceeded: function() {
      var currentUser = this.get('session.data.authenticated.user_id')
      this.transitionTo('user', currentUser);
    }
})