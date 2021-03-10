const { BATTLENET_API_KEY } = process.env

const fetch = require('node-fetch')
const kebabCase = require('lodash.kebabcase')
const sortBy = require('lodash.sortby')

class Guild {
  constructor(options) {
    this.options = options
  }

  async do() {
    await this.fetch()

    return this.parse()
  }

  async fetch() {
    const { server, realm, name } = this.options

    const uri = `https://${server.toLowerCase()}.api.battle.net/wow/guild/${encodeURIComponent(
      realm
    )}/${encodeURIComponent(name)}?fields=members&locale=en_US&apikey=${
      BATTLENET_API_KEY
    }`

    const response = await fetch(uri)

    const json = await response.json()

    this.data = json
  }

  parse() {
    const people = {
      leadership: [],
      members: []
    }

    const { members } = this.data

    members.forEach(member => {
      const { character, rank } = member
      const { name, thumbnail, race, spec } = character

      const person = {
        name,
        avatar: `https://render-eu.worldofwarcraft.com/character/${thumbnail}`,
        race: this.raceName(race, !this.options.pretty),
        class: this.className(character.class, !this.options.pretty)
      }

      if (this.options.rank) {
        person.rank = rank
      }

      if (this.options.about) {
        if (spec && spec.role) {
          person.about = this.roleName(spec.role)
        } else {
          person.about = ''
        }
      }

      if (this.options.spec && spec) {
        person.spec = {
          name: spec.name,
          role: spec.role
        }
      }

      if (this.options.leadership.indexOf(rank) >= 0) {
        people.leadership.push(person)
      } else if (this.options.ranks.indexOf(rank) >= 0) {
        people.members.push(person)
      }
    })

    if (this.options.sortBy === 'name') {
      sortBy(people.leadership, ['name', 'rank'])
      sortBy(people.members, ['name', 'rank'])
    } else {
      sortBy(people.leadership, ['rank', 'name'])
      sortBy(people.members, ['rank', 'name'])
    }

    return people
  }

  raceName(id, kebab) {
    // http://www.wowhead.com/races
    const races = {
      1: 'Human',
      2: 'Orc',
      3: 'Dwarf',
      4: 'Night Elf',
      5: 'Undead',
      6: 'Tauren',
      7: 'Gnome',
      8: 'Troll',
      9: 'Goblin',
      10: 'Blood Elf',
      11: 'Draenei',
      22: 'Worgen',
      24: 'Pandaren',
      25: 'Pandaren',
      26: 'Pandaren'
    }

    const name = races[id]

    if (kebab) {
      return kebabCase(name)
    }

    return name
  }

  className(id, kebab) {
    // https://wow.gamepedia.com/ClassId
    const classes = {
      1: 'Warrior',
      2: 'Paladin',
      3: 'Hunter',
      4: 'Rogue',
      5: 'Priest',
      6: 'Death Knight',
      7: 'Shaman',
      8: 'Mage',
      9: 'Warlock',
      10: 'Monk',
      11: 'Druid',
      12: 'Demon Hunter'
    }

    const name = classes[id]

    if (kebab) {
      return kebabCase(name)
    }

    return name
  }

  roleName(id) {
    if (id === 'DPS') {
      return 'Damage'
    }

    if (id === 'HEALING') {
      return 'Healer'
    }

    if (id === 'TANK') {
      return 'Tank'
    }
  }
}

module.exports = async options => {
  const guild = new Guild(options)

  const people = await guild.do()

  const json = JSON.stringify(people, null, options.pretty && 2)

  console.log(json)
}
