import RESTAdapter from 'ember-data/adapters/rest';
import Config from 'frontend/config/environment';

export default RESTAdapter.extend({
	host: Config.APP.apiEndPoint,
});
