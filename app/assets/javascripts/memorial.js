var memorial_script = function(){

	$('body').on('click', '.popup_button', function(){
		$('.new_memorial_popup').slideToggle('slow');
	});

	$('body').on('click', '.new_memorial_button', function(e){
		var textField = 'input[type="text"]'
		if($(textField).val() === $(textField).attr('value')){
			e.preventDefault();
			var new_element = "<fieldset class='error'>Please fill in all the fields before submitting.</fieldset>"

			$(this).closest('form').append('<p class="popup_alert">You need to upload a file first!</p>');
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
			// 	$('.awesome').remove();
			// }, 3000);
		};



	});
};


$(document).ready(memorial_script);
$(document).on('page:load', memorial_script);