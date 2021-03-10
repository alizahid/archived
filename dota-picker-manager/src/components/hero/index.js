import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { sortBy } from 'lodash'

import { Avatar, Counter, Modal, Picker, Spinner } from '../'

import './index.css'

class Hero extends Component {
  state = {
    adding: false,
    hero: null,
    why: ''
  }

  toggleAdding = type => {
    this.setState({
      adding: type || null
    })

    if (type === null) {
      const { heroes } = this.props

      heroes.update.clear()

      this.setState({
        hero: null,
        why: ''
      })
    }
  }

  title(adding) {
    const { name } = this.props

    switch (adding) {
      case 'strong':
        return `Adding strong against ${name}`

      case 'weak':
        return `Adding weak against ${name}`

      case 'combo':
        return `Adding combo with ${name}`

      default:
        return `Adding with ${name}`
    }
  }

  onPick = hero => {
    this.setState({
      hero
    })
  }

  onChangeWhy = event => {
    this.setState({
      why: event.target.value
    })
  }

  add = event => {
    event.preventDefault()

    const { id, heroes } = this.props
    const { adding, hero, why } = this.state

    if (adding && hero && why) {
      heroes.addCounter(id, {
        why,
        id: hero.id,
        type: adding
      })
    }
  }

  render() {
    const store = this.props.heroes

    const {
      auth,
      id,
      name,
      roles,
      attack,
      attribute,
      strong,
      weak,
      combo
    } = this.props
    const { adding, hero, why } = this.state

    const exclude = {
      strong,
      weak,
      combo
    }

    const { update } = store

    const error = update.get('error')
    const loading = update.get('loading')
    const message = update.get('message')

    return (
      <div className="hero">
        <header>
          <Avatar id={id} />
          <div>
            <h2>{name}</h2>
            <ul>
              <li className={attribute}>{attribute}</li>
              <li className={attack}>{attack}</li>
              {roles.map(role => (
                <li key={role} className={role}>
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </header>
        <main>
          <section>
            <h3>Strong against</h3>
            <div>
              {sortBy(strong, 'id').map(hero => (
                <Counter
                  key={`strong-${id}-${hero.id}`}
                  {...hero}
                  main={id}
                  type="strong"
                />
              ))}
              {auth && (
                <div>
                  <button onClick={() => this.toggleAdding('strong')} />
                </div>
              )}
              {!auth && strong.length === 0 && <div>Nothing here</div>}
            </div>
          </section>
          <section>
            <h3>Weak against</h3>
            <div>
              {sortBy(weak, 'id').map(hero => (
                <Counter
                  key={`weak-${id}-${hero.id}`}
                  {...hero}
                  main={id}
                  type="weak"
                />
              ))}
              {auth && (
                <div>
                  <button onClick={() => this.toggleAdding('weak')} />
                </div>
              )}
              {!auth && weak.length === 0 && <div>Nothing here</div>}
            </div>
          </section>
          <section>
            <h3>Works well with</h3>
            <div>
              {sortBy(combo, 'id').map(hero => (
                <Counter
                  key={`combo-${id}-${hero.id}`}
                  {...hero}
                  main={id}
                  type="combo"
                />
              ))}
              {auth && (
                <div>
                  <button onClick={() => this.toggleAdding('combo')} />
                </div>
              )}
              {!auth && combo.length === 0 && <div>Nothing here</div>}
            </div>
          </section>
        </main>
        {adding && (
          <Modal
            title={this.title(adding)}
            onClose={() => this.toggleAdding(null)}
          >
            {hero && (
              <header>
                <Avatar id={hero.id} size="small" />
                {hero.name}
                <button onClick={() => this.onPick(null)} />
              </header>
            )}
            {!hero && <Picker onPick={this.onPick} exclude={exclude[adding]} />}
            <form onSubmit={this.add}>
              {message && <div className="message">{message}</div>}
              {error && <div className="error">{error}</div>}
              <label>
                <textarea
                  value={why}
                  onChange={this.onChangeWhy}
                  disabled={loading}
                  placeholder="Why?"
                />
              </label>
              <div>
                <button disabled={loading}>
                  {loading && <Spinner button />}
                  {!loading && 'Add'}
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    )
  }
}

export default inject('heroes')(observer(Hero))
