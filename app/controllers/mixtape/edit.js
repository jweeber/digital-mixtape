import Ember from 'ember'

const services = Ember.inject.service()

export default Ember.Controller.extend({

  // store: services,
  // session: services,

  // getPhotos: Ember.computed( function () {
  //   let store = this.get('store')

  //   return store.query('image', {
  //     filter: {
  //       mixtapes: this.get('playlistId')
  //     }
  //   }).then((images) => {
      
  //     return this.set('mixtapePhotos', images.content)
  //   })
  // })

});
