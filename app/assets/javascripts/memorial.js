var memorial_script = function(){

	// Expands the comment bar when in focus.
	$('body').on('focus', '#comment_bar', function(){
		$(this).css('height', '100px');
		$(this).css('width', '400px');
		$('.comment-submission').css('display', 'block');
	});

	//Shrinks the comment bar if no text had been entered and the user clicks away from the comment bar.
	$('body').on('click', function(e){
		if(($(e.target).prop('id')!=='comment_bar')&&($(e.target).prop('id')!=='comment_image')&&($(e.target).prop('id')!=='submit_comment')&&($('#comment_bar').val()==="")){
			$('#comment_bar').css('height', '20px');
			$('#comment_bar').css('width', '330px');
			$('.comment-submission').css('display', 'none');
		}
	});

	$('#memorial-image').on('click', 'empty-memorial-picture', function(){

	});

	//The beginnings of integrating jWindowCrop
	$('.crop').on('mousedown', function(e){
		e.preventDefault();

		var target = '.memorial-picture';

		if($(this).text() == 'Save picture'){
			var newtop = $(target).css('top');
			var newleft = $(target).css('left');
			var newwidth = $(target).css('width');

			$.ajax({
				type: "PUT",
				url: document.URL,
				dataType: 'json',
				data: {memorial: {crop_top: newtop, crop_left: newleft, crop_width: newwidth}},
				success: function(){
					console.log($(target).data('jWindowCrop'));
					$(target).data('jWindowCrop').destroy();
					$(target).css('top', newtop);
					$(target).css('left', newleft);
					$(target).css('width', newwidth);
				},
				error: function(request,error){
					console.log(arguments);
				}
			});
		}

		//The beginning and end functions for cropping mode.
		if($(target).data('jWindowCrop')){
			// $(target).data('jWindowCrop').destroy();
			$(this).text("Crop your picture")
		}
		else{
			$('.memorial-picture').css('max-width','none');
			$('.memorial-picture').css('max-height','none');
			$('.memorial-picture').css('clip','auto');

			$(target).jWindowCrop({
				targetWidth: 800,
				targetHeight: 400,
				loadingText: 'Getting ready to edit...',
				onChange: function(result){
					// console.log("separation from left- " + result.cropX);
     //      console.log("separation from top- " + result.cropY);
     //      console.log("width- " + result.cropW);
     //      console.log("Height- " + result.cropH);
				}
			});
			$(this).text("Save picture")
		}

	});

	//Memorial picture upload stuff
	$('body').on('mouseenter','.mempicture_upload', function(){
		$('.edit_memorial').slideToggle();
	});

	$('body').on('mouseleave','.mempicture_upload', function(){
		$('.edit_memorial').slideToggle();
	});


	// Zoom in and zoom out buttons
	// $('.jwc_zoom_in').on('click', function(){
	// 	console.log("Click");
	// 	var current_width = $('.memorial-picture').css('width');
	// 	current_width *= 1.3;
	// 	$('.memorial-picture').css('width',current_width);

	// });
};


var crop_check = function(){
	var check_top = $('.hidden-image-info').attr('top');
	var check_left = $('.hidden-image-info').attr('left');
	var check_width = $('.hidden-image-info').attr('width');

	console.log(check_top);
	console.log(check_width);
	console.log(check_left);

	if(check_top == ("")){
		console.log("crop not yet set");
		//Clears some picture styling so it can be properly edited.
		$('.memorial-picture').css('max-width','none');
		$('.memorial-picture').css('max-height','none');
		$('.memorial-picture').css('clip','auto');

		$('.memorial-picture').jWindowCrop({
			targetWidth: 800,
			targetHeight: 400,
			loadingText: 'Getting ready to edit...',
			onChange: function(result){
				console.log("separation from left- " + result.cropX);
        console.log("separation from top- " + result.cropY);
        console.log("width- " + result.cropW);
        console.log("Height- " + result.cropH);
			}
		});

		$('.crop').text("Save picture");

		// $('html *').not('.memorial-picture').css('opacity','.5');
	}
	else{
		console.log('Crop already set');
		$('.memorial-picture').css('top', check_top);
		$('.memorial-picture').css('left', check_left);
		$('.memorial-picture').css('width', check_width);
	}
};

$(document).ready(crop_check);
$(document).on('page:load', crop_check);
$(document).ready(memorial_script);
$(document).on('page:load', memorial_script);
