/* jshint node: true */

module.exports = function(deployTarget) {
	var ENV = {
		build: {},
		ftp: {
			host: process.env.FTP_HOST,
			username: process.env.FTP_USER,
			password: process.env.FTP_PASSWORD,
			remoteRoot: process.env.FTP_ROOT,
		}
	};

	if (deployTarget === 'development') {
		ENV.build.environment = 'development';
	}

	if (deployTarget === 'staging') {
		ENV.build.environment = 'production';
	}

	if (deployTarget === 'production') {
		ENV.build.environment = 'production';
	}

	return ENV;
};
