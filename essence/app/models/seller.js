import User from './user';
import attr from 'ember-data/attr';

export default User.extend({
	email: attr(),
});
