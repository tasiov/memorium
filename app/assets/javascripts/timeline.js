// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var isClicked = false;
var currentItemId = -1;
var z_max=1;


var ready = function(){


  $('.options_bar').hide();
  $('body').on('mouseenter','.image', function(){
    $(this).closest("td").siblings().children(".options_bar").slideDown();
    // $(this).children('img').css("width", "330");
  });

  $('body').on('mouseleave','tr', function(){
    $(this).children().children(".options_bar").slideUp();
    // $(this).children().children('img').css("width", "321");
  });

  var startleft;
  var starttop;

  //Defines the mouse depress event.
  $('body').on('mousedown','tr', function(event){

    //Calculates the difference between the cursor position and the tr element position.
    //Used later so that the tr element doesn't snap to the cursor's position.
    var bound = $(this).position();
    diffleft=(event.pageX-bound.left);
    difftop=(event.pageY-bound.top);

    //Changes to absolute positioning in preparation for movement.
    $(this).css('position','absolute');

    //Makes sure the clicked item has the highest z-index.
    $(this).css('z-index',++z_max);

    //Adds the 'clicked' class to the element that is currently clicked.
    $(this).children('.image').children().addClass('clicked');

    isClicked = true;
    currentItemId = $(this).attr('id');
    // console.log(isClicked);
  });

  //Defines the mouse release event.
  $('body').on('mouseup','tr', function(){
    // $(this).css('position','relative');
    if(isClicked===true){
      //Removes the 'clicked' class to the element once it is no longer being clicked.
      $(this).children('.image').children().removeClass('clicked');

      // console.log($(this).css('z-index'));
      isClicked = false;
      currentItemId = -1;
      // console.log(isClicked);
    }
  });

  //Defines mouse movement while clicked.
    $('body').on('mousemove',function(event) {
      if(isClicked===true){
        var itemInFocus = "tr#" + currentItemId;
        // console.log(itemInFocus);

        //Moves the clicked element in synchrony with the mouse cursor.
        $(itemInFocus).css('left', (event.pageX-diffleft));
        $(itemInFocus).css('top', (event.pageY-difftop));
      };
    });

    //Opens the new picture popup menu.
  $('body').on('click', '.new_pic_button', function(e){
    e.preventDefault();

    $('.new_popup').css('visibility','visible');
  });

  //Closes the new picture popup menu.
  $('body').on('click','.close_button', function(e){
    e.preventDefault();
    $('.new_popup').css('visibility','hidden');
  });

  //Resets pictures to default static positioning and color formatting.
  $('body').on('click','#clean_up', function(){
    $('tr').css('position','static');
    $('img').removeClass('clicked');
  });

  //Prevents picture submission if nothing has been uploaded.
  $('body').on('click', '.upload_button', function(e){
    if($('#picture_media').val()===""){
      e.preventDefault();
      $(this).closest('form').animate({height:110}, 200);
      $(this).closest('form').append('<p class="popup_alert">You need to upload a file first!</p>');

      //An animation to remove the error text and resize the popup. On a 3 second timeout.
      setTimeout(function(){
        $('.popup_alert').closest('form').animate({height:90},200);
        $('.popup_alert').remove();
      }, 3000);
    };
  });

  // $('body').on('click', '.ajax_trigger_new', function(e){
  //  e.preventDefault();

  //  // var new_id;
  //  // var image_name = ($('#picture_media').val()).replace('C:\\fakepath\\','');

  //  // $.ajax({type: "GET", url:'/pictures/', dataType: "JSON", success: function(data){ //Reads in the product page index json...
  //  //    var tablerow = data[data.length-1];
  //  //    new_id = tablerow['id']+1;
  //  // }});


  //  // // $.ajax({
  //  // //   type: "POST",
  //  // //   url: '/pictures/',
  //  // //   data: {"title":"Random","url":"http://localhost:3000/pictures/"+new_id+".json","media":{"media":{"url":"/uploads/picture/media/"+new_id+"/"+image_name}}},
  //  // //   success: function(){
  //  // //   },
  //  // //   error: function(request,error){
  //  // //     console.log(arguments);
  //  // //   }
  //  // // });
  // });



};

//Makes turbolinks work without having to refresh the page.
$(document).ready(ready);
$(document).on('page:load', ready);
