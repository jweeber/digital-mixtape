// Manages user login/logout function.
// On login, take user to their profile.
import Ember from 'ember'

const services = Ember.inject.service()

export default Ember.Controller.extend({
  session:     services,
  currentUser: services,

  actions: {
    login () {
      this.get('session').authenticate('authenticator:torii', 'spotify-oauth2-bearer')
      return this.set('userId', this.get('session.data.authenticated.user_id'))
    },

    logout () { 
      return this.get('session').invalidate()
    },

    userProfile: function () {
      return this.transitionToRoute('user', this.get('userId'))
    },
  } 

})
