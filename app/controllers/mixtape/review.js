// User can review and delete photos they have uploaded for the mixtape.
import Ember from 'ember'

export default Ember.Controller.extend({

  store: Ember.inject.service(),

  actions: {
    deletePhoto: function (photo) {
      this.get('store').query('image', {
        orderBy: 'url',
        equalTo: photo
      })
      .then( (image) => {
        this.get('mixtapePhotos').removeObject(photo)
        this.get('store').findRecord('image', image.content[0].id).then ((record) => {
         record.destroyRecord()
        return record.save()
        })
      })
    },

    finishedRemoving: function () {
      return this.transitionToRoute('mixtape.edit', this.get('userId'), this.get('playlistId'))
    }
  }
})
