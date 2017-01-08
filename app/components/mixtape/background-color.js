// Saves & sets background color of mixtape based on user selection.
import Ember from 'ember'

export default Ember.Component.extend({

  store: Ember.inject.service(),

  actions: {
    background: function (value) {
      $('.mixtape-container').css('background-color', value)

      var store = this.get('store')
      var playlistId = this.get('playlist')
      return store.findRecord('mixtape', playlistId).then( (mixtape) => {
        mixtape.set('background_color', value)
        return mixtape.save()
      })
    }
  }
})
