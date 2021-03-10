export default {
	name: 'network',
	after: 'ajax',
	initialize: function () {
		var loading = $('<div>').addClass('overlay').append('<div class="spinner"><div class="mask">');

		loading.append('<span>No network connection');

		document.addEventListener('offline', function () {
			$('body').append(loading);
		}, false);

		document.addEventListener('online', function () {
			loading.remove();
		}, false);
	}
};
