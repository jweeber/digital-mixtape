import Ember from 'ember'

const services = Ember.inject.service()

export default Ember.Controller.extend({

  store: Ember.inject.service(),
  filepicker: Ember.inject.service(),

  paintIsOpen: false,
  textIsOpen: false,
  textColorIsOpen: false,
  imgIsOpen: false,

  pickerOptions: {
    imageDim: [380, 500]
  },

  actions: {

    togglePaint: function () {
      this.set('textIsOpen', false)
      this.set('textColorIsOpen', false)
      this.toggleProperty('paintIsOpen')
    },

    toggleText: function () {
      this.set('paintIsOpen', false)
      this.set('textColorIsOpen', false)
      this.toggleProperty('textIsOpen')
    },

    toggleTextColor: function () {
      this.set('paintIsOpen', false)
      this.set('textIsOpen', false)
      this.toggleProperty('textColorIsOpen')
    },

    selectImages: function () {
      this.set('imgIsOpen', true)
    },

    fileSelected: function (file) {
      console.log('current photos: ', this.get('mixtapePhotos'))
      return this.get('filepicker.promise')
        .then( () => {
          let store = this.get('store')
          let playlist = this.get('playlistId')
          let mixtape = store.peekRecord('mixtape', playlist)
          // let newPhotos = this.get('mixtapePhotos')
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
            this.get('mixtapePhotos').pushObject(image.url)
          }
        return this.get('mixtapePhotos')  
      })
    }
  }
});
