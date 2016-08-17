import Ember from 'ember'

export default Ember.Component.extend({
  isOpen: false,

  actions: {

    toggleOpen: function (event) {
      this.toggleProperty('isOpen')
    },

    toggleClass: function (value) {
      $('body').css('background-color', value)
    }
  }
})
