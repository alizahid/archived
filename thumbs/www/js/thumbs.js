const game = {
    blue: {},
    red: {}
}

document.addEventListener('deviceready', () => {
    $('body').removeClass('loading')

    sound('music', true)

    $('.blue').on('touchstart', () => ready('blue'))
    $('.blue').on('touchend', () => end())

    $('.red').on('touchstart', () => ready('red'))
    $('.red').on('touchend', () => end())

    $('button', 'main').on('click', () => $('main').fadeOut('fast'))

    $('button', 'footer').on('click', () => {
        game.blue = {}
        game.red = {}

        delete game.started
        delete game.ended

        $('figure').css('width', 0)

        $('h3').text('')
        $('footer').removeClass('visible')
    })
}, false)

const ready = player => {
    if (game.ended) {
        return
    }

    game[player].ready = true

    if (game.blue.ready && game.red.ready) {
        game.started = true

        start('blue')
        start('red')
    }
}

const start = player => go(player)

const end = () => {
    if (!game.started || game.ended) {
        return
    }

    game.ended = true

    winner()
}

const winner = () => {
    if (game.started && game.ended) {
        let winner = null

        if (game.blue.progress === 0 || game.red.progress === 0) {
            return
        }

        if (game.blue.progress >= 100) {
            winner = 'red'
        } else if (game.red.progress >= 100) {
            winner = 'blue'
        } else if (game.blue.progress > game.red.progress) {
            winner = 'blue'
        } else {
            winner = 'red'
        }

        $('h3').text(`Player ${upperCaseFirst(winner)} wins the game!`)
        $('footer').addClass('visible')
    }
}

const go = player => {
    if (!game.started || game.ended) {
        return
    }

    let time = random(400, 600)
    let progress = random(20, 40)

    const bar = $('figure', `.${player}`)

    let width = bar.width()
    let updated = width + progress

    const total = $(`.${player}`).width()

    let percent = Math.round((width + progress) / total * 100)

    if (percent >= 100) {
        end()
    }

    punchSound()

    game[player].progress = percent

    bar.stop(true, true).animate({
        width: updated
    }, time, () => go(player))
}

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const punchSound = () => sound(`punch-${random(1, 3)}`)

const sound = (file, music) => {
    let sound = new Audio(`sounds/${file}.mp3`)

    if (music) {
        sound.loop = true
        sound.volume = 0.2
    }

    sound.play()
}

const upperCaseFirst = string => string.charAt(0).toUpperCase() + string.substr(1)
