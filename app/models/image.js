import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  // type: DS.attr('string'),
  // filename: DS.attr('string'),
  // client: DS.attr('string'),
  playlist: DS.attr('string'),
  // mixtapes: DS.belongsTo('mixtape')
});
