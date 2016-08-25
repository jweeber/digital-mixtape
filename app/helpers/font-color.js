import Ember from 'ember';

export function fontColor(color) {
  return Ember.String.htmlSafe("color:" + color);
}

export default Ember.Helper.helper(fontColor);
