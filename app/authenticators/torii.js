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
      return ajax.request('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + data.authorizationToken.access_token  
        },
      }).then((response) => {
          console.log(response)
        return {
          access_token: response.access_token,
          provider: data.provider
        };
      });
    });
  }
});