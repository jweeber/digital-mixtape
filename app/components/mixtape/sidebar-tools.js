import Ember from 'ember'

export default Ember.Component.extend({

  store: Ember.inject.service(),
  paintIsOpen: false,
  textIsOpen: false,

  actions: {

    togglePaint: function () {
      this.set('textIsOpen', false)
      this.toggleProperty('paintIsOpen')
    },


    toggleText: function () {
      this.set('paintIsOpen', false)
      this.toggleProperty('textIsOpen')
    },

    background: function (value) {
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
