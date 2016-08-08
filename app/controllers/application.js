import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    login () {
      this.get('session').authenticate('authenticator:torii', 'spotify-oauth2-bearer').then(() => {
        // console.log(this.get('session.data.authenticated.authorizationToken.access_token'));
      });
    },

    logout () { this.get('session').invalidate(); }
  } 

});