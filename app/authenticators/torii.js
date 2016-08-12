import Ember from 'ember'
import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii'

const services = Ember.inject.service()

export default ToriiAuthenticator.extend({

  torii: services,
  ajax: services,
  store: services,
  session: services,

  authenticate: function () {
    const ajax = this.get('ajax')

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
        // var session = this.get('session')
        // console.log(session.data.authenticated.user_id)
        console.log(this.get('session.data'))
        var store = this.get('store')
        var images = response.images.length === 0 ? "not provided" : response.images[0].url
        store.query('user', { equalTo: response.id })
        .then( (records) =>{
          if (records.get('length') === 0) {
            var newUser = store.createRecord('user', {
              id: response.id,
              name: response.display_name || "not provided",
              image_url: images,
              profile_url: response.external_urls.spotify || "not provided",

            })
            return newUser.save()
          }
          }).catch( (error) => {})

        return {
          access_token: data.authorizationToken.access_token,
          provider: data.provider,
          user_id: response.id
        }
      })   
    })
  }
})