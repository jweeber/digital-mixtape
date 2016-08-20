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

    fileSelected: function (file){
      this.get('filepicker.promise').then( () => {
        var store = this.get('store')
        var playlist = this.get('playlist')

        let mixtape = store.peekRecord('mixtape', playlist);
        let newImage = store.createRecord('image', {
          id: file.id,
          url: file.url,
          type: file.mimetype,
          filename: file.filename,
          client: file.client,
          mixtapes: mixtape
        });
        return newImage.save();
      });
    }
  }
})
