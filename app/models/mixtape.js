import DS from 'ember-data'

export default DS.Model.extend({
  title: DS.attr('string'),
  background_color: DS.attr('string'),
  message: DS.attr('string'),
  font_style: DS.attr('string'),
  font_color: DS.attr('string'),
  theme: DS.attr('string'),
  url: DS.attr('string'),
  published: DS.attr('boolean', { defaultValue: false }),
  user: DS.belongsTo('user')
})
