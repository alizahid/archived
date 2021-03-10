export function initialize(app) {
	app.inject('component', 'router', 'router:main')
	app.inject('service', 'router', 'router:main')

	app.inject('component', 'analytics', 'service:analytics')
	app.inject('controller', 'analytics', 'service:analytics')
	app.inject('route', 'analytics', 'service:analytics')
}

export default {
	name: 'inject',
	initialize
}
