(function($, document) {
  $(document).ready(function() {
    $('a[href^="#"]').on('click', function(e) {
      e.preventDefault();
      scrollTo(this.href);
    })
    if (document.location.hash && document.location.hash.indexOf("utm") == -1) {
      scrollTo(document.location.hash);
    }

  })

  function scrollTo(anchor) {
    var found = anchor.match(/(\#\w+)([\+-]{1}\d+)/);
    if (found && found[1])
      var $target = $(found[1]);
    if (found && found[2])
      var offset = parseInt(found[2]);
    if (undefined !== $target && $target.length > 0) {
      $('html,body').animate({
        scrollTop: $target.offset().top + (offset || 0)
      }, 1000)
    }
  }
})(jQuery, document);
