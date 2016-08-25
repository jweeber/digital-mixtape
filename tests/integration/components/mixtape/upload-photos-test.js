import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mixtape/upload-photos', 'Integration | Component | mixtape/upload photos', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mixtape/upload-photos}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mixtape/upload-photos}}
      template block text
    {{/mixtape/upload-photos}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
