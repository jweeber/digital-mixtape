import DS from 'ember-data';

export default DS.Model.extend({

  // findAll: function (queryTerm) {
  //   console.log(queryTerm)
  //     let spotifyApi = new SpotifyWebApi()
  //     spotifyApi.searchTracks(queryTerm, { limit: 5 })
  //       .then( (data) => {
  //         for (let track of data.body.tracks.items) {
  //           this.get('tracks').pushObject(track)
  //         }
  //         return this.get('tracks')
  //       }).catch (function (err) {
  //         console.error(err);
  //     })
  //   }

});
