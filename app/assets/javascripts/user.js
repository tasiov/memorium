var user = function(){

  //Javascript for making the new memorial popup appear.
  $('body').on('click', '.popup_button', function(){
    $('.new_memorial_popup').slideToggle('slow');
  });


  $('body').on('click', '.new_memorial_button', function(e){
    var textField = 'input[type="text"]'
    if($(textField).val() === ""){
      e.preventDefault();
      var new_element = "<fieldset class='error'>Please fill in all the fields before submitting.</fieldset>"

      $(this).closest('form').append('<p class="popup_alert">Please fill in all fields before submitting.</p>');
      $(".popup_alert").css('display','none');
      $(".popup_alert").slideToggle(200);

      setTimeout(function(){
        $('.popup_alert').slideToggle(200, function(){
          $('.popup_alert').remove();
        });
        // $('.popup_alert').remove();

      }, 3000);
      // $('form#new_memorial').append(new_element);
      // setInterval(function(){
      //  $('.awesome').remove();
      // }, 3000);
    };
  });

  $('.create-memorial-x').on('click', function(){
    $('.new_memorial_popup').slideToggle('slow');
  });



}

$(document).ready(user);
$(document).on('page:load', user);
