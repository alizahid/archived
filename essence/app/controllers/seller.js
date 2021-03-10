import Ember from 'ember';

export default Ember.Controller.extend({
	orderChanged: Ember.observer('model.gas.@each.order', function() {
		let grandTotal = 0;

		this.get('model').get('gas').forEach((item) => {
			if (item.order > item.quantity) {
				Ember.set(item, 'order', item.quantity);
			} else {
				let total = (item.order || 0) * item.price;

				Ember.set(item, 'total', total);

				grandTotal += total;
			}
		});

		this.set('total', grandTotal);
	}),

	actions: {
		save() {
			const model = this.get('model');

			let items = model.get('gas').reduce((items, item) => {
				if (item.order > 0) {
					items.push({
						type: item.type,
						quantity: item.order,
						price: item.price
					});
				}

				return items;
			}, []);

			if (items.length > 0) {
				this.setProperties({
					working: true,
					error: null,
				});

				this.store.createRecord('order', {
					seller: model,
					items: items
				}).save().then((data) => {
					this.transitionToRoute('orders.order', data.id);
				}).catch((error) => {
					this.setProperties({
						working: false,
						error: error,
					});
				});
			}
		}
	}
});
