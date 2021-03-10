import Ember from 'ember'

export default Ember.Component.extend({
	tagName: 'select',
	attributeBindings: ['required'],

	didInsertElement() {
		let onChange = () => {
			let placeholder = this.$().children('option:first-child:disabled')

			if (placeholder) {
				if (placeholder.is(':selected')) {
					this.$().addClass('placeholder')
				} else {
					this.$().removeClass('placeholder')
				}
			}

			let index = this.$().find(':selected').data('index')

			if (index >= this.content.length) {
				index = 0
			}

			let value = (this.content || []).objectAt(index)

			if (value && this.key) {
				value = value[this.key]
			}

			Ember.run.next(() => this.set('value', value))
		}

		this.$().on('change', onChange)
		this.addObserver('content', this, onChange)

		if (!this.value) {
			onChange()
		}
	},
	willDestroyElement() {
		this.$().off('change')
	}
})
