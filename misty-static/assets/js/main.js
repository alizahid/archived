$(document).ready(function() {
  $('a', '#nav').on('click', function(event) {
    var id = $(this).attr('href')

    if (id.indexOf('#') === 0) {
      event.preventDefault()

      var target = $(id)

      if (target.length > 0) {
        $('html, body').animate({
          scrollTop: target.position().top - 50
        })
      }
    }
  })
})
