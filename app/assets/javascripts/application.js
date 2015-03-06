// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require jquery-readyselector
//= require_tree .

Turbolinks.enableProgressBar()
var ready2 = function(){
	$('body').on('focus', 'input[type="date"]', function(){
		$(this).css('color','rgba(0,0,0,1)');
	});

	$('body').on('blur', 'input[type="date"]', function(){
		if($(this).val()===""){
			$(this).css('color','rgba(0,0,0,.4)');
		};
	});

  $("body").click(function(event) {
    var checkClick = $(event.target);
    var dropdown = $(".notif-dropdown");
    var notifIcon = $('#notif-title');
    if (checkClick[0] === notifIcon[0]) {
      dropdown.toggle();
    } else if (checkClick[0] !== dropdown[0] && dropdown.is(":visible")) {
      dropdown.hide();
    }
  });
}

$(document).ready(ready2);
$(document).on('page:load', ready2);
