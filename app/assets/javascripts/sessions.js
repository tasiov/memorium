
$(function(){
	$('body').on('click', 'input[type="text"]', function(){
		if($(this).val()===$(this).attr("name")){
			$(this).val("");
			$(this).css("opacity", "1");
		};
	});

	$('body').on('blur', 'input[type="text"]', function(){
		if($(this).val()===""){
			name = $(this).attr("name");
			$(this).val(name);
			$(this).css("opacity", ".5");
		};
	});
});