document.addEventListener('DOMContentLoaded', function(){
	'use strict';

	// var isActive = false;
	// var transitionEvents = 'transitionend webkitTransitionEnd MSTransitionEnd';

	// $('.js-menu').on('click', function() {
	// 	if (isActive) {
	// 		$(this).removeClass('active');
	// 		$('body').removeClass('open').addClass('out');
	// 		$('.menu-list').on(transitionEvents, function() {
	// 			$(this).off(transitionEvents);
	// 			$('body').removeClass('out');
	// 		});
	// 	} else {
	// 		$(this).addClass('active');
	// 		$('body').addClass('open');
	// 	}

	// 	isActive = !isActive;
	// });

	particlesJS.load('particles-js', 'Assets/particles.json');
}, false);