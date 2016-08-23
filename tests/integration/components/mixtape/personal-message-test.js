import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mixtape/personal-message', 'Integration | Component | mixtape/personal message', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mixtape/personal-message}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mixtape/personal-message}}
      template block text
    {{/mixtape/personal-message}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
