import HeaderButton from '../components/header-button';

export default HeaderButton.extend({
	classNames: ['left', 'menu'],
	click: function () {
		this.toggleProperty('open');
	}
});
