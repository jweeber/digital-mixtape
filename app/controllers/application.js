import Ember from 'ember'

const services = Ember.inject.service()

export default Ember.Controller.extend({
  session:     services,
  currentUser: services,

  actions: {
    login () {
      this.get('session').authenticate('authenticator:torii', 'spotify-oauth2-bearer')
    },

    logout () { 
      this.get('session').invalidate()
    },
  } 

})
