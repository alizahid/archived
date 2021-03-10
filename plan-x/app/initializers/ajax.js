export default {
	name: 'ajax',
	after: 'cordova',
	initialize: function () {
		window.isLoading = false;

		var loading = $('<div>').addClass('overlay').append('<div class="spinner"><div class="mask">');

		$(document).ajaxStart(function () {
			if (!window.isLoading) {
				window.isLoading = true;

				$('body').append(loading);
			}
		});

		$(document).ajaxStop(function () {
			if (window.isLoading) {
				loading.remove();

				window.isLoading = false;
			}
		});
	}
};
