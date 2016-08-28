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
        this.get('store').query('user', { equalTo: response.id })
        .then ((records) => {
          if (records.get('length') === 0) {
            return this.createUser(response)
          }
        }, function (reason) {
            return this.createUser(response)
        })

        return {
          access_token: data.authorizationToken.access_token,
          provider: data.provider,
          user_id: response.id
        }
      })   
    })
  },

  createUser: function (response) {
    let images = response.images.length === 0 ? "not provided" : response.images[0].url
    let newUser = this.get('store').createRecord('user', {
      id: response.id,
      name: response.display_name || "not provided",
      image_url: images,
      profile_url: response.external_urls.spotify || "not provided"
    })
    return newUser.save()
  }
})