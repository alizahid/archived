const get = require('lodash.get')

const Hero = require('../models/hero')
const Log = require('../models/log')

const auth = require('../lib/auth')

const schemaHero = require('../schemas/hero')
const schemaHeroes = require('../schemas/heroes')
const schemaLogs = require('../schemas/logs-hero')

const getHeroes = {
  method: 'GET',
  url: '/heroes',
  schema: schemaHeroes,
  async handler(request) {
    const heroes = await Hero.find().sort('name')

    return {
      heroes
    }
  }
}

const createHero = {
  method: 'POST',
  url: '/heroes',
  schema: schemaHero,
  beforeHandler: auth,
  async handler(request) {
    const props = get(request, 'body.hero')

    const hero = new Hero(props)

    hero._action = 'create_hero'
    hero._changes = props
    hero._user = request.user

    await hero.save()

    return {
      hero
    }
  }
}

const updateHero = {
  method: 'PUT',
  url: '/heroes/:id',
  schema: schemaHero,
  beforeHandler: auth,
  async handler(request) {
    const { id } = request.params
    const props = get(request, 'body.hero')

    const hero = await Hero.findById(id)

    hero.set(props)

    hero._changes = props
    hero._user = request.user

    await hero.save()

    return {
      hero
    }
  }
}

const createCounter = {
  method: 'POST',
  url: '/heroes/:id/counter',
  beforeHandler: auth,
  async handler(request) {
    const { id } = request.params
    const props = get(request, 'body.counter')

    const hero = await Hero.findById(id)

    hero._action = 'create_counter'
    hero._changes = props
    hero._user = request.user

    hero[props.type].push({
      _id: props.id,
      why: props.why
    })

    await hero.save()

    return {
      message: 'Hero updated'
    }
  }
}

const updateCounter = {
  method: 'PUT',
  url: '/heroes/:id/counter',
  beforeHandler: auth,
  async handler(request) {
    const { id } = request.params
    const props = get(request, 'body.counter')

    const hero = await Hero.findById(id)

    hero._action = 'update_counter'
    hero._changes = props
    hero._user = request.user

    const counter = hero[props.type].id(props.id)

    counter.why = props.why

    await hero.save()

    return {
      message: 'Hero updated'
    }
  }
}

const deleteCounter = {
  method: 'DELETE',
  url: '/heroes/:id/counter',
  beforeHandler: auth,
  async handler(request) {
    const { id } = request.params
    const props = get(request, 'body.counter')

    const hero = await Hero.findById(id)

    hero._action = 'delete_counter'
    hero._changes = props
    hero._user = request.user

    hero[props.type].id(props.id).remove()

    await hero.save()

    return {
      message: 'Hero updated'
    }
  }
}

const getLog = {
  method: 'GET',
  url: '/heroes/:id/logs',
  schema: schemaLogs,
  async handler(request) {
    const { id } = request.params

    const logs = await Log.where('hero')
      .eq(id)
      .limit(200)
      .sort('-created')
      .populate('user', 'username')

    return {
      logs
    }
  }
}

module.exports = (fastify, options, next) => {
  fastify.route(getHeroes)
  fastify.route(createHero)
  fastify.route(updateHero)

  fastify.route(updateCounter)
  fastify.route(createCounter)
  fastify.route(deleteCounter)

  fastify.route(getLog)

  next()
}
