import Ember from 'ember';

const services = Ember.inject.service();

export default Ember.Service.extend({
  session: services,
  store: services,

  load: function () {
    return new Promise((resolve, reject) => {
      let userId = this.get('session.data.authenticated.user_id');
      if (!Ember.isEmpty(userId)) {
        return this.get('store').query('user', { equalTo: userId }).then((user) => {
          this.set('user', user);
        }, reject);
      } else {
        resolve();
      }
    });
  }
});