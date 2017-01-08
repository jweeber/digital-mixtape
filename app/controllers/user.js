// User profile management page.
// Users can add or remove playlists.
import Ember from 'ember'

export default Ember.Controller.extend({

  store: Ember.inject.service(),

  actions: {
    newMixtape: function () {
      return this.transitionToRoute('mixtape.new', this.get('userId'))
    },

    deleteMixtape: function (mixtape, id) {
      return this.get('store').findRecord('mixtape', id)
      .then((record) => {
        this.get('mixtapes').removeObject(mixtape)
        record.destroyRecord()
        return record.save()
      })
    }
  }
})
