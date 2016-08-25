import Ember from 'ember';

export function backgroundColor(color) {
  return Ember.String.htmlSafe("background-color:" + color);
}

export default Ember.Helper.helper(backgroundColor);
