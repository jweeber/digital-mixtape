import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  background_color: DS.attr('string'),
  message: DS.attr('string'),
  font_style: DS.attr('string'),
  font_color: DS.attr('string'),
  link: DS.attr('string')
});
