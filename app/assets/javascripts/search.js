var memorial_ready = function() {

	// get the current list of users from the database
 	$.ajax({
		url: '/users.json',
		dataType: 'json',
		type: 'GET',
    error: function(request, error) {
        console.log(arguments);
    },
    success: function(response) {
      onRequestUserSuccess(response);
    }
	});
}

function onRequestUserSuccess(response) {
	var input = $('#search').val();
	var allJson = response;

  var userJson = allJson["user"] // grab the users from the JSON
  var userMemorialJson = allJson["memorial_users"] // grab the memorial_users from the JSON
  console.log(allJson);
	var users = {};
  var user_id = $('#get_data').attr('user-id'); // get id of current user
  var memorial = $('#get_data').attr('memorial-id'); // get id of current memorial
	var dropdown = $('#search-dropdown');
	var recipient_id;

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
  $('body').on('mousedown', ".search_bar", function(e) {
    if ($(this).find('option').length > 20) {
        e.preventDefault(); //return false will also work
    }
	});

  // search bar with dropdown autofill functionality
	$('body').on('keyup', '.search_bar', function(event){
    console.log('keyup');
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
	$('body').on('click', "#search-dropdown .drop-names", function(event) {
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
		buttons.append('<span class="invite-button" id="btn1" privilege="contributor">Allow ' + userName + ' to contribute</span>',
			             '<span class="invite-button" id="btn2" privilege="viewer">Allow ' + userName + ' to view</span>',
			             '<button id="cancel-invite">x</button>');
		buttons.show();
		dropdown.hide();
	});

  // cancel button reverts to search bar
  $('body').on("click", ".invites #cancel-invite", function(event) {
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
	$('body').on("click", ".invites .invite-button", function(event) {
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

$(memorial_ready);
$(document).on('page:load', memorial_ready);
