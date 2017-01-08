import Ember from 'ember'

export function fontStyle (font) {
  return Ember.String.htmlSafe("font-family:" + font)
}

export default Ember.Helper.helper(fontStyle)
