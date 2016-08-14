import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import SpotifyWebApi from 'npm:spotify-web-api-node'

const services = Ember.inject.service()

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  store: services,
  session: services,
  things: [{name: 'blah'}, {name: 'hello'}],

  actions: {
    search: function (queryTerm) {
        // let token = this.get('session.data.authenticated.access_token')
      let spotifyApi = new SpotifyWebApi()
        // spotifyApi.setAccessToken(token)
    //   var prev = null;

    // // abort previous request, if any
    //   if (prev !== null) {
    //     prev.abort();
    //   }

    // store the current promise in case we need to abort it
        // let tracks = []
      spotifyApi.searchTracks(queryTerm, { limit: 5 })
        .then(function(data) {
          // for (let track of data.body.tracks.items) {
          //   tracks.pushObject(track)
          // }
          // console.log(data.body.tracks.items)
          // console.log(tracks)
          // prev = null;
          // ...render list of search results...

        }, function(err) {
          console.error(err);
      });
          // this.set('tracks', tracks)
          // console.log(this.get('tracks'))
    }
  },
});
