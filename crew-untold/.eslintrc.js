module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module'
	},
	extends: 'eslint:recommended',
	env: {
		browser: true
	},
	rules: {
		"no-empty": [2, {
			allowEmptyCatch: true
		}]
	},
	globals: {
		AppRate: true,
		codePush: true,
		cordova: true,
		device: true,
		FCMPlugin: true,
		InstallMode: true,
		StatusBar: true,
		Trianglify: true
	}
}
