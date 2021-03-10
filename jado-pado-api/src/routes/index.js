import express from 'express'

const router = express.Router()

router.get('/', (req, res, next) => {
	res.type('text/plain').send('Jado Pado API v1')
})

export default router
