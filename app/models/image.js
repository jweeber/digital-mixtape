import DS from 'ember-data'

export default DS.Model.extend({
  url: DS.attr('string'),
  playlist: DS.attr('string'),
  mixtapes: DS.belongsTo('mixtape')
})
