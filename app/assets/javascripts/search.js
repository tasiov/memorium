var memorial_ready = function() {

 	var getRequest = $.ajax({
		url: '/users.json',
		dataType: 'json',
		type: 'GET',
		async: false
	});

	var input = $('#search').val();
	var userJson = JSON.parse(getRequest["responseText"]);
	var userNames = [];
	for (var i in userJson) {
		var name = userJson[i].first_name + " " + userJson[i].last_name;
		userNames.push(name);
		console.log(name);
	}

	$('.search_bar').on('keyup', function(){
		var currentSearchString = $(this).val();
		// console.log("Current Search String");
		// console.log(currentSearchString);
		var nameSubarray = [];

		for(var name in userNames){
			if((userNames[name].toLowerCase().indexOf(currentSearchString.toLowerCase())===0)&&(currentSearchString!=="")){
				console.log(userNames[name]);

			};

		};

	});
};

$(".memorials.show").ready(memorial_ready);
// $(document).on('page:load', memorial_ready);
