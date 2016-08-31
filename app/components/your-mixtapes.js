import Ember from 'ember';

export default Ember.Component.extend({

  session: Ember.inject.service(),

  userId: Ember.computed(function () {
    return this.get('session.data.authenticated.user_id')
   }),

  actions: {
    userProfile: function () {
      return this.transitionToRoute('user', this.get('userId'))
    } 
  }
});
