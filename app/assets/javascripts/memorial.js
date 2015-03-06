var memorial_script = function(){






	$('body').on('focus', '#comment_bar', function(){
		$(this).css('height', '100px');
		$(this).css('width', '400px');
		$('.comment-submission').css('display', 'block');
	});

	$('body').on('click', function(e){
		if(($(e.target).prop('id')!=='comment_bar')&&($(e.target).prop('id')!=='comment_image')&&($(e.target).prop('id')!=='submit_comment')&&($('#comment_bar').val()==="")){
			$('#comment_bar').css('height', '20px');
			$('#comment_bar').css('width', '330px');
			$('.comment-submission').css('display', 'none');
		}
	});
};


$(document).ready(memorial_script);
$(document).on('page:load', memorial_script);
