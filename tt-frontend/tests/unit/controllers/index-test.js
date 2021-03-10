import {
	moduleFor,
	test
} from 'ember-qunit';

moduleFor('controller:index', 'Unit | Controller | index', {
	needs: ['model:product'],
});

test('it exists', function(assert) {
	let controller = this.subject();
	assert.ok(controller);
});

test('restart works', function(assert) {
	let controller = this.subject();

	controller.set('url', 'foo');

	controller.send('restart');

	assert.notOk(controller.get('url'));
});
