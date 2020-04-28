import NProgress from 'nprogress';
import game from '../game/game.js';

NProgress.configure({
	showSpinner: false,
	parent: '.preload-box__load-animate'
});

NProgress.start();

function loadBar() {
	$('.preloader').hide(200);
	setTimeout(() => {
		$('.content')
			.show(200)
			.addClass('menu-dark-fone');
		game.soundBar('musicMenu.wav', 'musicMenu.mp3', 'musicMenu.ogg', '0.2');
	}, 300);
}

$(document).ready(function() {
	// NProgress.done(loadBar());
	// результ
	// $('.game').css({display: 'none'});
	setTimeout(() => {
		NProgress.set(0.4);
	}, 1000);
	setTimeout(() => {
		NProgress.set(0.6);
	}, 2000);
	setTimeout(() => {
		NProgress.set(0.8);
	}, 3000);
	setTimeout(() => {
		NProgress.done(loadBar());
	}, 4000);
	// $('.preloader').delay(230000).hide(200);  // 2300
	// $('.content').delay(250000).show(200).addClass('menu-dark-fone');  // 2500
	// $('.content').delay(2500).addClass('menu-dark-fone');
	// разраб
	/* $('.preloader').delay(200).hide(200);
	// $('.content').css('display', 'block');
	setTimeout(function (){
		const content = $('.content');
		content.css('display', 'block');
		content.delay(200).show(200);
		content.addClass('menu-dark-fone');
		Все, я реализовал загрузку от пользователя. Ура ))) я почти победил этот паззл http://yura-ru.1gb.ru
	}, 200);*/
	// setTimeout(function (){
	// 	game.soundBar('musicMenu.wav', 'musicMenu.mp3', 'musicMenu.ogg', '0.2');
	// }, 2500);
});
