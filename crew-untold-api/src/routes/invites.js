import express from 'express'

import Invite from '../models/invite'

import auth from '../core/auth'
import email from '../core/email'
import hash from '../core/hash'
import json from '../core/json'

const router = express.Router()

const routeHandler = (req, res, next) => {
	Invite.findOne()
		.where('user').eq(req.user._id)
		.exec()
		.then(invite => inviteHandler(req, invite))
		.then(invite => json(res, 'invite', invite))
		.catch(err => next(err))
}

const inviteHandler = (req, invite) => {
	if (!invite) {
		invite = new Invite()

		invite.user = req.user._id
		invite.code = hash.short()
	}

	if (req.body.invite) {
		req.body.invite.emails.forEach(address => {
			invite.invites.push({
				address
			})

			email.send(address, `You've been invited to Crew Untold`, `Hello!

You've been invited to join Crew Untold, an exclusive and anonymous social netwrok for airline crew.

Download the app here: http://www.crewuntold.com

And sign up using this code: ${invite.code}

Happy not telling! ;)

The Crew Untold Team`)
		})
	}

	let emails = []

	invite.invites = invite.invites.filter(invite => {
		if (emails.indexOf(invite.email) < 0) {
			return emails.push(invite.email)
		}

		return false
	})

	return invite.save()
}

router.post('/', auth.user, routeHandler)

router.get('/', auth.user, routeHandler)

router.put('/:id', auth.user, (req, res, next) => {
	Invite.findById(req.params.id)
		.where('user').eq(req.user._id)
		.exec()
		.then(invite => inviteHandler(req, invite))
		.then(invite => json(res, 'invite', invite))
		.catch(err => next(err))
})

export default router
