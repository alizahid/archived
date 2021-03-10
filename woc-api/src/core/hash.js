import crypto from 'crypto'
import shortid from 'shortid'

const password = data => crypto.createHash('sha256').update(data).digest('hex')

const random = () => crypto.createHash('sha256').update(shortid.generate() + Date.now()).digest('hex')

export default {
	password,
	random
}
