var memorial_ready = function() {

 	$('#comment_form').submit(function( event ) {
 		event.preventDefault();
 		var dataTag = $('#get_data');
 		var userName = dataTag.text(),
 		    userId = dataTag.attr('user-id'),
 		    memorialId = dataTag.attr('memorial-id');
 		var message = $('.comment_bar').val();

 		var postData = { comment: 
 			{ user_id: userId, 
 			  created_at: null,
 			  message: message,
 			  memorial_id: memorialId } 
 			};

 		$.ajax({
			url: '/comments/new/',
			data: postData,
			type: 'POST',
			async: false,
			success: function() {
				var temp_tag = "<li><div><span>" + userName +
 				       "</span>: " + message + "</div></li>";
 				$('.comment-list').append(temp_tag);
			}
		});
 	});
};

$(".memorials.show").ready(memorial_ready);