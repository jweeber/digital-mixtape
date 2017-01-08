// Saves & sets font style of mixtape based on user selection.
import Ember from 'ember'
import ENV from '../../config/environment'

export default Ember.Component.extend({

  store: Ember.inject.service(),
  fonts: ENV.googleFonts,

  actions: {
    text: function (style) {
      $('.mixtape-text').css('font-family', style)

      var store = this.get('store')
      var playlistId = this.get('playlist')
      return store.findRecord('mixtape', playlistId).then( (mixtape) => {
        mixtape.set('font_style', style)
        return mixtape.save()
      })
    }
  }
})
