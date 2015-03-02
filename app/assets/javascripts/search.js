var memorial_ready = function() {

	// get the current list of users from the database
 	var getRequest = $.ajax({
		url: '/users.json',
		dataType: 'json',
		type: 'GET',
		async: false
	});

	var input = $('#search').val();
	var userJson = JSON.parse(getRequest["responseText"]);
	console.log(userJson);
	var users = {};
	var dropdown = $('#search-dropdown');
	var recipient_id;


  // create a hash of user id to full name
	for (var i in userJson) {
		var name = userJson[i].first_name + " " + userJson[i].last_name;
		var id = userJson[i].id;
		users[id] = name;
	}
	console.log(users);

  // disable chrome dropdown on select fields
  $(".search_bar").mousedown(function(e) {
    if ($(this).find('option').length > 20) {
        e.preventDefault(); //return false will also work
    }
	});

  // search bar with dropdown autofill functionality
	$('.search_bar').on('keyup', function(event){
		event.preventDefault();
		var currentSearchString = $(this).val();
		dropdown.empty();

		if (currentSearchString === "") {
			dropdown.hide();
			return;
		}

		for(var i in users){
			console.log(i);
			if (users[i].toLowerCase().indexOf(currentSearchString.toLowerCase())===0) {
				dropdown.append('<li class="drop-names" recipient_id="' + i + '">' + users[i] + '</li>');
			};
			dropdown.show();
		};

		if (dropdown.is(':empty')) {
  		dropdown.hide();
		}
	});

	// dynamically create buttons based on search bar results
	$('#search-dropdown').on("click", ".drop-names", function(event) {
		var searchText = $('.search_bar').val('');
		var userName = $(this).text();
		recipient_id = $(this).attr("recipient_id");
		var buttons = $('.invites');
		buttons.append('<span class="invite-button" privilege="contributor">Allow ' + userName + ' to contribute</span>',
			             '<span class="invite-button" privilege="viewer">Allow ' + userName + ' to view</span>',
			             '<button id="cancel-invite">x</button>');
		buttons.show();
		dropdown.hide();
	});

  // cancel button reverts to search bar
  $('.invites').on("click", "#cancel-invite", function(event) {
  	event.preventDefault();
  	var buttons = $(this).parent();
  	revertToSearch(buttons);
  });

  function revertToSearch(parent) {
  	parent.empty();
  	parent.hide();
  	$('#search')[0].focus();
  };

  function alertUser(flag) {
  	var tag = $('#alert-message');
  	tag.empty();
  	if(flag) {
  		tag.text('Notification sent');
		} else {
			tag.text('Notification failed to send');
		}
		setInterval(function () {
			tag.text("");
			tag.append("<br>");
	  }, 10000);
  };

  // button click posts to notifications new
	$('.invites').on("click", ".invite-button", function(event) {
		var user_id = $('#get_data').attr('user-id');
		var type = $(this).attr('privilege');
		var buttons = $(this).parent();
		var memorial = $('#get_data').attr('memorial-id');

		var postData = { notification:
 			{ sender_id: user_id,
 				recipient_id: recipient_id,
 				memorial_id: memorial,
 			  message_type: type }
 			};

 		$.ajax({
			url: '/notifications/new/',
			data: postData,
			type: 'POST',
			success: function() { alertUser(true); },
      error: function(request, error) {
      	console.log(arguments);
      	alertUser(false);
      }
		});
 		revertToSearch(buttons);
	});
};

$(".memorials.show").ready(memorial_ready);
$(".memorials.show").on('page:load', memorial_ready);
