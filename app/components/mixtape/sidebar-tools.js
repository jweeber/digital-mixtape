import Ember from 'ember'

export default Ember.Component.extend({

  store: Ember.inject.service(),
  paintIsOpen: false,
  textIsOpen: false,

  actions: {

    togglePaint: function () {
      this.set('textIsOpen', false)
      this.toggleProperty('paintIsOpen')
    },

    toggleText: function () {
      this.set('paintIsOpen', false)
      this.toggleProperty('textIsOpen')
    }
  }
})
