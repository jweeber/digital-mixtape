import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const services = Ember.inject.service()
// const baseURL = "https://api.spotify.com"

export default Ember.Route.extend(AuthenticatedRouteMixin, {


  store: services,
  session: services,
  ajax: services,

  actions: {
    
    createMixtape: function (title) {
      console.log(title)
      var user = this.get("session.data.authenticated.user_id")
      console.log(this.get('session.data.authenticated.access_token'))
      var apiURL = "https://api.spotify.com/v1/users/" + user + "/playlists"
      var token = this.get('session.data.authenticated.access_token')

      return this.get('ajax').request(apiURL, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          name: title,
          public: true
        })
      }).then(function (stuff){
        console.log(stuff.id);
      })
    }
  }
});
