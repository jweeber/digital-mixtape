import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {

  currentUser: service(),
  session: service(),

  beforeModel: function () {
    return this._loadCurrentUser();
  },

  sessionAuthenticated: function () {
    this._super(...arguments);
    this._loadCurrentUser().catch(() => this.get('session').invalidate());
  },

  _loadCurrentUser: function () {
    return this.get('currentUser').load();
  }
});