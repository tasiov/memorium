var ready2 = function(){

	$('body').on('focus', 'input[type="date"]', function(){
		$(this).css('opacity','1');
	});

	$('body').on('blur', 'input[type="date"]', function(){
		if($(this).val()===""){
			$(this).css('opacity','.5');
		};	
	});
}

$(document).ready(ready2);
$(document).on('page:load', ready2);