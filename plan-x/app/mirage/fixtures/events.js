import moment from 'moment';

export default [{
	id: 1,
	user: 1,
	description: 'Pacha on Friday night?',
	activity: 'nightclub',
	created: moment().subtract(20, 'minutes'),
	comments: [1, 2],
	attending: [1, 2, 3],
	requests: [2, 3],
	blocked: []
}, {
	id: 2,
	user: 2,
	description: 'My 24th birthday party at Lebanon World Island on the 8th of November.',
	activity: 'birthday',
	created: moment().subtract(2, 'hours'),
	comments: [],
	attending: [2],
	requests: [1, 3],
	blocked: []
}, {
	id: 3,
	user: 3,
	description: 'Getting married next month. Who wants to throw me a bachelor party next week?',
	activity: 'bachelor-party',
	created: moment().subtract(4, 'hours'),
	comments: [],
	attending: [3],
	requests: [2],
	blocked: [1]
}];
