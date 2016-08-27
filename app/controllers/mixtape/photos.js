import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),

  actions: {
    closePhotos: function () {
      return this.transitionToRoute('mixtape.edit', this.get('userId'), this.get('playlistId'))
    },

    deletePhoto: function (photo) {
      return this.get('store').findRecord('image', photo.id)
        .then((record) => {
          console.log(record)
          // this.get('mixtapePhotos').removeObject(photo)
          record.destroyRecord()
          // console.log(record)
          return record.save()
        })

      // return this.get('store').query('image', {
      //   orderBy: 'url',
      //   equalTo: photoURL,
      // }).then( (photo) => {
      //   // this.get('filepicker.promise').then(function(filepicker){
      //   //   // This does remove the photo from filepicker, but broken image shows up on page
      //   //   // and is not removed from firebase or mixtapePhotos yet.
      //   //     filepicker.remove(photo.content[0]._data.url)
      //   // });
 
      //  // return this.get('store').findRecord('image', photo.content[0].id)
      //  //  .then((record) => {
      //  //    this.get('mixtapePhotos').removeObject(photo.content[0]._data.url)
      //  //    record.destroyRecord()
      //  //    record.save()
      //  //  })
      // })
    },
  }
});
