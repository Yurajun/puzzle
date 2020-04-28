/* global $ */

import game from '../game/game.js';

import Cookies from 'js-cookie';

if (!Cookies.get('puzzleLevel')){
	Cookies.set('puzzleLevel', '2', {expires: 365});
	$('.remodal-options__label-level').map(function (key, elem){
		if ($(elem).children('.remodal-options__input-level').val() === '2'){
			return elem;
		}
	}).removeClass('remodal-options__label-level').addClass('remodal-options__label-level2');
}else {
	const puzzleLevelVal = Cookies.get('puzzleLevel');
	$('.remodal-options__label-level').map(function (key, elem){
		if ($(elem).children('.remodal-options__input-level').val() === puzzleLevelVal){
			return elem;
		}
	}).removeClass('remodal-options__label-level').addClass('remodal-options__label-level2');
}

$('.remodal-options__label-level, .remodal-options__label-level2').on('click', function (){
	$(this).siblings('.remodal-options__label-level, .remodal-options__label-level2').each((ind, elem) => {
		$(elem).removeClass('remodal-options__label-level2').addClass('remodal-options__label-level');
	});
	const levelInputItem = $('.remodal-options__input-level:checked');
	levelInputItem.parent()
		.removeClass('remodal-options__label-level').addClass('remodal-options__label-level2');
	const valInputItem = levelInputItem.val();
	Cookies.set('puzzleLevel', valInputItem, {expires: 365});
});

/* ==== звуки в игре on off ==== */
function textSpanOn(){
	$('.sound-input__label-span_on').css('display', 'inline-block');
	$('.sound-input__label-span_off').css('display', 'none');
}
function textSpanOff(){
	$('.sound-input__label-span_on').css('display', 'none');
	$('.sound-input__label-span_off').css('display', 'inline-block');
}
// При загрузке страницы
if (typeof Cookies.get('puzzleSound') === 'undefined'){
	Cookies.set('puzzleSound', 'checked', {expires: 365});
	$('.sound-input__input').prop('checked', 'checked').siblings()
		.removeClass('sound-input__label').addClass('sound-input__label2');
	textSpanOn();
	game.soundClick();
	game.soundPuzzle();
	game.soundLine();
	game.soundButtonError();
	game.soundPuzzleOk();
}else {
	const puzzleSoundVal = Cookies.get('puzzleSound');
	if (puzzleSoundVal === 'checked'){
		$('.sound-input__input').prop('checked', puzzleSoundVal).siblings()
			.removeClass('sound-input__label').addClass('sound-input__label2');
		textSpanOn();
		game.soundClick();
		game.soundPuzzle();
		game.soundLine();
		game.soundButtonError();
		game.soundPuzzleOk();
	}else {
		$('.sound-input__input').prop('checked', puzzleSoundVal).siblings()
			.removeClass('sound-input__label2').addClass('sound-input__label');
		textSpanOff();
		game.soundCl = {flag: false};
		game.soundPu = {flag: false};
		game.soundLi = {flag: false};
		game.soundButtonLine = {flag: false};
		game.suondOk = {flag: false};
	}
}

$('.sound-input__label, .sound-input__label2').on('click', function (){
	let puzzleSoundVal = Cookies.get('puzzleSound');
	if (puzzleSoundVal === 'checked'){
		puzzleSoundVal = '';
		$(this).removeClass('sound-input__label2').addClass('sound-input__label');
		$(this).siblings().removeAttr('checked');
		textSpanOff();
		game.musicMenu.pause();
		game.musicFlagOnOff = false;
		game.soundCl = {flag: false};
		game.soundPu = {flag: false};
		game.soundLi = {flag: false};
		game.soundButtonLine = {flag: false};
		game.suondOk = {flag: false};
	}else {
		puzzleSoundVal = 'checked';
		$(this).addClass('sound-input__label2').removeClass('sound-input__label');
		$(this).siblings().attr('checked', puzzleSoundVal);
		textSpanOn();
		game.musicMenu.play();
		game.musicFlagOnOff = true;
		game.soundCl = {flag: false};
		game.soundPu = {flag: false};
		game.soundLi = {flag: false};
		game.soundButtonLine = {flag: false};
		game.suondOk = {flag: false};
		game.soundClick();
		game.soundPuzzle();
		game.soundLine();
		game.soundButtonError();
		game.soundPuzzleOk();
	}
	Cookies.set('puzzleSound', puzzleSoundVal, {expires: 365});
});
/* ==== звуки в игре on off ==== */
