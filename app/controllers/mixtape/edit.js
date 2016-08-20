import Ember from 'ember'

const services = Ember.inject.service()

export default Ember.Controller.extend({

  // store: services,
  // mixtapePhotos: [],

  // getPhotos: Ember.computed(function () {
  //   let store = this.get('store')
  //   return store.query('image', { filter: { playlist: this.get('playlist') } }).then((images) => {
  //     // console.log(images)
  //       for (let photo of images.content) {
  //         this.get('mixtapePhotos').pushObject(photo._data.url)
  //       }
  //       return this.get('mixtapePhotos')
  //   })
  // })

});
