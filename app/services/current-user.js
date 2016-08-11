import Ember from 'ember';

const { inject: { service }, isEmpty } = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),

  load: function () {
    return new Promise((resolve, reject) => {
      let userId = this.get('session.data.authenticated.user_id');
      // authenticated contains access token, authentication id, etc.
      console.log(this.get('session.data.id'))
      if (!isEmpty(userId)) {
        return this.get('store').find('user', userId).then((user) => {
          // console.log(user)
          // this.set('user', user);
        }, reject);
      } else {
        resolve();
      }
    });
  }
});