import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),

  actions: {
    background: function (value) {
      $('body').css('background-color', value)

      var store = this.get('store')
      var playlistId = this.get('playlist')
      store.findRecord('mixtape', playlistId).then( (mixtape) => {
        mixtape.set('background_color', value)
        mixtape.save()
      })
    }
  }
});
