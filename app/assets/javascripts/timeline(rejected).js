// var timeline = function(){

//   $("body").on('click', '.timeline-button', function(e){
//     e.preventDefault();
//     $(".timeline-image-add").toggle();
//   });

//   $("body").on('click', '.popup-x', function(){
//     $(".timeline-image-add").toggle();
//   });

//   $(".timeline-image-submit").click(function(e) {
//     var textField = 'input[type="text"]';
//     var fileField = 'input[type="file"]';

//     if(($(textField).val() === "")||($(fileField).val() === "")){
//       e.preventDefault();

//       $(this).closest('section').append('<p class="popup_alert">Please fill in all fields before submitting.</p>');
//       $(".popup_alert").css('display','none');
//       $(".popup_alert").slideToggle(200);

//       setTimeout(function(){
//         $('.popup_alert').slideToggle(200, function(){
//           $('.popup_alert').remove();
//         });
//       }, 3000);
//     };

//   });
// };

// $(document).ready(timeline);
// $(document).on('page:load', timeline);
