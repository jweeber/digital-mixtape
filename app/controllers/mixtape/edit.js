import Ember from 'ember'

const services = Ember.inject.service()

export default Ember.Controller.extend({

  store: Ember.inject.service(),

  paintIsOpen: false,
  textIsOpen: false,
  textColorIsOpen: false,
  imageIsOpen: false,

  actions: {

    togglePaint: function () {
      this.set('textIsOpen', false)
      this.set('textColorIsOpen', false)
      this.set('imageIsOpen', false)
      this.toggleProperty('paintIsOpen')
    },

    toggleText: function () {
      this.set('paintIsOpen', false)
      this.set('textColorIsOpen', false)
      this.set('imageIsOpen', false)
      this.toggleProperty('textIsOpen')
    },

    toggleTextColor: function () {
      this.set('paintIsOpen', false)
      this.set('textIsOpen', false)
      this.set('imageIsOpen', false)
      this.toggleProperty('textColorIsOpen')
    },

    toggleImages: function () {
      this.set('paintIsOpen', false)
      this.set('textIsOpen', false)
      this.set('textColorIsOpen', false)
      this.set('messageIsOpen', false)
      this.toggleProperty('imageIsOpen')
    },

    selectImages: function () {
      return this.transitionToRoute('mixtape.upload', this.get('userId'), this.get('playlistId'))
    },

    toggleMessage: function () {
      this.set('paintIsOpen', false)
      this.set('textIsOpen', false)
      this.set('textColorIsOpen', false)
      this.set('imageIsOpen', false)

      var popup = document.getElementById('popup1');
      popup.style.display = "block"

    }, 

    saveMessage: function (message) {
      var store = this.get('store')
      var playlistId = this.get('playlistId')
      return store.findRecord('mixtape', playlistId).then( (mixtape) => {
        mixtape.set('message', message)
        mixtape.save().then( () => { 
          this.set('message', message)
          var popup = document.getElementById('popup1');
          popup.style.display = "none" 
        })
      })
    },

    closeMessage: function () {
      var popup = document.getElementById('popup1');
      popup.style.display = "none"
    },

    share: function (userId, playlistId) {
      var store = this.get('store')
      
      return store.findRecord('mixtape', playlistId).then( (mixtape) => {
        mixtape.set('published', true)
        mixtape.set('url', 'http://localhost:4200/mixtape/' + userId + "/" + playlistId)
        mixtape.save()
        .then ( () => { return this.transitionToRoute('mixtape.shared', userId, playlistId) })
      })
    }

  }
});
