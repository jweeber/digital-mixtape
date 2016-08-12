import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    newMixtape: function () {
      this.transitionToRoute('user.mixtapes.new')
    }
  }

});
