$(function() {

 	var getRequest = $.ajax({
		url: '/users.json',
		type: 'GET',
		data: {},
		async: false
	});

	var input = $('#search').val();
	var userJson = JSON.parse(getRequest["responseText"]);
	console.log(userJson);
	var userNames = [];
	for (var i in userJson) {
		var name = userJson[i].first_name + " " + userJson[i].last_name;
		userNames.push(name);
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

		}

	});
});
