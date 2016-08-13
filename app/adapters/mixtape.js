import DS from 'ember-data';

export default DS.RESTAdapter.extend({

  // createPlaylist: function (title, user) {
  //   var userPlaylistURL = "https://api.spotify.com/v1/users/" + user + "/playlists"

  //   return new Ember.RSVP.Promise(function(resolve, reject) {
  //     Ember.$.getJSON(userPlaylistURL, title, user).then(function(data) {
  //       Ember.run(null, resolve, data);
  //     }, function(jqXHR) {
  //       jqXHR.then = null; // tame jQuery's ill mannered promises
  //       Ember.run(null, reject, jqXHR);
  //     });
  //   });

  // }  
});