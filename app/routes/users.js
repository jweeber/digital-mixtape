import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({

  currentUser: service(),
  session: service(),

  model: function() {
  }

});
