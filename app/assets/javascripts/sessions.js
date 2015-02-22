
var ready = function(){

	//Defines the "text field in focus" event.
	$('body').on('focus', 'input[type="text"]', function(){
		if($(this).attr('id').indexOf('password')!==-1){ //If the id contains the word "password"...
			$(this).val(""); // Empty out the field.
			$(this).attr('type','password'); //Change it into a password_field.
			$(this).css("opacity", "1"); //Change the opacity to 1.
		};

		//When a key is depressed...
		$('input[type="text"]').on('keydown', function(){
			//If the text field contains the default text...
			if($(this).val()===$(this).attr('value')){
				$(this).css("opacity", "1"); //change the opacity to 1.

				if($(this).attr('class')!=="edit_field"){ //As long as this isn't an editing field...
					$(this).val(""); //empty the field.
				};
			};
		});
	});

	//Defines the "text field no longer in focus" event.
	$('body').on('blur', 'input[type="text"],input[type="password"]', function(){
		//If the text field is empty...
		if($(this).val()===""){
			if($(this).attr('id').indexOf('password')!==-1){ //If the id contains the word "password"...
				$(this).attr('type','text'); //...change it back to a text field.
			};

			//Resets the text field to the default value.
			value = $(this).attr("value");
			$(this).val(value);

			//Resets the opacity only if "this" isn't an editing text_field.
			if($(this).attr('class')!=="edit_field"){
				$(this).css("opacity", ".5");
			};
		};
	});
};

$(document).ready(ready);
$(document).on('page:load', ready);