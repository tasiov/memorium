var timeline = function(){

  $(".timeline-button").on('click', function(e){
    e.preventDefault();
    $(".timeline-image-add").toggle();
  });

  $(".popup-x").on('click', function(){
    $(".timeline-image-add").toggle();
  });
}

$(document).ready(timeline);
$(document).on('page:load', timeline);
