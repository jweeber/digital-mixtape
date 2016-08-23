import Ember from 'ember';
import SpotifyWebApi from 'npm:spotify-web-api-node'

const services = Ember.inject.service()

export default Ember.Route.extend({

  session: services,
  store: services,

  model(params) {
    console.log(params)

    this.store.findRecord('mixtape', params.id)
  }
});
