export default function () {
	this.urlPrefix = 'https://plan-x.herokuapp.com';

	this.get('/events', ['events', 'comments', 'users']);

	this.get('/events/:id', function (db, request) {
		var id = request.params.id;

		return {
			event: db.events.find(id),
			comments: db.comments.where({
				event: id
			}),
			users: db.users
		};
	});

	this.put('/events/:id');

	this.post('/events');

	this.post('/comments');

	this.get('/users/:id');

	this.post('/users');
}
