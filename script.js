$(function() {
	var $content = $('#content');

	function getParameterByName(name, url) {
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	function setupPage(pageName) {
		switch(pageName) {
		    case 'home.html':
		        $('.carousel').flickity({
					wrapAround: true,
					autoPlay: 1500,
					imagesLoaded: true
				});

		    case 'footwear.html':
		        var images = document.querySelector('.js-images');
				if (images && baguetteBox) baguetteBox.run('.js-images');
		        break;
		}
	}

	function loadPage(pageName) {
		$content.removeClass('show')

    	window.setTimeout(function() {
    		$content.load(pageName, function() {
    			$content.addClass('show');
	    		setupPage(pageName);
	    	})
    	}, 500);
	}

	var pagetoLoad = 'home';
	if (getParameterByName('page')) {
		pagetoLoad = getParameterByName('page');
	}

	loadPage(pagetoLoad + '.html');

    $('.js-nav-link').on('click', function(e) {
    	e.preventDefault();
    	var pageName = $(this).attr('href');

    	loadPage(pageName);
    });
});
