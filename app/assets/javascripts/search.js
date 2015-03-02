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
	var userNames = [];
	var dropdown = $('#search-dropdown');


  // create an array of user's first + last names
	for (var i in userJson) {
		var name = userJson[i].first_name + " " + userJson[i].last_name;
		userNames.push(name);
		console.log(name);
	}

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

		for(var name in userNames){
			if (userNames[name].toLowerCase().indexOf(currentSearchString.toLowerCase())===0) {
				console.log(userNames[name]);
				dropdown.append('<li class="drop-names">' + userNames[name] + '</li>');
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
		var buttons = $('.invites');
		buttons.append('<span class="invite-button">Allow ' + userName + ' to contribute</span>',
			             '<span class="invite-button">Allow ' + userName + ' to view</span>',
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

  // button click posts to notifications new
	$('.invites').on("click", ".invite-button", function(event) {
		console.log("sdf");
	});
};

$(".memorials.show").ready(memorial_ready);
$(".memorials.show").on('page:load', memorial_ready);
