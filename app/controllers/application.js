import Ember from 'ember'

const { inject: { service } } = Ember

export default Ember.Controller.extend({
  session:     service(),
  currentUser: service(),

  actions: {
    login () {
      this.get('session').authenticate('authenticator:torii', 'spotify-oauth2-bearer').then( (data) => {
    })
    },

    logout () { 
      this.get('session').invalidate() 
    },
  } 

})
