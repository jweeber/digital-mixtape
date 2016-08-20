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
        this.get('filepicker.promise').then( (filepicker) => {
          console.log(file, file.url)
          return this.get('store').findRecord('mixtape', this.get('playlist')).then( (mixtape) => {
            mixtape.set('images', [file.url])
            return mixtape.save()
           })
        });
    }
  }
})
