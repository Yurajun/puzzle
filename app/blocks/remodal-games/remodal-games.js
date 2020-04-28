/* global $ */
$('.menu-li__a').click(function (){
	setTimeout(function (){
		$('.scroll-pane-games').jScrollPane();
		$('.jspVerticalBar').css('background', 'transparent');
		$('.jspTrack').css('background', 'transparent');
		$('.jspDrag').addClass('jsp-drag');
		$('.jspPane').css('padding-bottom', '4vw');
	}, 500);
});
$(function (){
	$('.scroll-pane-games').jScrollPane();
	$('.jspVerticalBar').css('background', 'transparent');
	$('.jspTrack').css('background', 'transparent');
	$('.jspDrag').addClass('jsp-drag');
	$('.jspPane').css('padding-bottom', '4vw');
});
