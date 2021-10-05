$(document).ready(function () {
	
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

	
	$('ul.tabs1 li').click(function(){
		var tab_id = $(this).attr('data-tab1');

		$('ul.tabs1 li').removeClass('current1');
		$('.tab1-content').removeClass('current1');

		$(this).addClass('current1');
		$("#"+tab_id).addClass('current1');
         
	})


    $('.internal-table tr').click(function() {
        var href = $(this).find("a").attr("href");
        if(href) {
            window.location = href;
        }
    });


    
});
