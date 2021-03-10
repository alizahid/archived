import Cookies from 'js-cookie'

import './index.scss'

export default class Sail {
  constructor(options) {
    const defaultOptions = {
      name: 'MovieMate',
      author: 'Ali Zahid',
      icon: 'https://moviemate.co/assets/apple-touch-icon.png',
      description: 'On Google Play',
      label: 'View',
      price: 'FREE'
    }

    this.options = Object.assign(defaultOptions, options)

    if (this.platform === 'android' && !this.hidden) {
      this.drop()
    }
  }

  get platform() {
    const ua = window.navigator.userAgent

    if (/android/i.test(ua)) {
      return 'android'
    }
  }

  get hidden() {
    return Cookies.get('sail-stowed')
  }

  get icon() {
    return this.options.icon || this.meta('apple-touch-icon', 'href')
  }

  get link() {
    return `http://play.google.com/store/apps/details?id=${this.appId}`
  }

  get appId() {
    return (
      this.options.appId ||
      this.meta('google-play-app').split(',').shift().split('=').pop()
    )
  }

  drop() {
    const banner = document.createElement('div')

    banner.className = 'sail'
    banner.innerHTML = `
<a href="#" class="close">
  <span>
  </span>
</a>
<figure style="background-image: url(${this.icon})"></figure>
<section>
  <h1>${this.options.name}</h1>
  <h2>${this.options.author}</h2>
  <p>${this.options.price} &#8212; ${this.options.description}</p>
</section>
<a href="${this.link}" class="view">
  <span>${this.options.label}</span>
</a>
`

    document.body.appendChild(banner)

    banner.firstElementChild.onclick = this.close.bind(this)

    this.show()
  }

  meta(rel, key) {
    const links = document.getElementsByTagName('link')

    for (let link of links) {
      if (link.rel === rel) {
        return link[key]
      }
    }

    return ''
  }

  close(e) {
    e.preventDefault()

    Cookies.set('sail-stowed', true, {
      expires: 7
    })

    this.hide()
  }

  show() {
    document.body.classList.add('sail-dropped')
  }

  hide() {
    document.body.classList.remove('sail-dropped')
  }
}
