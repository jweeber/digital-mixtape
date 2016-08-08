import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  // I need to send stuff here:
  // https://accounts.spotify.com/api/token

  // Here is what I need to send:
  // body: grant_type ('authorization_code'), code (access code), redirect_uri
  // header: Authorization. Base 64 encoded string that contains the client ID and client secret key. The field must have the format: Authorization: Basic <base64 encoded client_id:client_secret>

  // How in the hell do I do the thing?
  authorizer: 'authorizer:oauth2', 
  namespace: 'api'
});