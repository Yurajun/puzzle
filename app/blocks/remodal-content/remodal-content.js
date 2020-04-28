/* global $ */
import Cookies from 'js-cookie';

import game from '../game/game.js';

$('.folder-select__img, .folder-load__label, .content__resum, .menu-li__a, .remodal-closed, .remodal-content__img, .remodal-options__label-level, .remodal-options__label-level2, .sound-input__label2, .sound-wrapp__button, .remodal-lenguage__label-level, .remodal-lenguage__label-level2, .save-wrapp__button, .exit-wrapp__button, .download-game__button, .image-help__close').on('click', function (){
	// game.sounEffect('menuClick.wav', 'menuClick.mp3', 'menuClick.ogg', '0.3');
	if (game.soundCl.flag !== false){
		game.soundCl.play();
		game.soundCl.volume = '0.3';
	}
});

$('.sound-input__label').on('click', function (){
	setTimeout(function (){
		if (game.soundCl.flag !== false){
			game.soundCl.play();
			game.soundCl.volume = '0.3';
		}
	}, 100);
});



$('.remodal-content__img').on('click', function (){
	if (game.musicFlagOnOff === true){
		game.musicMenu.pause();
	}
});

$('.exit-wrapp__button_return, .game-complite__button').on('click', function (){
	if (game.musicFlagOnOff === true){
		game.musicMenu.play();
	}
});

let attribut = '';
$(document).on('opening', '.remodal', function () {
	attribut = $(this).attr('data-remodal-id');
});

$('.folder-select').click(function (){
	setTimeout(function (){
		$('.scroll-pane').jScrollPane();
		$('.jspVerticalBar').css('background', 'transparent');
		$('.jspTrack').css('background', 'transparent');
		$('.jspDrag').addClass('jsp-drag');
		// $('.jspPane').css('padding-bottom', '-4vw');
		$('.scroll-pane').css('height', '87%');
		$('.remodal__modal-select').find('.jspDrag').addClass('jsp-drag_select');
	}, 500);
});
$(function (){
	$('.scroll-pane').jScrollPane();
	$('.jspVerticalBar').css('background', 'transparent');
	$('.jspTrack').css('background', 'transparent');
	$('.jspDrag').addClass('jsp-drag');
	// $('.jspPane').css('padding-bottom', '-4vw');
	$('.scroll-pane').css('height', '87%');
	$('.remodal__modal-select').find('.jspDrag').addClass('jsp-drag_select');
	// console.log($('.remodal__modal-select').find('.jspDrag'));
});

// при загрузке игры: показывать игровое поле, запустить игру
function showGame(curentImg){
	// const {level, filename} = levelGame();
	const level = parseInt(Cookies.get('puzzleLevel'), 10);
	const img = curentImg;
	setTimeout(function (){
		$('.content').hide(300);
		$('.game').delay(300).show(300);
		// console.log(img.attr('src'));
		let imgName = img.attr('src');
		imgName = game.strreplace( 'img-prev', 'img-game', imgName);
		game.cleanFiled();
		setTimeout(function (){
			game.load(
				imgName,
				level,
				false,
				true,
				false
			);
			game.widthResize = document.documentElement.clientWidth;
		}, 333);
		const inst = $('[data-remodal-id="load-game"]').remodal();
		inst.open();
	}, 300);

	game.imageGame = img.attr('src');
}

$('.remodal-content__img').on('click', function (){
	const inst = $('[data-remodal-id="modal-select"]').remodal();
	showGame($(this));
	inst.close();
});

function resizeContent(e){
	e.preventDefault();
	$('.scroll-pane').jScrollPane();
	$('.jspVerticalBar').css('background', 'transparent');
	$('.jspTrack').css('background', 'transparent');
	$('.jspDrag').addClass('jsp-drag');
	$('.jspPane').css('padding-bottom', '4vw');
}

function resizeGames(e){
	e.preventDefault();
	$('.scroll-pane-games').jScrollPane();
	$('.jspVerticalBar').css('background', 'transparent');
	$('.jspTrack').css('background', 'transparent');
	$('.jspDrag').addClass('jsp-drag');
	$('.jspPane').css('padding-bottom', '4vw');
}

function resize(e){
	e.preventDefault();
	$('.scroll-pane-about').jScrollPane();
	$('.jspVerticalBar').css('background', 'transparent');
	$('.jspTrack').css('background', 'transparent');
	$('.jspDrag').addClass('jsp-drag');
	$('.jspPane').css('padding-bottom', '4vw');
}

