document.addEventListener('keyup', event => {
  const { key } = event

  let button

  if (key === 'ArrowLeft') {
    button = document.getElementById('prev')
  } else if (key === 'ArrowRight') {
    button = document.getElementById('next')
  }

  if (button) {
    button.click()
  }
})
