import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  store: Ember.inject.service(),
  mixtapePhotos: [],

  queryParams: {
    query: { refreshModel: true }
  },

  model: function (params) {
    this.set('playlistId', params.playlist_id)
    this.set('userId', params.user_id)
 
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
      })
  },

  queryPhotos: function () {
    return this.get('store').query('image', { 
      orderBy: 'playlist',
      equalTo: this.get('playlistId')
    }).then( (images) => {
      this.set('mixtapePhotos', images.get('content').toArray())
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
  }
})
