$(document).ready(function () {
	var QUERY_LAST,
		QUERY_TIMEOUT;

	$('.search').on('keyup', function (e) {
		clearTimeout(QUERY_TIMEOUT);

		QUERY_TIMEOUT = setTimeout(function () {
			var results = $('.search-results');

			var query = $('.search').val().trim();

			if (QUERY_LAST === query) {
				return;
			}

			if (query.length >= 2) {
				results.addClass('loading');

				$.get('/search?query=' + query).done(function (data) {
					results.html(data);
				}).always(function () {
					QUERY_LAST = query;

					results.removeClass('loading');
				});
			} else {
				QUERY_LAST = null;

				results.html('');
			}
		}, 300);
	});

	$('#add-show-search').on('submit', function (e) {
		NProgress.start();
	});

	$('a', '#add-show').on('click', function (e) {
		e.preventDefault();

		var name = $(this).text(),
			url = $(this).attr('href');

		var ask = confirm('Do you want to add ' + name + '?');

		if (ask) {
			NProgress.start();

			window.location = url + '?confirm=yes';
		}
	});

	$('.call-to-action').on('click', function (e) {
		var el = $(this);

		var action = el.data('action'),
			href = el.attr('href');

		if (action) {
			e.preventDefault();

			switch (action) {
			case 'focus-search':
				$('.search').focus();

				break;

			case 'dialog':
				if ($('.dialog').length > 0) {
					return;
				}

				NProgress.start();

				$.get(href).done(function (data) {
					var dialog = Dialog(data, el.data('title'));

					$('form', dialog).on('submit', function (e) {
						e.preventDefault();

						var form = $(this),
							exclude = form.data('exclude');

						var valid = !form.serializeArray().some(function (field) {
							if (exclude.indexOf(field.name) > -1) {
								return;
							}

							if (!field.value) {
								$('[name=' + field.name + ']', form).focus();

								return true;
							}
						});

						if (valid) {
							NProgress.start();

							$.ajax({
								url: form.attr('action'),
								type: form.attr('method'),
								data: form.serialize()
							}).then(function () {
								dialog.destroy();

								if (form.data('onsuccess') === 'reload') {
									NProgress.start();

									window.location.reload();
								}
							}, function () {
								var notification = $('<div>').text('An error occurred').addClass('notification red').one('click', function () {
									$(this).stop(true, true).fadeOut('fast', function () {
										$(this).remove();
									});
								}).prependTo(form);

								setTimeout(function () {
									notification.trigger('click');
								}, 5 * 1000);
							}).always(function () {
								NProgress.done();
							});
						}
					});
				}).always(function () {
					NProgress.done();
				});

				break;
			}
		}
	});

	var Dialog = function (html, title) {
		var header = $('<div>').addClass('header'),
			content = $('<div>').addClass('content').html(html);

		$('<a>').addClass('close').appendTo(header).on('click', function (e) {
			e.preventDefault();

			$(this).closest('.dialog').stop(true, true).fadeOut('fast', function () {
				$(this).remove();
			});
		});

		if (title) {
			$('<h3>').text(title).appendTo(header);
		}

		var dialog = $('<div>').addClass('dialog').append(header).append(content).hide().appendTo('body').stop(true, true).fadeIn('fast');

		dialog.destroy = function () {
			$('.close', dialog).trigger('click');
		}

		return dialog;
	}
});