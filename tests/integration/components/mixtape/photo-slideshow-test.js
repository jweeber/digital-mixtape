import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mixtape/photo-slideshow', 'Integration | Component | mixtape/photo slideshow', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mixtape/photo-slideshow}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mixtape/photo-slideshow}}
      template block text
    {{/mixtape/photo-slideshow}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
