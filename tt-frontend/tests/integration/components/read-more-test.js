import {
	moduleForComponent,
	test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('read-more', 'Integration | Component | read more', {
	integration: true
});

const short = 'abcdefghijklmnopqrstuvwxyz',
	long = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';

test('it renders', function(assert) {
	this.set('data', short);

	this.render(hbs `{{read-more data}}`);

	assert.equal(this.$().text().trim(), short);
});

test('should expand on click', function(assert) {
	this.set('data', long);

	this.render(hbs `{{read-more data}}`);

	assert.equal(this.$('.more').length, 1);

	this.$('.more').click();

	assert.equal(this.$('.more').length, 0);
});
