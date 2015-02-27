var memorial_ready = function() {

 	$('#comment_form').submit(function( event ) {
 		event.preventDefault();
 		var dataTag = $('#get_data');
 		var userName = dataTag.text(),
 		    userId = dataTag.attr('user-id'),
 		    memorialId = dataTag.attr('memorial-id');
 		var message = $('#comment_bar').val();

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
				var temp_tag = "<div><span class='user_name'>" + userName +
 				    "</span>: " + message +
 				    "<br><span class='comment_time'>1 second ago</span></div>";
 				$('#comment-list').append(temp_tag);
			}
		});
 	});s
};

$(".memorials.show").ready(memorial_ready);