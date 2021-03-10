export function initialize(app) {
	app.inject('component', 'router', 'router:main');
	app.inject('component', 'store', 'service:store');
}

export default {
	name: 'inject',
	initialize
};
