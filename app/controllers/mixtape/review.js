import Ember from 'ember';

export default Ember.Controller.extend({

  store: Ember.inject.service(),

  actions: {
    deletePhoto: function (photo) {
      console.log(photo)
      this.get('store').query('image', {
        orderBy: 'url',
        equalTo: photo
      })
      .then( (image) => {
        console.log(image.content[0].id)
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
});
