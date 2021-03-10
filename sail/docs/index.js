;(function() {
  new Sail({
    name: 'MovieMate',
    author: 'Ali Zahid'
  })

  const switcher = document.getElementsByClassName('switch')[0]

  switcher.onclick = e =>
    (document.dir = document.dir === 'rtl' ? 'ltr' : 'rtl') &&
    e.preventDefault()
})()
