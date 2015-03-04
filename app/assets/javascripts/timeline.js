var timeline = function(){

  $("body").on('click', '.timeline-button', function(e){
    e.preventDefault();
    $(".timeline-image-add").toggle();
  });

  $("body").on('click', '.popup-x', function(){
    $(".timeline-image-add").toggle();
  });
};

$(document).ready(timeline);
$(document).on('page:load', timeline);
