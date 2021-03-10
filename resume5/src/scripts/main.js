let link = document.getElementById('app')

link.addEventListener('click', (e) => {
	e.preventDefault()

	let message = document.createElement('div')

	message.classList.add('message')
	message.classList.add('fade-in')

	document.body.appendChild(message)

	setTimeout(() => {
		message.classList.remove('fade-in')
	}, 500)

	setTimeout(() => {
		message.classList.add('fade-out')
	}, 3000)

	setTimeout(() => {
		message.remove()
	}, 3500)
})
