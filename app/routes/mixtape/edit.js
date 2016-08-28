import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  store: Ember.inject.service(),
  session: Ember.inject.service(),
  mixtapePhotos: [],

  queryParams: {
    query: { refreshModel: true }
  },

  beforeModel: function(transition) {
    if (!this.get('session.data.authenticated.user_id')) {
      return this.transitionTo('login');
    }
  },

  model: function (params) {
    this.set('playlistId', params.playlist_id)
    this.set('userId', params.user_id)

    this.set('backgroundColor', '')
    this.set('title', '')
    this.set('fontFamily', '')
    this.set('message', '')
    this.set('fontColor', '')
    this.set('theme', '')
 
    return this.queryPhotos()
  },

  getMixtape: function () {
    return this.get('store').findRecord('mixtape', this.get('playlistId'))
      .then((mixtape) => {
        this.set('backgroundColor', mixtape._internalModel._data.background_color)
        this.set('title', mixtape._internalModel._data.title)
        this.set('fontFamily', mixtape._internalModel._data.font_style)
        this.set('message', mixtape._internalModel._data.message)
        this.set('fontColor', mixtape._internalModel._data.font_color)
        this.set('theme', mixtape._internalModel._data.theme)
      })
  },

  queryPhotos: function () {
    this.set('mixtapePhotos', [])
    return this.get('store').query('image', { 
      orderBy: 'playlist',
      equalTo: this.get('playlistId')
    }).then( (images) => {
      for (var photo of images.get('content')) {
        if (!this.get('mixtapePhotos').contains(photo._data.url)) {
          this.get('mixtapePhotos').pushObject(photo._data.url) 
        }
      }
      return this.getMixtape()
    })
  },

  setupController: function (controller, model) {
    this._super(controller, model)
    controller.set('title', this.get('title'))
    controller.set('playlistId', this.get('playlistId'))
    controller.set('userId', this.get('userId'))
    controller.set('mixtapePhotos', this.get('mixtapePhotos'))
    controller.set('title', this.get('title'))
    controller.set('backgroundColor', this.get('backgroundColor'))
    controller.set('message', this.get('message'))
    controller.set('fontFamily', this.get('fontFamily'))
    controller.set('fontColor', this.get('fontColor'))
    controller.set('theme', this.get('theme'))
    controller.set('heartSticker', true)
    controller.set('starSticker', true)
    controller.set('flowerSticker', true)
    controller.set('pizzaSticker', true)
  }
})