let time;
window.onresize = function (e){
	if (time){
		clearTimeout(time);
	}
	time = setTimeout(function (){
		if (attribut === 'modal-about'){
			resize(e);
		}else if (attribut === 'modal-select'){
			resizeContent(e);
		}else {
			resizeGames(e);
		}
		if (game.loadGame === true){
			game.resize();
		}
	}, 300);
};

function replaceLanguage(){
	const cookLenguage = Cookies.get('puzzleLanguage');
	if (cookLenguage === '1'){
		// english
		$('.folder-title_insert-select').html('Choose <br /> puzzle');
		$('.folder-title_insert-upload').html('Download <br /> picture');
		$('.menu-li__a_about-game').html('About the game');
		$('.menu-li__a_other-games').html('Other games');
		$('.menu-li__a_options').html('Options');
		$('.resum-p').html('Continue <br /> <span class="resum-p__span">build</span>');
		$('.remodal-h3_choose-puzzle').text('Choose puzzle');
		$('.remodal-h3_about-game').text('About the game');
		$('.remodal-h3_other-games').text('Other games');
		$('.remodal-h3_options').text('Options');
		$('.remodal-h3_change-language').text('Change language');
		$('.remodal-games__p').html('Try our other games <br /> on the Windows Store, Google Play and the App Store');
		$('.remodal-options__p').html('<span class="remodal-options__p_eng-style">The complexity<br /> of the puzzle: </span>');
		$('.remodal-options__span-easy').text('Easy');
		$('.remodal-options__span-middle').text('Middle');
		$('.remodal-options__span-difficult').text('Difficult');
		$('.sound-input__label-text').text('Sounds in the game: ');
		$('.sound-input__label-span_on').text('On');
		$('.sound-input__label-span_off').text('Off');
		$('.sound-wrapp__button_change-language').text('Change language');
		$('.remodal-lenguage__p').text('Choose language:');
		$('.remodal-lenguage__span-rus').text('Russian');
		$('.remodal-about__p_desc').html('Lovely Puzzle will allow you to choose a lot of puzzles from the library game of the game, <br /> and also will be able to download any picture in JPG format from your <br /> computer, turning it into a puzzle piece, which can also be collected. <br /> When you exit the game the puzzle is saved, so you can always <br /> continue to collect it later.');
		$('.remodal-about__p_devel').html('<p class="remodal-about__p remodal-about__p_font-size"><span class="remodal-about__p-span">In development participated:<br /></span>Ulyashchenkov Sergey <br /><span class="remodal-about__p-span">(Author of the idea, design, interface),<br /> </span>Komarov Yura <span class="remodal-about__p-span">(programming),<br /></span>Svetlana Fokina <span class="remodal-about__p-span">(second author).</span></p>');
		$('.remodal-about__h4').text('Feedback');
		$('.save-wrapp__button_save').text('Save');
		$('.save-wrapp__button_no').text('Cancel');
		$('.remodal-h3_exit-game').text('Return to the main menu?');
		$('.exit-wrapp__button_return').text('To the main menu');
		$('.exit-wrapp__button_no').text('Cancel');
	}else {
		$('.folder-title_insert-select').html('Выбрать <br /> паззл');
		$('.folder-title_insert-upload').html('Загрузить <br /> картинку');
		$('.menu-li__a_about-game').html('Об игре');
		$('.menu-li__a_other-games').html('Другие игры');
		$('.menu-li__a_options').html('Настройки');
		$('.resum-p').html('Продолжить <br /> <span class="resum-p__span">сборку</span>');
		$('.remodal-h3_choose-puzzle').text('Выберите паззл');
		$('.remodal-h3_about-game').text('Об игре');
		$('.remodal-h3_other-games').text('Другие игры');
		$('.remodal-h3_options').text('Настройки');
		$('.remodal-h3_change-language').text('Сменить язык');
		$('.remodal-games__p').html('Попробуйте другие наши игры <br /> в Windows Store, Google Play и App Store');
		$('.remodal-options__p').html('Сложность паззла:');
		$('.remodal-options__span-easy').text('Легкий');
		$('.remodal-options__span-middle').text('Средний');
		$('.remodal-options__span-difficult').text('Сложный');
		$('.sound-input__label-text').text('Звуки в игре');
		$('.sound-input__label-span_on').text('Включены');
		$('.sound-input__label-span_off').text('Выключены');
		$('.sound-wrapp__button_change-language').text('Сменить язык');
		$('.remodal-lenguage__p').text('Выберите язык:');
		$('.remodal-lenguage__span-rus').text('Русский');
		$('.remodal-about__p_desc').html('Lovely Puzzle позволит вам выбирать множество паззлов из библиоткеи игры, <br /> а также даст возможность загрузить любую картинку в формате JPG с вашего <br /> компьютера, превратив ее в паззл, который также можно собрать. <br /> При выходе из игры паззл сохраняется, поэтому вы всегда сможете <br /> продолжить собирать его позже.');
		$('.remodal-about__p_devel').html('<p class="remodal-about__p remodal-about__p_font-size"><span class="remodal-about__p-span">В разработке участвовали:<br /></span>Ульященков Сергей <span class="remodal-about__p-span">(автор идеи,<br /> дизайн, интерфейс), </span>Комаров <br /> Юрий <span class="remodal-about__p-span">(программирование),<br /></span>Светлана Фокина <span class="remodal-about__p-span">(соавтор).</span></p>');
		$('.remodal-about__h4').text('Обратная связь');
		$('.save-wrapp__button_save').text('Сохранить');
		$('.save-wrapp__button_no').text('Отмена');
		$('.remodal-h3_exit-game').text('Вернуться в главное меню?');
		$('.exit-wrapp__button_return').text('В главное меню');
		$('.exit-wrapp__button_no').text('Отмена');
	}
}

