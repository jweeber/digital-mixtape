// Functionality for the side-bar menu while editing a mixtape.
// When user selects a menu, others are closed. 
// When user selects sticker theme, others are removed.
import Ember from 'ember'

const services = Ember.inject.service()

export default Ember.Controller.extend({

  store: Ember.inject.service(),

  paintIsOpen: false,
  textIsOpen: false,
  textColorIsOpen: false,
  imageIsOpen: false,
  heartSticker: true,
  starSticker: true,
  pizzaSticker: true,
  bestCatSticker: true,

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
      this.set('imageIsOpen', false)
      return this.transitionToRoute('mixtape.upload', this.get('userId'), this.get('playlistId'))
    },

    reviewImages: function () {
      this.set('imageIsOpen', false)
      return this.transitionToRoute('mixtape.review', this.get('userId'), this.get('playlistId'))
    },

    toggleMessage: function () {
      this.set('paintIsOpen', false)
      this.set('textIsOpen', false)
      this.set('textColorIsOpen', false)
      this.set('imageIsOpen', false)

      var popup = document.getElementById('popup1')
      popup.style.display = "block"
    }, 

    saveMessage: function (message) {
      var store = this.get('store')
      var playlistId = this.get('playlistId')
      return store.findRecord('mixtape', playlistId).then( (mixtape) => {
        mixtape.set('message', message)
        mixtape.save().then( () => { 
          this.set('message', message)
          var popup = document.getElementById('popup1')
          popup.style.display = "none" 
        })
      })
    },

    closeMessage: function () {
      var popup = document.getElementById('popup1')
      popup.style.display = "none"
    },

    share: function (userId, playlistId) {
      var store = this.get('store')
      
      return store.findRecord('mixtape', playlistId).then( (mixtape) => {
        mixtape.set('published', true)
        mixtape.set('url', 'https://www.digitalmixtape.com/mixtape/' + userId + "/" + playlistId)
        mixtape.save()
        .then ( () => { return this.transitionToRoute('mixtape.shared', userId, playlistId) })
      })
    },

    stickerTheme: function (theme) {
      this.set('paintIsOpen', false)
      this.set('textIsOpen', false)
      this.set('textColorIsOpen', false)
      this.set('messageIsOpen', false)

      if ((theme === "hearts") && (this.get('heartSticker'))) {
        this.set('theme', theme)
        $('.' + theme).prepend('<img src="/assets/images/heart-sticker.png" class="sticker-img">')
        this.toggleProperty('heartSticker')
        this.set('flowerSticker', true)
        this.set('starSticker', true)
        this.set('bestCatSticker', true)
        this.set('pizzaSticker', true)
      } else if ((theme === "stars") && (this.get('starSticker'))) {
        this.set('theme', theme)
        $('.' + theme).prepend('<img src="/assets/images/star-sticker.png" class="sticker-img">')
        this.toggleProperty('starSticker')
        tthis.set('heartSticker', true)
        this.set('flowerSticker', true)
        this.set('bestCatSticker', true)
        this.set('pizzaSticker', true)
      } else if ((theme === "flowers") && (this.get('flowerSticker'))) {
        this.set('theme', theme)
        $('.' + theme).prepend('<img src="/assets/images/flower-sticker.png" class="sticker-img">')
        this.toggleProperty('flowerSticker')
        this.set('heartSticker', true)
        this.set('starSticker', true)
        this.set('bestCatSticker', true)
        this.set('pizzaSticker', true)
      } else if ((theme === "pizza") && (this.get('pizzaSticker'))) {
        this.set('theme', theme)
        $('.' + theme).prepend('<img src="/assets/images/pizza-sticker.png" class="sticker-img">')
        this.toggleProperty('pizzaSticker')
        this.set('bestCatSticker', true)
        this.set('heartSticker', true)
        this.set('starSticker', true)
        this.set('flowerSticker', true)
      } else if ((theme === "bestcat") && (this.get('bestCatSticker'))) {
        this.set('theme', theme)
        $('.' + theme).prepend('<img src="/assets/images/best-cat-sticker.png" class="sticker-img">')
        this.toggleProperty('bestCatSticker')
        this.set('heartSticker', true)
        this.set('starSticker', true)
        this.set('flowerSticker', true)
        this.set('pizzaSticker', true)
      }

      return this.get('store').findRecord('mixtape', this.get('playlistId')).then( (mixtape) => {
        mixtape.set('theme', theme)
        return mixtape.save()
      })
    },

    resetStickers: function () {
      this.set('bestCatSticker', true)
      this.set('heartSticker', true)
      this.set('starSticker', true)
      this.set('flowerSticker', true)
      this.set('pizzaSticker', true)
      this.set('theme', '')
      return this.get('store').findRecord('mixtape', this.get('playlistId')).then( (mixtape) => {
        mixtape.set('theme', '')
        return mixtape.save()
      })
    }

  }
})
