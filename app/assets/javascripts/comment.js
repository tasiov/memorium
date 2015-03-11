var memorial_ready = function() {

	$('body').on('ajax:complete', '#new_comment', function(xhr, obj){
		$('#comment-list').append(obj.responseText);
		$('#comment_bar').val("");
		$('#comment_bar').focus();
	});

	$(".comment_bubble").on("click", ".comment-picture", function(event) {
		var img = $(this).clone();
		var div = "<div class='dark' style='position:fixed;padding:0;margin:0;width:100%;height:100%;background:black;z-index:8;opacity:0.85;'></div>"
		var body = $('body');
		img.attr('id', 'large-picture');
		// img.css({'display':'block', 'margin':'0 auto', 'width':'300%', 'height':'300px!important'});
		body.prepend(div);
		body.append(img);
		body.css({overflow:'hidden'});
	});

	$('body').on("click", ".dark", function(event) {
		$('#large-picture').remove();
		$(this).remove();
		$('body').css('overflow','scroll');
	});

};

$(memorial_ready);
$(document).on('page:load', memorial_ready);
