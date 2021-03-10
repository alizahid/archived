import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pull-to-refresh', 'Integration | Component | pull to refresh', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pull-to-refresh}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pull-to-refresh}}
      template block text
    {{/pull-to-refresh}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
