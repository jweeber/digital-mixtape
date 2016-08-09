import DS from 'ember-data';

export default DS.Model.extend({
  spotify_id: DS.attr('string'),
  name: DS.attr('string'),
  image_url: DS.attr('string'),
  profile_url: DS.attr('string')
});
