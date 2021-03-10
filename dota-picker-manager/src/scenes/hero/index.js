import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { get } from 'lodash'

import { Hero, Overlay } from '../../components'

import './index.css'

class HeroScene extends Component {
  render() {
    const { auth } = this.props.auth
    const { heroes, loading } = this.props.heroes

    if (loading) {
      return <Overlay template="loading" />
    }

    const id = get(this, 'props.match.params.id')

    if (!id) {
      return <Overlay template="not-found" />
    }

    const hero = heroes.find(hero => hero.id === id)

    if (!hero) {
      return <Overlay template="not-found" />
    }

    return <Hero auth={auth} {...hero} />
  }
}

export default inject('auth', 'heroes')(observer(HeroScene))
