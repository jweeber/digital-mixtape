import Ember from 'ember';
import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
// import Firebase from 'firebase';
// import FirebaseAdapter from 'emberfire/adapters/firebase';

const { inject: { service } } = Ember;

export default ToriiAuthenticator.extend({

  torii: service(),
  ajax: service(),
  store: service(),

  authenticate: function () {
    const ajax = this.get('ajax');

    return this._super(...arguments).then((data) => {
      return ajax.request('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + data.authorizationToken.access_token  
        },
        data: {
          scope: 'playlist-read-private playlist-modify-private playlist-modify-public'
        }
      })
      .then((response) => {
        console.log(response)
          var store = this.get('store');
          store.query('user', {orderBy: 'id', equalTo: response.id })
          .then( (records) =>{
            if (records.get('length') === 0) {
                var newUser = store.createRecord('user', {
                  id: response.id,
                  name: response.display_name || "not provided",
                  // image_url: response.images[0].url || "not provided",
                  profile_url: response.external_urls.spotify || "not provided"
                });
                newUser.save()
            } else {
                records.get('firstObject');
            }
          }).catch( (error) => {});

        return {
          access_token: data.authorizationToken.access_token,
          provider: data.provider
        };
      })   
    });
  }
});