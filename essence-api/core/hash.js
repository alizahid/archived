module.exports = function(string) {
	return require('crypto').createHash('sha256').update(string).digest('hex');
}
