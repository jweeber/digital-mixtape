import Ember from 'ember'

export default Ember.Component.extend({

  store: Ember.inject.service(),
  paintIsOpen: false,
  textIsOpen: false,
  textColorIsOpen: false,

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
    }
  }
})
