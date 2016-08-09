import Ember from 'ember';
import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';

const { inject: { service } } = Ember;

export default ToriiAuthenticator.extend({

  torii: service(),
  ajax: service(),
  store: service(),
  // user: Ember.inject('model', 'user', 'store:user'),

  authenticate() {
    const ajax = this.get('ajax');

    return this._super(...arguments).then((data) => {
      return ajax.request('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + data.authorizationToken.access_token  
        },
        data: {
          scope: 'playlist-read-private playlist-modify-private playlist-modify-public'
        }
      }).then((response) => {
        // need to save user data here
        var userModel = this.get('store')
        var newUser = userModel.createRecord('user', {
          name: response.display_name,
          spotify_id: response.id,
          image_url: response.images[0].url,
          profile_url: response.external_urls.spotify
        });
        newUser.save();
        console.log(response.display_name, response.id, response.images[0].url, response.external_urls.spotify)
        return {
          access_token: response.access_token,
          provider: data.provider
        };
      });
    });
  }
});