import Ember from 'ember';

export default Ember.Controller.extend({
  needs: 'mixtape.edit',

  store: Ember.inject.service(),
  filepicker: Ember.inject.service(),
  controllers: Ember.inject.controller('mixtape.edit'),

  pickerOptions: {
    imageDim: [500, 900],
    imageMax: [500, 900],
    mimetype: 'image/*',
    services: ['COMPUTER', 'CONVERT', 'FACEBOOK', 'INSTAGRAM', 'FLICKR'],
    openTo: 'COMPUTER',
    conversions: ['crop', 'rotate', 'filter'],
  },

  actions: {
    fileSelected: function (file) {
      return this.get('filepicker.promise')
        .then( () => {
          let store = this.get('store')
          let playlist = this.get('playlistId')
          let mixtape = store.peekRecord('mixtape', playlist)
            let newImage = store.createRecord('image', {
              url: file.url,
              playlist: this.get('playlistId'),
              type: file.mimetype,
              filename: file.filename,
              client: file.client,
              mixtapes: mixtape
            })
            newImage.save()
            .then ( (image) => {
            return this.transitionToRoute('mixtape.edit', this.get('playlistId'))
            }) 
      }) 
    },

    onClose: function () {
      return this.transitionToRoute('mixtape.edit', this.get('playlistId'))
    }
  }
});
