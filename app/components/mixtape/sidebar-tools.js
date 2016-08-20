import Ember from 'ember'

export default Ember.Component.extend({

  store: Ember.inject.service(),
  filepicker: Ember.inject.service(),

  paintIsOpen: false,
  textIsOpen: false,
  textColorIsOpen: false,
  imgIsOpen: false,


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
      this.get('filepicker.promise').then( () => {
        var store = this.get('store')
        var playlist = this.get('playlist')
        let mixtape = store.peekRecord('mixtape', playlist)

        for (let image of file) {
          let newImage = store.createRecord('image', {
            url: image.url,
            type: image.mimetype,
            filename: image.filename,
            client: image.client,
            mixtapes: mixtape
          })
          newImage.save()
        }
      })
    }
  }
})
