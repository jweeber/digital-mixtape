import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

const services = Ember.inject.service()

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  session: services,
  store: services,
  mixtapePhotos: [],

  queryParams: {
    query: { refreshModel: true }
  },

  model: function (params) {
    this.set('playlistId', params.playlist_id)
    this.set('userId', params.user_id)

    let store = this.get('store')
 
    this.queryPhotos(this.get('playlistId'))
    return store.findRecord('mixtape', this.get('playlistId')).then((mixtape) => {
      this.set('backgroundColor', mixtape._internalModel._data.background_color)
      this.set('title', mixtape._internalModel._data.title)
      this.set('fontFamily', mixtape._internalModel._data.font_style)
      this.set('message', mixtape._internalModel._data.message)
      this.set('fontColor', mixtape._internalModel._data.font_color)
    })
  },

  queryPhotos: function (id) {
    return this.get('store').query('image', { 
      orderBy: 'playlist',
      equalTo: id
    }).then( (images) => {
      for (let photo of images.content) {
        if (!this.get('mixtapePhotos').contains(photo._data.url)) {
          this.get('mixtapePhotos').pushObject(photo._data.url)
        }
      }
      return this.get('mixtapePhotos')
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
