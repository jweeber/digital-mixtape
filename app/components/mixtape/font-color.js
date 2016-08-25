import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),

  actions: {
    fontColor: function (value) {
      $('.mixtape-text span').css('color', value)
      $('.publish').css('color', value)

      var store = this.get('store')
      var playlistId = this.get('playlist')
      return store.findRecord('mixtape', playlistId).then( (mixtape) => {
        mixtape.set('font_color', value)
        return mixtape.save()
      })
    }
  }
});
