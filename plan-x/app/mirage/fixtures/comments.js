import moment from 'moment';

export default [{
	id: 1,
	event: 1,
	user: 2,
	body: 'I got us free entry for up to 40 people.',
	created: moment().subtract(18, 'minutes')
}, {
	id: 2,
	event: 1,
	user: 3,
	body: 'That is amazing!',
	created: moment().subtract(12, 'minutes')
}];
