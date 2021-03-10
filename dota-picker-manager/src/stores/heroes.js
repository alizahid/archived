import { extendObservable, ObservableMap } from 'mobx'

import { auth } from './'

import { api } from '../lib'

export default class Heroes {
  constructor() {
    extendObservable(this, {
      error: null,
      filter: {
        roles: []
      },
      heroes: [],
      loading: false,
      remove: new ObservableMap(),
      update: new ObservableMap()
    })

    this.getHeroes()
  }

  async getHeroes() {
    try {
      this.loading = true

      const { heroes } = await api.get('/heroes')

      this.heroes = heroes
    } catch (err) {
      this.error = err
    } finally {
      this.loading = false
    }
  }

  setFilter(filter) {
    this.filter = filter
  }

  findHeroes(query) {
    const regex = new RegExp(query, 'i')

    return this.heroes.filter(hero => hero.name.match(regex))
  }

  getHero(id) {
    return this.heroes.find(hero => hero.id === id)
  }

  async updateHero(id, props) {
    if (!auth.auth) {
      return
    }

    try {
      this.update.clear()
      this.update.set('loading', true)

      const { hero } = await api.put(`/heroes/${id}`, {
        hero: props
      })

      this.update.set('message', 'Hero updated')

      const index = this.heroes.findIndex(hero => hero.id === id)

      this.heroes[index] = hero
    } catch (err) {
      this.update.set('error', err)
    } finally {
      this.update.set('loading', false)
    }
  }

  async addCounter(id, props) {
    if (!auth.auth) {
      return
    }

    try {
      this.update.clear()
      this.update.set('loading', true)

      await api.post(`/heroes/${id}/counter`, {
        counter: props
      })

      this.update.set('message', 'Hero updated')

      const index = this.heroes.findIndex(hero => hero.id === id)

      this.heroes[index][props.type].push(props)
    } catch (err) {
      this.update.set('error', err)
    } finally {
      this.update.set('loading', false)
    }
  }

  async updateCounter(id, props) {
    if (!auth.auth) {
      return
    }

    try {
      this.update.clear()
      this.update.set('loading', true)

      await api.put(`/heroes/${id}/counter`, {
        counter: props
      })

      this.update.set('message', 'Hero updated')

      const heroIndex = this.heroes.findIndex(hero => hero.id === id)
      const counterIndex = this.heroes[heroIndex][props.type].findIndex(
        hero => hero.id === props.id
      )

      this.heroes[heroIndex][props.type][counterIndex] = {
        ...this.heroes[heroIndex][props.type][counterIndex],
        ...props
      }
    } catch (err) {
      this.update.set('error', err)
    } finally {
      this.update.set('loading', false)
    }
  }

  async removeCounter(id, props) {
    if (!auth.auth) {
      return
    }

    try {
      this.remove.clear()
      this.remove.set('loading', true)

      await api.delete(`/heroes/${id}/counter`, {
        counter: props
      })

      this.remove.set('message', 'Hero updated')

      const heroIndex = this.heroes.findIndex(hero => hero.id === id)
      const counterIndex = this.heroes[heroIndex][props.type].findIndex(
        hero => hero.id === props.id
      )

      this.heroes[heroIndex][props.type].splice(counterIndex, 1)
    } catch (err) {
      this.remove.set('error', err)
    } finally {
      this.remove.set('loading', false)
    }
  }
}