// работа с кукой puzzle Language
// получени и установка куки, запись в переменную
function getCookie(){
	let cookLenguage = Cookies.get('puzzleLanguage');
	if (!cookLenguage){
		const lang = navigator.language || navigator.browserLanguage;
		// console.log(lang); // firefox ru_RU  <---->  chrome ru
		cookLenguage = (lang === 'ru') ? '2' : '1';
		cookLenguage = '2'; //    ставили значение по умолчанию
		Cookies.set('puzzleLanguage', cookLenguage, {expires: 365});
	}
	replaceLanguage();
}
// Стили в зависимости от куки
function styleLanguage(){
	const cookLenguage = Cookies.get('puzzleLanguage');
	// console.log('styleLanguage', cookLenguage);
	$('.remodal-lenguage__input-level').each((key, elem) => {
		$(elem).prop('checked', false);
		$(elem).parent()
			.removeClass('remodal-lenguage__label-level2')
			.addClass('remodal-lenguage__label-level');
		if ($(elem).val() === cookLenguage){
			// console.log($(elem).val());
			$(elem).prop('checked', true);
			$(elem).parent()
				.removeClass('remodal-lenguage__label-level')
				.addClass('remodal-lenguage__label-level2');
		}
	});
}
getCookie();
styleLanguage();
// функция перекличения стилей в зависимости от клика
$('.remodal-lenguage__label-level, .remodal-lenguage__label-level2').on('click', function (){
	$(this).siblings().each((ind, elem) => {
		$(elem).removeClass('remodal-lenguage__label-level2').addClass('remodal-lenguage__label-level');
	});
	$('.remodal-lenguage__input-level:checked')
		.parent()
		.removeClass('remodal-lenguage__label-level')
		.addClass('remodal-lenguage__label-level2');
	// console.log($('.remodal-lenguage__input-level:checked').val());
});

// ==== Выход на нижний remodal ====
const crossButton = $('[data-remodal-id="modal-lenguage"]').first();
$(crossButton).on('closed', function (e){
	e.stopPropagation();
	const inst = $('[data-remodal-id="modal-options"]').remodal();
	inst.open();
	styleLanguage();
	// console.log('crossButton');
});
// сохраняем выбраный язык
const saveButton = $('.save-wrapp__button_save');
$(saveButton).on('click', function (e){
	e.stopPropagation();
	const inst = $('[data-remodal-id="modal-options"]').remodal();
	inst.open();
	// console.log('saveButton');

	// console.log('sb', $('.remodal-lenguage__input-level:checked').val());
	const val = $('.remodal-lenguage__input-level:checked').val();
	Cookies.set('puzzleLanguage', val, {expires: 365});
	styleLanguage();
	replaceLanguage();
});

