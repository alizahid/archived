const {
	Item
} = require('../models')

const request = require('../lib/request')

// messages

const MESSAGE_WELCOME = `Welcome to Index!`

const MESSAGE_FORMATS = `<AMOUNT> for <DETAILS> in <TAG>

For example: $20.50 for Uber in travel

The <TAG> is optional; the following will also work: 12 for pizza

<AMOUNT>, <DETAILS>, <TAG>

For example: $20.50, Uber, travel

And without the account: 12, pizza`

const MESSAGE_START = `Get started by adding your expenses using one of the following formats:

${MESSAGE_FORMATS}

You can message HELP and FORMATS to see this message again

You will get a message every night showing you a summary of your expenses that day. You can also message SUMMARY to view the summary at any time

You can also message WEEKLY and MONTHLY to view your expenses during the current week and month

That's it! Enjoy using Index 💰`

const MESSAGE_HELP = `Hey. Try the following:

formats
summary
weekly
monthly
tips`

// helpers

const is = {
	formats: message => ['format', 'formats'].indexOf(message.toLowerCase()) >= 0,
	hello: message => ['hello', 'hey', 'hi'].indexOf(message.toLowerCase()) >= 0,
	weekly: message => ['week', 'weekly'].indexOf(message.toLowerCase()) >= 0,
	monthly: message => ['month', 'monthly'].indexOf(message.toLowerCase()) >= 0,
	tips: message => ['tip', 'tips'].indexOf(message.toLowerCase()) >= 0,

	create(message) {
		return this.createComma(message) || this.createText(message)
	},
	createComma(message) {
		let tokens = message.split(',').length

		return tokens === 2 || tokens === 3
	},
	createText(message) {
		message = message.replace('for', ',')
		message = message.replace('in', ',')

		return this.createComma(message)
	},
}

// const

// setup

const setup = () => {
	return request({
		uri: process.env.MESSENGER_API_URL + '/me/messenger_profile',
		qs: {
			access_token: process.env.MESSENGER_PAGE_ACCESS_TOKEN
		},
		method: 'POST',
		json: {
			get_started: {
				payload: 'GET_STARTED'
			},
			greeting: [{
				locale: 'default',
				text: 'Simple expense tracking'
			}]
		}
	})
}

const verify = (req, res) => {
	if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === process.env.MESSENGER_VERIFY_TOKEN) {
		res.send(req.query['hub.challenge'])
	} else {
		res.sendStatus(403)
	}
}

// messages

const received = (event) => {
	if (!event.delivery) {
		console.log(event)
	}

	let sender = event.sender.id

	if (event.postback) {
		let payload = event.postback.payload

		if (payload === 'GET_STARTED') {
			send(sender, MESSAGE_WELCOME)
				.then(() => send(sender, MESSAGE_START))
				.catch(err => console.error(err))
		} else if (payload.indexOf('CREATE_ITEM') >= 0) {
			payload = JSON.parse(payload)

			Item.create({
					user_id: sender,
					amount: payload.amount,
					description: payload.description
				})
				.then(item => send(sender, `Your expense for ${item.amount} for ${item.description} has been saved!`))
		}
	} else if (event.message && event.message.text) {
		let message = event.message.text.replace(/\s+/g, ' ').trim()

		if (message.toLowerCase() === 'hello') {
			send(sender, MESSAGE_WELCOME)
				.then(() => send(sender, MESSAGE_START))
				.catch(err => console.error(err))
		} else if (message.toLowerCase().indexOf('spent') === 0) {
			let tokens = message.split(' ')

			let amount = tokens[1] && tokens[1].replace(/[^0-9\.]+/, '')
			let description = tokens.pop()

			if (amount && description) {
				send(sender, {
					attachment: {
						type: 'template',
						payload: {
							template_type: 'generic',
							elements: [{
								title: `Spent ${amount} on ${description}`,
								subtitle: `Is this what you meant?`,
								buttons: [{
									type: 'postback',
									title: 'Create',
									payload: JSON.stringify({
										action: 'CREATE_ITEM',
										amount,
										description
									})
								}]
							}]
						}
					}
				})
			} else {
				send(sender, `Sorry, could you repeat that? Accepted format is:

<AMOUNT> for <DETAILS> in <account>

spent $20.50 on taxi
spent 12 on food`)
			}
		} else {
			send(sender, event.message)
		}
	}
}

const send = (id, message) => {
	if (typeof message === 'string') {
		message = {
			text: message
		}
	}

	return request({
		uri: process.env.MESSENGER_API_URL + '/me/messages',
		qs: {
			access_token: process.env.MESSENGER_PAGE_ACCESS_TOKEN
		},
		method: 'POST',
		json: {
			recipient: {
				id
			},
			message
		}
	})
}

module.exports = {
	setup,
	verify,
	received,
	send
}
