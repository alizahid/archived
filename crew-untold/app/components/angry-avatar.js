import Ember from 'ember'

const avatars = {
	data: {},

	get(id) {
		return this.data[id]
	},
	put(id, image) {
		this.data[id] = image
	}
}

const colors = () => {
	const themes = [
		['rgb(118, 94, 230)', 'rgb(28, 159, 255)'],
		['rgb(232, 79, 83)', 'rgb(235, 189, 148)'],
		['rgb(149, 77, 176)', 'rgb(113, 89, 240)'],
		['rgb(81, 160, 62)', 'rgb(170, 223, 93)'],
		['rgb(85, 141, 235)', 'rgb(83, 210, 229)']
	]

	return themes[Math.floor(Math.random() * themes.length)]
}

const component = Ember.Component.extend({
	tagName: 'figure',
	classNames: ['avatar'],

	user: 'ape',
	seed: 'hello',
	size: 64,

	didInsertElement() {
		let image = this.create()

		let size = this.$().height()

		this.$().height(size).width(size).html(image)
	},

	create() {
		let seed = this.id()

		if (!avatars.get(seed)) {
			avatars.put(seed, this.make())
		}

		let image = avatars.get(seed).png()

		return Ember.$('<img>').attr('src', image)
	},
	make() {
		return new Trianglify({
			cell_size: this.size,
			height: this.size,
			seed: this.id(),
			x_colors: colors(),
			width: this.size
		})
	},
	id() {
		return this.user + this.seed
	}
})

component.reopenClass({
	positionalParams: ['user', 'seed', 'size']
})

export default component
