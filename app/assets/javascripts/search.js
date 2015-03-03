var memorial_ready = function() {

	// get the current list of users from the database
 	var getRequestUser = $.ajax({
		url: '/users.json',
		dataType: 'json',
		type: 'GET',
		async: false,
    error: function(request, error) {
        console.log(arguments);
    }
	});

	var input = $('#search').val();
	var allJson = JSON.parse(getRequestUser["responseText"]);
	console.log(userJson);
  var userJson = allJson["user"] // grab the users from the JSON
  var userMemorialJson = allJson["memorial_users"] // grab the memorial_users from the JSON
	var users = {};
  var user_id = $('#get_data').attr('user-id'); // get id of current user
  var memorial = $('#get_data').attr('memorial-id'); // get id of current memorial
	var dropdown = $('#search-dropdown');
	var recipient_id;
  console.log(userMemorialJson);

  // create a hash of user id to full name
	for (var i in userJson) {
    var id = userJson[i].id;
    if (user_id != id) {
		  var name = userJson[i].first_name + " " + userJson[i].last_name;
		  users[id] = name;
    }
	}
	//console.log(users);

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
			//console.log(i);
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
    for (var i in userMemorialJson) {
      var id = userMemorialJson[i].user_id;
      var memorial_id = userMemorialJson[i].memorial_id;
      if ((recipient_id == id) && (memorial == memorial_id)) {
        alertUser(false);
        revertToSearch($('#search-dropdown'));
        return;
      }
    }
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

  // refocus user on the search bar
  function revertToSearch(parent) {
  	parent.empty();
  	parent.hide();
  	$('#search')[0].focus();
  };

  // alert user with notification status
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
		var type = $(this).attr('privilege');
		var buttons = $(this).parent();

		var postData = { notification:
 			{ sender_id: user_id,
 				recipient_id: recipient_id,
 				memorial_id: memorial,
 			  message_type: type }
 			};

    var addToJson = {
      memorial_id: memorial,
      user_id: recipient_id,
      role: type
    }

 		$.ajax({
			url: '/notifications/new/',
			data: postData,
			type: 'POST',
      async: false,
			success: function() {
        alertUser(true);
        userMemorialJson.push(addToJson);
      },
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
