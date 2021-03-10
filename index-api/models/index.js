const fs = require('fs')
const path = require('path')

const sequelize = require('sequelize')

const client = new sequelize(process.env.DATABASE_URL, {
	define: {
		underscored: true
	}
})

const db = {}

fs
	.readdirSync(__dirname)
	.filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
	.forEach(file => {
		const model = client.import(path.join(__dirname, file))

		db[model.name.charAt(0).toUpperCase() + model.name.slice(1)] = model
	})

Object.keys(db).forEach(name => {
	if ('associate' in db[name]) {
		db[name].associate(db)
	}
})

db.sequelize = sequelize
db.client = client

module.exports = db
