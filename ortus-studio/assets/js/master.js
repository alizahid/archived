$(document).ready(function() {
	var main = $('main', '.slider'),
		section = $('section', main),
		images = $('figure', section).length;

	main.data('total', images).data('index', 0);
	section.width(images * 100 + '%');

	$('a', main).on('click', function(e) {
		e.preventDefault();

		var arrow = $(this);

		if (arrow.hasClass('right')) {
			move();
		} else if (arrow.hasClass('left')) {
			move(true);
		}
	});

	var left = $('a.left', main),
		right = $('a.right', main);

	right.show();

	var move = function(prev) {
		var total = main.data('total') - 1,
			index = main.data('index');

		if (prev) {
			index--;
		} else {
			index++;
		}

		main.data('index', index);
		section.css('margin-left', '-' + index * 100 + '%');

		index === 0 ? left.hide() : left.show();
		index >= total ? right.hide() : right.show();
	};
});
