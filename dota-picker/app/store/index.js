import { compact } from 'lodash'
import { action, computed, observable } from 'mobx'

import { sort } from '../lib'

class Store {
  @observable picks = []

  @computed
  get enemyPicks() {
    return this.picks.filter(pick => pick.side === 'enemy')
  }

  @computed
  get yourPicks() {
    return this.picks.filter(pick => pick.side === 'you')
  }

  @action
  setPick(index, side, hero) {
    this.picks[index] = {
      ...hero,
      index,
      side
    }

    this.calculate()
  }

  @action
  removePick(index) {
    const { side } = this.picks[index]

    this.picks[index] = {
      side
    }
  }

  @action
  clear() {
    const data = []

    for (const index = 0; index < 10; index++) {
      data[index] = {
        index,
        side: index > 4 ? 'you' : 'enemy'
      }
    }

    this.picks = data
  }

  @action
  calculate() {
    const ids = compact(this.enemyPicks.map(pick => pick.id))

    if (ids.length === 0) {
      return
    }

    const picks = this.enemyPicks
      .filter(pick => !!pick.id)
      .map(pick => pick.weak)
      .reduce((picks, pick) => {
        picks = [...picks, ...pick]

        return picks
      }, [])
      .filter(pick => !ids.includes(pick.hero))

    const counters = sort(picks)

    for (const index = 5; index < 10; index++) {
      if (this.picks[index].id && !this.picks[index].counter) {
        continue
      }

      this.picks[index].counter = true

      const counter = counters.shift()

      if (counter) {
        this.picks[index].id = counter.hero
        this.picks[index].important = counter.frequency >= 2
      }
    }
  }

  constructor() {
    this.clear()
  }
}

export default new Store()
