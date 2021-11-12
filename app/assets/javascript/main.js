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

	// Add logic to toggle visiblity when unviewed check clicked
	$('.pecs-row, .decs-row').click(function() {
		if($(this).is(':checked')) {
			$('tr.'+ $(this).attr('id')).addClass('show');
			$('tr.'+ $(this).attr('id')).removeClass('hide');
			console.log('checked this');
		}
		else {
			$('tr.'+ $(this).attr('id')).addClass('hide');
			$('tr.'+ $(this).attr('id')).removeClass('show');
			console.log('hidden');
		}
	});
	


    
});
