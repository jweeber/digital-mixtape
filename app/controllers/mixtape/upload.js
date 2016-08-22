import Ember from 'ember';

export default Ember.Controller.extend({

  store: Ember.inject.service(),
  filepicker: Ember.inject.service(),

  pickerOptions: {
    imageDim: [500, 400],
    imageMax: [500, 400],
    imageMin: [500, 400],
    mimetype: 'image/*',
    services: ['COMPUTER', 'CONVERT', 'FACEBOOK', 'INSTAGRAM', 'FLICKR'],
    openTo: 'COMPUTER',
    conversions: ['crop', 'rotate', 'filter'],
    cropDim: [500, 400]
  },

  actions: {
    fileSelected: function (file) {
      return this.get('filepicker.promise')
        .then( () => {
          let store = this.get('store')
          let playlist = this.get('playlistId')
          let mixtape = store.peekRecord('mixtape', playlist)
          for (let image of file) {
            let newImage = store.createRecord('image', {
              url: image.url,
              playlist: this.get('playlistId'),
              type: image.mimetype,
              filename: image.filename,
              client: image.client,
              mixtapes: mixtape
            })
            newImage.save() 
          }
      }).then( () => {
        return this.transitionToRoute('mixtape.edit', this.get('playlistId'))
      }) 
    },

    onClose: function () {
      return this.transitionToRoute('mixtape.edit', this.get('playlistId'))
    }
  }
});
