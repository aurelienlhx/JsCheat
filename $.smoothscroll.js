(function($) {
  $(document).ready(function() {
    $('a[href^="#"]').not('[data-raw-hash]').on('click', function(e) {
      scrollTo(this.href, e);
    });
    if (document.location.hash && document.location.hash.indexOf("utm") == -1) {
      scrollTo(document.location.hash);
    }

  });

  $(window).on('hashchange', function(e) {
    scrollTo(document.location.hash, e);
  });

  function scrollTo(anchor, e) {
    var found = anchor.match(/(\#\w+)([\+-]{1}\d+)?/);
    if (found && found[1] && found[1] !== '#')
      var $target = $(found[1]);
    if (found && found[2])
      var offset = parseInt(found[2]);


    if (undefined !== $target && $target.length > 0 && $target.is(':visible')) {
      if (e) {
        e.preventDefault();
      }
      $('html,body').animate({
        scrollTop: $target.offset().top + (offset || 0)
      }, 500)
    }
  }
})(jQuery);
