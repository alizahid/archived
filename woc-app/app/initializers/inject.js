export function initialize(app) {
	app.inject('component', 'router', 'router:main')
	app.inject('service', 'router', 'router:main')
}

export default {
	name: 'inject',
	initialize
}
