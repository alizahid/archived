const postmark = require('postmark')

module.exports = new postmark.Client(process.env.POSTMARK_API_KEY)
