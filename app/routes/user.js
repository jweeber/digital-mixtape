import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
  
export default Ember.Route.extend(AuthenticatedRouteMixin, {

  store: Ember.inject.service(),
  publishedMixtapes: [],
  inProgressMixtapes: [],

  model: function(params) {
    this.set('userId', params.user_id)

    this.getMixtapes()

    return this.store.findRecord('user', this.get('userId'))
    .then( (user) => {
      if (user._internalModel._data.image_url === "not provided") {
        this.set('userImage', '/assets/images/spotify-logo.png')
      } else {
        this.set('userImage', user._internalModel._data.image_url)   
      }

      if (user._internalModel._data.name === "not provided") {
        this.set('name', this.get('userId'))
      } else {
        this.set('name', user._internalModel._data.name)
      }

      return this.set('profileURL', user._internalModel._data.profile_url)
    })
  },

  getMixtapes: function () {
    return this.get('store').query('mixtape', {
      orderBy: 'user',
      equalTo: this.get('userId')
    })
    .then( (mixtapes) => {
      return this.set('mixtapes', mixtapes.toArray())
    })
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    console.log('controller')
    controller.set('userId', this.get('userId'))
    controller.set('name', this.get('name'))
    controller.set('userImage', this.get('userImage'))
    controller.set('profileURL', this.get('profileURL'))
    controller.set('mixtapes', this.get('mixtapes'))
    console.log(this.get('mixtapes'))
  }

});