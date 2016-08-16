import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mixtape/sidebar-tools', 'Integration | Component | mixtape/sidebar tools', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mixtape/sidebar-tools}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mixtape/sidebar-tools}}
      template block text
    {{/mixtape/sidebar-tools}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
