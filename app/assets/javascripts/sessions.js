
$(function(){

	// Defines the "clicked on a text field" event.
	$('body').on('click', 'input[type="text"]', function(){
		//If the text field contains the default text...
		if($(this).val()===$(this).attr("name")){
			//Empty the field and set opacity to 1.
			$(this).val("");
			$(this).css("opacity", "1");
		};
	});

	//Dee=fines the "text field no longer in focus" event.
	$('body').on('blur', 'input[type="text"]', function(){
		//If the text field is empty...
		if($(this).val()===""){
			//Resets the text field to the default values.
			name = $(this).attr("name");
			$(this).val(name);
			$(this).css("opacity", ".5");
		};
	});
});