import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('your-mixtapes', 'Integration | Component | your mixtapes', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{your-mixtapes}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#your-mixtapes}}
      template block text
    {{/your-mixtapes}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
