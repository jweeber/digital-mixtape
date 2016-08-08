import Ember from 'ember'
import OAuth2Bearer from 'ember-simple-auth/authorizers/oauth2-bearer'


 export default Base.extend({
  // This is apparently how you do custome authorizer in ember, but I don't
  // understand what any of it is

  // Do I need a model and route for the data to come back to? 
  authorize(sessionData, block) {
    console.log(sessionData)
    block('Authorization', 'Token ' + sessionData.token)
  }
})
// const { isEmpty } = Ember

// export default OAuth2Bearer.extend({
//   authorize(data, block) {
//     const { token }  = data
//     if (!isEmpty(token)) {
//       block('Authorization', `Bearer ${token}`)
//     }
//   }
// })