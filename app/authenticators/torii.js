import Ember from 'ember';
import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
import ENV from "../config/environment";

// export default ToriiAuthenticator.extend({ torii: Ember.inject.service() })

const { inject: { service } } = Ember;

export default ToriiAuthenticator.extend({

  torii: service(),
  ajax: service(),

  authenticate() {
    const ajax = this.get('ajax');

    return this._super(...arguments).then((data) => {
      return ajax.request('https://accounts.spotify.com/api/token', {
        // Authorization: { 'client_id': ENV.SPOTIFY_ID, 'client_secret': ENV.SPOTIFY_SECRET},
        type:     'POST',
        dataType: 'json',
        data:     { 'grant_type': 'authorization_code', 'code': data.authorizationToken.access_token }
      }).then((response) => {
        return {
          // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
          access_token: response.access_token,
          // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
          provider: data.provider
        };
      });
    });
  }
});