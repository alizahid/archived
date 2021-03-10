import HeaderButton from '../components/header-button';

export default HeaderButton.extend({
	classNames: ['left', 'back'],
	click: function () {
		if (window.history.length > 1) {
			window.history.back();
		} else {
			this.get('controller').transitionToRoute('index');
		}
	}
});
