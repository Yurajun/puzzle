import game from '../game/game.js';

// import Cookies from 'js-cookie';
$('.game-floor__button-game').on('click', function() {
	game.sounEffect('exit.wav', 'exit.mp3', 'exit.ogg', '0.3');
});

/**
 * При завершении текущей игры (кнопка в попапе "Выйти в главное меню")
 * @return undefined
 */
$('.exit-wrapp__button_return').on('click', function() {
	const inst = $('[data-remodal-id="exit-game"]').remodal();
	// window.URL = window.URL || window.webkitURL;
	// window.URL.revokeObjectURL(game.filePiepleGame);
	$('.game').hide(300);
	$('.content')
		.delay(300)
		.show(300);
	inst.close();
	game.cleanFiled();
	game.gameGetSaveResum(); // show ico resum game
	game.loadGame = false;
	//	$('.game-floor__puzzle-line').css('left', 0);
	//	puzzleLineMove = 0;
	let inputFD = $('#file-download');
	inputFD.replaceWith((inputFD = inputFD.val('').clone(true)));
});
/**
 * При завершении игры возвращает полоску обратно в положение 0
 * @return undefined
 */
$('.game-complite__button').on('click', function() {
	$('.remodal-is-opened').removeAttr('style');
	$('.remodal-is-opened').css({display: 'block'});
	const inst = $('[data-remodal-id="game-complite"]').remodal();
	$('.game').hide(300);
	$('.content')
		.delay(300)
		.show(300);
	inst.close();
	game.cleanFiled();
	game.loadGame = false;
	//	$('.game-floor__puzzle-line').css('left', 0);
	//	puzzleLineMove = 0;
});
/**
 * Смещение полосы влево или вправао на указанное расстояние
 * @type {[type]}
 */
/* function opacityPiece(currentLeft){
	const piece = $('[data-flag = false]');
	const pieceCount = Math.floor(currentLeft / game.pieceSizeLine);


	const lev = document.querySelector('.game-floor__button-right');
	const levL = lev.getBoundingClientRect().left - 5;
	const levT = lev.getBoundingClientRect().top + 20;
	const elemHover = document.elementFromPoint(levL, levT);
	const el = $(elemHover).closest('.group');
	const elNomber = $(piece).index($(el));
	console.log(elNomber);
	$(piece).each((key, elem) => {
		if (key + 1 <= Math.abs(pieceCount)){
			$(elem).css('opacity', '0.25');
		}else if (key + 1 > Math.abs(pieceCount) && key < elNomber){
			console.log($(elem).attr('id'));
			console.log($(el).attr('id'));
			$(elem).css('opacity', '1');
		}else {
			console.log('elem', $(el).attr('id'));
			$(elem).css('opacity', '0.25');
		}
	});
}*/
const numberShift = window.devicePixelRatio === 2 ? 75 : 150;
$('.game-floor__button-right').on('click', function() {
	// вправо
	let shiftLeftCss = parseFloat($(game.gameFloorPuzzleLine).css('left'), 10);
	const sl = document
		.querySelector('.game-floor__puzzle-line')
		.getBoundingClientRect().left;
	let shiftLeftProp = parseFloat(
		$(game.gameFloorPuzzleLine).prop('left'),
		10
	);
	if (sl + 5 < game.pieceSizeLine) {
		$(game.gameFloorPuzzleLine).css('left', (shiftLeftCss += numberShift));
		$(game.gameFloorPuzzleLine).prop(
			'left',
			(shiftLeftProp += numberShift)
		);
		game.sounEffect('shift.wav', 'shift.mp3', 'shift.ogg', '0.2');
		// opacityPiece(shiftLeftCss);
	} else if (game.soundButtonLine.flag !== false) {
		game.soundButtonLine.play();
		game.soundButtonLine.volume = '0.3';
		game.sounEffect('error.wav', 'error.mp3', 'error.ogg', '0.3');
		// opacityPiece(shiftLeftCss);
	}
});
$('.game-floor__button-left').on('click', function() {
	// влево
	let shiftLeftCss = parseFloat($(game.gameFloorPuzzleLine).css('left'), 10);
	let shiftLeftProp = parseFloat(
		$(game.gameFloorPuzzleLine).prop('left'),
		10
	);

	const lengthLine = $('[data-flag = false]').length * game.pieceSizeLine;
	const lev = document.querySelector('.game-floor__button-right');
	const levL = lev.getBoundingClientRect().left;
	// console.log(lengthLine);
	if (lengthLine + shiftLeftProp > levL) {
		$(game.gameFloorPuzzleLine).css('left', (shiftLeftCss -= numberShift));
		$(game.gameFloorPuzzleLine).prop(
			'left',
			(shiftLeftProp -= numberShift)
		);
		game.sounEffect('shift.wav', 'shift.mp3', 'shift.ogg', '0.2');
	} else if (game.soundButtonLine.flag !== false) {
		game.soundButtonLine.play();
		game.soundButtonLine.volume = '0.3';
		game.sounEffect('error.wav', 'error.mp3', 'error.ogg', '0.3');
		// opacityPiece(shiftLeftCss);
	}
	// opacityPiece(shiftLeftCss);
});

let helpImageFlag = false;
function toggleHelpImage() {
	if (!helpImageFlag) {
		$('.game-floor__look-full-img').addClass(
			'game-floor__look-full-img_help'
		);
		$('.game-floor__button-full-img').addClass(
			'game-floor__button-full-img_help'
		);
		$('.image-help').show();
		$('.game-content__game').css({'z-index': 0});
		helpImageFlag = true;
		game.sounEffect('preview.wav', 'preview.mp3', 'preview.ogg', '0.3');
	} else {
		$('.game-floor__look-full-img').removeClass(
			'game-floor__look-full-img_help'
		);
		$('.game-floor__button-full-img').removeClass(
			'game-floor__button-full-img_help'
		);
		$('.image-help').hide();
		$('.game-content__game').css({'z-index': ''});
		helpImageFlag = false;
	}
}

$('.game-floor__button-full-img').on('click', toggleHelpImage);
$('.image-help__close').on('click', toggleHelpImage);
