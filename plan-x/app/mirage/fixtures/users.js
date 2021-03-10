import moment from 'moment';

export default [{
	id: 1,
	name: 'Ali Zahid',
	email: 'ali.zahid@live.com',
	phone: '0559651960',
	photo: 'assets/images/dev/ali-zahid.jpg',
	joined: moment().subtract(3, 'days')
}, {
	id: 2,
	name: 'Naamal Zafar',
	email: 'naamal.zafar@live.com',
	phone: '0559651960',
	photo: 'assets/images/dev/naamal-zafar.jpg',
	joined: moment().subtract(2, 'days')
}, {
	id: 3,
	name: 'Ahson Khan',
	email: 'ahson.khan@live.com',
	phone: '0559651960',
	photo: 'assets/images/dev/ahson-khan.jpg',
	joined: moment().subtract(1, 'days')
}];
