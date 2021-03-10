import Ember from 'ember'

export default Ember.Mixin.create({
	_threshold: 250,

	touchStart(e) {
		let press = Ember.run.later(() => this.touchEnd(e), this._threshold)

		this.setProperties({
			_isDragging: false,
			_touchStart: Date.now(),
			_press: press
		})
	},
	touchMove() {
		this.set('_isDragging', true)
	},
	touchEnd(e) {
		Ember.run.cancel(this._press)

		if (this._touchStart && !this._isDragging) {
			let duration = Date.now() - this._touchStart

			if (duration > this._threshold) {
				this.press(e)
			} else {
				this.tap(e)
			}

			this.setProperties({
				_touchStart: null,
				_press: null
			})
		}
	}
})
