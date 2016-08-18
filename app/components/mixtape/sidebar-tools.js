import Ember from 'ember'

export default Ember.Component.extend({

  store: Ember.inject.service(),
  isOpen: false,

  actions: {

    toggleOpen: function (event) {
      this.toggleProperty('isOpen')
    },

    toggleClass: function (value) {
      $('body').css('background-color', value)

      var store = this.get('store')
      var playlistId = this.get('playlist')
      store.findRecord('mixtape', playlistId).then( (mixtape) => {
        console.log(mixtape)
        mixtape.set('background_color', value)
        mixtape.save()
      })
    }
  }
})
