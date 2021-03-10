import ActionButtonComponent from './action-button';

export default ActionButtonComponent.extend({
	classNames: ['back'],

	click() {
		window.history.back();
	}
});
