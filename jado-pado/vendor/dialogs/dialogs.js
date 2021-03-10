'use strict';

var Dialog = {
	alert: function alert(message) {
		return this.dialog('alert', message, ['Okay']);
	},
	confirm: function confirm(message) {
		var buttons = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['Yes', 'No'];

		return this.dialog('confirm', message, buttons);
	},
	prompt: function prompt(message, value) {
		var buttons = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['Okay', 'Cancel'];

		return this.dialog('prompt', message, buttons, value);
	},
	dialog: function dialog(type, message) {
		var buttons = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
		var promptValue = arguments[3];

		return new Promise(function(resolve) {
			var overlay = $('<div>').addClass('overlay'),
				dialog = void 0;

			if (type === 'prompt') {
				dialog = $('<label>');
			} else {
				dialog = $('<div>');
			}

			dialog.addClass('dialog').addClass(type);

			$('<p>').text(message).appendTo(dialog);

			if (type === 'prompt') {
				$('<input>').prop('type', 'text').val(promptValue).appendTo(dialog);
			}

			var footer = $('<footer>');

			buttons.forEach(function(button, index) {
				$('<button>').text(button).on('click', function() {
					if (index === 0) {
						if (type === 'prompt') {
							var data = dialog.find('input').val().trim();

							if (data.length > 0) {
								resolve(data);
							}
						} else {
							resolve();
						}
					}

					overlay.fadeOut('fast', function() {
						overlay.remove();
					});
				}).appendTo(footer);
			});

			dialog.append(footer);

			overlay.append(dialog).on('click', function(e) {
				if ($(e.target).hasClass('overlay')) {
					overlay.fadeOut(function() {
						overlay.remove();
					});
				}
			}).hide().appendTo('body').fadeIn('fast', function() {
				dialog.find('input').focus();
			});
		});
	}
};
