import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  // read about injecting services
  // can i inject the user store?

  actions: {
    login () {
      this.get('session').authenticate('authenticator:torii', 'spotify-oauth2-bearer').then(() => {
        // console.log(this.store.findAll('user'))
      });
    },

    logout () { this.get('session').invalidate(); },

    //p
    // getCurrentUser() { this.get('session.currentUser')}
  } 

});
