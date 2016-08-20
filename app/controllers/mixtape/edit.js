import Ember from 'ember'

const services = Ember.inject.service()

export default Ember.Controller.extend({

  store: services,
  session: services,
  mixtapePhotos: [],

  getPhotos: Ember.computed(function () {
    let store = this.get('store')

    return store.query('image', {
      filter: {
        mixtapes: this.get('playlistId')
      }
    }).then((images) => {
      for (let photo of images.content) {
        this.get('mixtapePhotos').pushObject(photo)
      }
      return this.get('mixtapePhotos')
    })
  })

});
