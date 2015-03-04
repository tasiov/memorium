var memorial_ready = function() {

	$('body').on('ajax:complete', '#new_comment', function(xhr, obj){
		$('#comment-list').append(obj.responseText);
		$('#comment_bar').val("");
		$('#comment_bar').focus();
	});


 	// $('#comment_form').submit(function( event ) {
 	// 	event.preventDefault();
 	// 	var message = $('#comment_bar').val();

 	// 	if (message === "") {
 	// 		return;
 	// 	}

 	// 	var dataTag = $('#get_data');
 	// 	var userName = dataTag.text(),
 	// 	    userId = dataTag.attr('user-id'),
 	// 	    memorialId = dataTag.attr('memorial-id');

 	// 	var postData = { comment:
 	// 		{ user_id: userId,
 	// 		  created_at: null,
 	// 		  message: message,
 	// 		  memorial_id: memorialId }
 	// 		};

 	// 	$.ajax({
		// 	url: '/comments/new/',
		// 	data: postData,
		// 	type: 'POST',
		// 	async: false,
		// 	success: function() {
		// 		var temp_tag = "<div><span class='user_name'>" + userName +
 	// 			    "</span>: " + message +
 	// 			    "<br><span class='comment_time'>1 second ago</span></div>";
 	// 			$('#comment-list').append(temp_tag);
		// 	},
  //     error: function(request, error) { console.log(arguments) }
		// });

		// $('#comment_bar').val("");
 	// });
};

$(memorial_ready);
$(document).on('page:load', memorial_ready);
