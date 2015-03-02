var notif = function(){

  $('#notif-title').click(function() {
    $('.notif-dropdown').toggle();
  });

}

$(document).ready(notif);
$(document).on('page:load', notif);
