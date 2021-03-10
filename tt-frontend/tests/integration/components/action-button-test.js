import {
	moduleForComponent,
	test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('action-button', 'Integration | Component | action button', {
	integration: true
});

test('it renders', function(assert) {
	this.render(hbs `{{action-button}}`);

	assert.equal(this.$().text().trim(), '');

	this.render(hbs `
    {{#action-button}}
      template block text
    {{/action-button}}
  `);

	assert.equal(this.$().text().trim(), 'template block text');
});

test('should pass on successful click', function(assert) {
	this.set('foo', () => {
		assert.ok(true);
	});

	this.render(hbs `{{action-button action=(action foo)}}`);

	this.$('a').click();
});
