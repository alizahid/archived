import crypto from 'crypto'
import shortid from 'shortid'

const password = password => crypto.createHash('sha256').update(password).digest('hex')

const short = () => crypto.createHash('sha256').update(shortid.generate() + Date.now()).digest('base64').replace(/[Il0oO=\/\+]/g, '').substr(0, 4)

const token = () => crypto.createHash('sha256').update(shortid.generate() + Date.now()).digest('hex')

export default {
	password,
	short,
	token
}
