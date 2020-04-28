/* global $ */
// import Cookies from 'js-cookie';

const game = {};
export default game;

game.randomInteger = function (low, high){
	return low + Math.round(Math.random() * (high - low));
};

game.between = function (num, low, high){
	return (num >= low && num <= high);
};

game.puzzleSort = function (){
	let puzzleItmes = document.querySelectorAll('.group');
	function toArray(obj){ return [].slice.call(obj);}
	puzzleItmes = toArray(puzzleItmes);
	function shuffle(array) {
		let currentIndex = array.length;
		let temporaryValue;
		let randomIndex;
		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}
	puzzleItmes = shuffle(puzzleItmes);
	const gameFloorPuzzleLineContainer = document.querySelector('.game-floor__puzzle-line');// .innerHTML = '';
	gameFloorPuzzleLineContainer.innerHTML = '';
	// $('.game-floor__puzzle-line').children().html('');

	let str = '';
	for (let i = 0; i < puzzleItmes.length; i++){
		// str += puzzleItmes[i].innerHTML;
		const divCont = document.createElement('div');
		// console.log(puzzleItmes[i].toString());
		divCont.appendChild(puzzleItmes[i]);
		str += divCont.innerHTML;
		// $('.game-floor__puzzle-line').children().append(puzzleItmes[i]);
	}
	const newDiv = document.createElement('div');
	newDiv.innerHTML = str;
	gameFloorPuzzleLineContainer.appendChild(newDiv);
};

game.extactTouchPoint = function (e){
	if (typeof e.pageX === 'undefined'){
		game.touchX = e.originalEvent.touches[0].pageX || e.originalEvent.changedTouches[0].pageX;
		console.log('und');
	}else {
		game.touchX = e.pageX;
	}
	if (typeof e.pageY === 'undefined'){
		game.touchY = e.originalEvent.touches[0].pageY || e.originalEvent.changedTouches[0].pageY;
	}else {
		game.touchY = e.pageY;
	}
	return true;
};
// style="width: ' + game.pieceSize + 'px;height: ' + game.pieceSize + 'px;"
game.createPuzzleItem = function (){
	let w = 0;
	let str = '';
	for (let i = 1; i <= game.puzzleQuantity.rows; i++) {
		for (let j = 1; j <= game.puzzleQuantity.columns; j++) {
			const n = ((i - 1) * game.puzzleQuantity.columns + j);
			const svg = game.createPuzzle(game.image, ++w, game.itmeSize);
			// svg.attr('height', game.pieceSizeLine).css('height', game.pieceSizeLine);
			// svg.attr('width', game.pieceSizeLine).css('width', game.pieceSizeLine);
			str += '<div data-flag="false" data-one="false" data-group="false" class="group" id="group-' + n + '" style="width:' + game.pieceSizeLine + 'px; height:' + game.pieceSizeLine + 'px;"><div class="piece" id="piece-' + i + '-' + j + '" style="width:' + game.pieceSizeLine + 'px; height:' + game.pieceSizeLine + 'px;">' + svg + '</div></div>';
			// $('.game-floor__puzzle-line').append('<div data-flag="false" data-one="false" data-group="false" class="group" id="group-' + n + '" style="width:' + game.pieceSizeLine + 'px; height:' + game.pieceSizeLine + 'px;"/>');
			// $('#group-' + n).append('<div class="piece" id="piece-' + i + '-' + j + '" style="width:' + game.pieceSizeLine + 'px; height:' + game.pieceSizeLine + 'px;"></div>')
			// 	.children().append(svg);
			// $('#image-' + i + '-' + j).on('load', function (){
				// if (--game.imagesLeftToDownload === 0){
				// }
			// });
		}
	}
	console.log(str);
	// $('.game-floor__puzzle-line').html(str);
	const newdiv = document.createElement('div');
	newdiv.innerHTML = str;
	const gameFloorPuzzleLine = document.querySelector('.game-floor__puzzle-line');
	gameFloorPuzzleLine.appendChild(newdiv);
	// console.log($('[data-flag = false] > .piece').children());
	$('[data-flag = false] > .piece').children().each((key, elem) => {
		$(elem).attr('height', game.pieceSizeLine).css('height', game.pieceSizeLine);
		$(elem).attr('width', game.pieceSizeLine).css('width', game.pieceSizeLine);
		console.log($(elem));
	});
	setTimeout(function (){
		const inst = $('[data-remodal-id="load-game"]').remodal();
		inst.close();
	}, 533);
	// $('.piece').css({
	// 	width: game.pieceSize + 'px',
	// 	height: game.pieceSize + 'px'
	// });
	// game.puzzleSort();
};

let isTouchDevice = true;
game.touchDevice = function (){
	try {
		document.createEvent('TouchEvent');
		// Отменять перетаскивание, когда приложение возобновляется с фона
		document.addEventListener('resumed', function (){
			game.moving = false;
			game.movingGroupId = false;
		});
		document.addEventListener('touchmove', function (event){event.preventDefault();}, true);
	}
	catch (err) {isTouchDevice = false;}

	game.touchStartEvent = isTouchDevice ? 'touchstart' : 'mousedown';
	game.touchMoveEvent = isTouchDevice ? 'touchmove' : 'mousemove';
	game.touchEndEvent = isTouchDevice ? 'touchend' : 'mouseup';
	game.touchStartX = 0;
	game.touchStartY = 0;
	game.movingGroupStartX = 0;
	game.movingGroupStartY = 0;
};

game.getPuzzleQuantity = function (sideWidth, width, height){
	const quantity = {};                                  // создаем новый объект
	quantity.columns = Math.floor(width / sideWidth);     // количество колонок
	quantity.rows = Math.floor(height / sideWidth);       // количество строк
	quantity.width = quantity.columns * sideWidth;
	quantity.height = quantity.rows * sideWidth;
	quantity.segments = quantity.columns * quantity.rows;
	quantity.size = sideWidth;
	return quantity;
};

/* eslint complexity: ["error", 25] */
game.getBorder = function (puzzleQuantity, position) {
	const b = {
		top: {
			smooth: 'M50,50',
			outside: 'M50,50 110,47 C115,40 115,35 110,30 105,25 95,1 125,1 155,1 145,25 140,30 135,35 135,40 140,47',
			inside: 'M50,50 110,53 C115,60 115,65 110,70 105,75 95,100 125,100 155,100 145,75 140,70 135,65 135,60 140,53'
		},
		right: {
			smooth: ' L200,50',
			outside: ' L200,50 203,110 C210,115 215,115 220,110 225,105 249,95 249,125 249,155 225,145 220,140 215,135 210,135 203,140',
			inside: ' L200,50 197,110 C190,115 185,115 180,110 175,105 151,95 151,125 151,155 175,145 180,140 185,135 190,135 197,140'
		},
		bottom: {
			smooth: ' L200,200',
			outside: ' L200,200 140,203 C135,210 135,215 140,220 145,225 155,249 125,249 95,249 105,225 110,220 115,215 115,210 110,203',
			inside: ' L200,200 140,197 C135,190 135,185 140,180 145,175 155,151 125,151 95,151 105,175 110,180 115,185 115,190 110,197'
		},
		left: {
			smooth: ' L50,200z',
			outside: ' L50,200 47,140 C40,135 35,135 30,140 25,145 1,155 1,125 1,95 25,105 30,110 35,115 40,115 47,110z',
			inside: ' L50,200 53,140 C60,135 65,135 70,140 75,145 99,155 99,125 99,95 75,105 70,110 65,115 60,115 53,110z'
		}
	};
	const border = {};
	// TOP // console.log(puzzleQuantity); // Object {columns: 4, rows: 3, width: 464, height: 348, segments: 15, size: 116}
	if (position.row === 1){ // 1, 2, 3
		border.top = b.top.smooth;
	}else if (puzzleQuantity.columns % 2 === 0){
		if (position.column % 2 === 0 && position.row % 2 === 0 || position.column % 2 !== 0 && position.row % 2 !== 0){
			border.top = b.top.outside;
		}else {
			border.top = b.top.inside;
		}
	}else if (position.column % 2 === 0 && position.row % 2 === 0 || position.column % 2 !== 0 && position.row % 2 !== 0){
		border.top = b.top.outside;
	}else {
		border.top = b.top.inside;
	}
	// RIGHT
	if (position.column === puzzleQuantity.columns){
		border.right = b.right.smooth;
	}else if (puzzleQuantity.columns % 2 === 0){
		if (position.column % 2 === 0 && position.row % 2 === 0 || position.column % 2 !== 0 && position.row % 2 !== 0){
			border.right = b.right.inside;
		}else {
			border.right = b.right.outside;
		}
	}else if (position.column % 2 === 0 && position.row % 2 === 0 || position.column % 2 !== 0 && position.row % 2 !== 0){
		border.right = b.right.inside;   // во внутрь
	}else {
		border.right = b.right.outside;  // наружу
	}
	// BOTTOM
	if (position.row === puzzleQuantity.rows){
		border.bottom = b.bottom.smooth;
	}else if (puzzleQuantity.columns % 2 === 0){
		if (position.column % 2 === 0 && position.row % 2 === 0 || position.column % 2 !== 0 && position.row % 2 !== 0){
			border.bottom = b.bottom.outside;
		}else {
			border.bottom = b.bottom.inside;
		}
	}else if (position.column % 2 === 0 && position.row % 2 === 0 || position.column % 2 !== 0 && position.row % 2 !== 0){
		border.bottom = b.bottom.outside;
	}else {
		border.bottom = b.bottom.inside;
	}
	// LEFT
	if (position.column === 1){
		border.left = b.left.smooth;
	}else if (puzzleQuantity.columns % 2 === 0) {
		if (position.column % 2 === 0 && position.row % 2 === 0 || position.column % 2 !== 0 && position.row % 2 !== 0){
			border.left = b.left.inside;
		}else {
			border.left = b.left.outside;
		}
	}else if (position.column % 2 === 0 && position.row % 2 === 0 || position.column % 2 !== 0 && position.row % 2 !== 0){
		border.left = b.left.inside;
	}else {
		border.left = b.left.outside;
	}
	return border;
};

game.createPuzzle = function (imageObj, puzzleNumber, puzzleSize){

	const imageScale = 1 * (150 / puzzleSize); // 1.293103448275862
	const borderSize = 50 * (puzzleSize / 150); // 38.666666666666664

	const position = {};
	position.isFirst = puzzleNumber === 1;  // true   11- false
	position.isLast = puzzleNumber === game.puzzleQuantity.segments;
	position.row = Math.floor((puzzleNumber - 1) / (game.puzzleQuantity.columns)) + 1;  // 1, 2, 3
	position.column = puzzleNumber - (position.row - 1) * game.puzzleQuantity.columns;  // 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4

	const border = game.getBorder(game.puzzleQuantity, position);
	// console.log(border);

	// Create svg
	const svg =
		'<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" ' +
		'width="' + (puzzleSize + borderSize * 2) + 'px" height="' + (puzzleSize + borderSize * 2) + 'px" version="1.1"' +
		'class="puzzle" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 250 250">' +
		'<defs><filter id="filter" x="0" y="0">' +
		'<feGaussianBlur stdDeviation="1" /></feGaussianBlur>' +
		'<feOffset dx="1" dy="1" /></feOffset>' +
		'</filter>' +
		'</defs>' +
		'<clipPath id="path' + puzzleNumber + '">' +
		'<path d="' + border.top + border.right + border.bottom + border.left + '"></path>' +
		'</clipPath>' +
		'<g stroke="black" stroke-width="2" stroke-opacity="0.5" >' +
		'<g style="clip-path:url(#path' + puzzleNumber + ')">' +
		'<image xlink:href="' + imageObj.src + '" x="' + (50 - (position.column - 1) * 150) +
		'" y="' + (50 - (position.row - 1) * 150) +
		'" width="' + imageObj.naturalWidth * imageScale + '" height="' + imageObj.naturalHeight * imageScale + '"></image>' +
		'</g>' +
		'<path filter="url(#filter)" class="puzzle-border" fill="transparent" d="' + border.top + border.right + border.bottom + border.left + '"></path>' +
		'</g>' +
		'</svg>';

	const $svg = $(svg);

	$svg.css({
		'z-index': 1,
		'shape-rendering': 'geometricPrecision',
		'image-rendering': 'optimizeSpeed',
		'fill-rule': 'evenodd',
		'clip-rule': 'evenodd'
	});


	return svg;
};

game.load = function (filename, level, saveGameFlag, saveGameFlagPiople){
	game.solved = false;
	game.pixelRatio = window.devicePixelRatio === 2 ? 2 : 1;
	game.level = level;
	game.loadGame = true;
	game.saveGame = saveGameFlagPiople;
	game.imagesLeftToDownload = game.rows * game.columns;
	game.size = game.columns + 'x' + game.rows;

	game.imageName = filename;
	game.image = new Image();
	game.image.src = game.imageName;
	game.pieceSizeLine = $('.game-floor').height() - ($('.game-floor').height() / 100 * 5); // малый размер детали
	game.image.onload = function (){
		const pictureBox = $('.picture-box__img');
		const pictureBoxHelp = $('.image-help__img');
		const imageWidth = (game.image.width / game.pixelRatio);
		const imageHeight = (game.image.height / game.pixelRatio);
		switch (game.level){
			case 1:
				game.itmeSize = Math.floor(imageHeight / 3);
				game.pieceSize = game.pieceSizeLine * 2.5;                 // большой размер детали
				game.pieceInnerSizeLine = game.pieceSizeLine * 60 / 100;   // малый внутренний размер малой детали
				game.pieceInnerSize = game.pieceInnerSizeLine * 2.5;       // большой внутреннй размер большой детали
				break;
			case 2:
				game.itmeSize = Math.floor(imageHeight / 5);
				game.pieceSize = game.pieceSizeLine * 1.5;                 // большой размер детали
				game.pieceInnerSizeLine = game.pieceSizeLine * 60 / 100;   // малый внутренний размер малой детали
				game.pieceInnerSize = game.pieceInnerSizeLine * 1.5;       // большой внутреннй размер большой детали
				break;
			case 3:
				game.itmeSize = Math.floor(imageHeight / 7);
				game.pieceSize = game.pieceSizeLine * 1.2;                 // большой размер детали
				game.pieceInnerSizeLine = game.pieceSizeLine * 60 / 100;   // малый внутренний размер малой детали
				game.pieceInnerSize = game.pieceInnerSizeLine * 1.2;       // большой внутреннй размер большой детали
				break;
			default:
				console.log(game.level);
				console.log(typeof game.level);
		}

		game.puzzleQuantity = game.getPuzzleQuantity(game.itmeSize, imageWidth, imageHeight);


		pictureBox.css({width: game.pieceInnerSize * game.puzzleQuantity.columns + 'px', height: game.pieceInnerSize * game.puzzleQuantity.rows + 'px'});
		pictureBoxHelp.css({width: game.pieceInnerSize * game.puzzleQuantity.columns + 'px', height: game.pieceInnerSize * game.puzzleQuantity.rows + 'px'});
		pictureBoxHelp.attr('src', game.imageName);

		game.pieceInnerSize = Math.round(game.pieceInnerSize / game.pixelRatio);
		game.pieceSize = Math.round(game.pieceSize / game.pixelRatio);

		game.screenWidth = document.documentElement.clientWidth;
		// game.screenHeight = document.documentElement.clientHeight;
		game.proximity = 24;
		game.moving = false;
		game.movingGroupId = false;
		// game.pieceInBody = false;
		game.touchX = 0;
		game.touchY = 0;
		game.zIndex = 2;



		// Определить, поддерживает ли устройство сенсорные события
		game.touchDevice();
		// Создаем кусочки и помещаем их в puzzle-line
		game.createPuzzleItem();

		if (saveGameFlag){
			game.cleanFiled();
			game.startSaveGame();
		}

		$('.piece').on(game.touchStartEvent, function (e){
			e.stopPropagation();
			e.preventDefault();
			game.extactTouchPoint(e); // game.touchX = e.pageX; game.touchY = e.pageY;
			game.moving = true;
			game.movingGroupId = $(this).parent().prop('id');
			game.pieceInBody = $(this).parent().attr('data-flag');
			game.movingPieceId = $(this).prop('id');
			game.touchStartX = game.touchX;
			game.touchStartY = game.touchY;
			game.movingGroupStartX = $(this).parent().offset().left;
			game.movingGroupStartY = $(this).parent().offset().top;
			$('#' + game.movingGroupId).css({'z-index': game.zIndex++});
		});


		$('body').on(game.touchMoveEvent, function (e){
			if (!game.moving) {
				return false;
			}

			e.stopPropagation();
			e.preventDefault();
			game.extactTouchPoint(e); // game.touchX = e.pageX; game.touchY = e.pageY;
			game.moving = false;

			let newX;
			let newY;
			game.maxHeight = document.querySelector('.game-floor').getBoundingClientRect().top;
			// && $('#' + game.movingGroupId).attr('data-one') === 'false'

			const dataFlag = $('#' + game.movingGroupId).attr('data-flag');
			const dataOne = $('#' + game.movingGroupId).attr('data-one');
			const dataGroup = $('#' + game.movingGroupId).attr('data-group');
			if (game.touchY < game.maxHeight){

				newX = game.movingGroupStartX + (game.touchX - game.touchStartX);
				newY = game.movingGroupStartY + (game.touchY - game.touchStartY);

				if (dataFlag === 'true' && dataOne === 'true'){
					$('#' + game.movingPieceId).css({width: game.pieceSize, height: game.pieceSize}).children()
						.css({width: game.pieceSize, height: game.pieceSize}).attr({width: game.pieceSize, height: game.pieceSize});
					game.moveElement(game.movingGroupId, newX, newY, function (){game.moving = true;});

				}else if (dataFlag === 'false' && dataOne === 'false'){
					console.log('false  false');
					newX = game.movingGroupStartX - ((game.pieceSize - game.pieceSizeLine) / 2) + (game.touchX - game.touchStartX);
					newY = game.movingGroupStartY - ((game.pieceSize - game.pieceSizeLine) / 2) + (game.touchY - game.touchStartY);
					game.moveElement(game.movingGroupId, newX, newY, function (){game.moving = true;});
					$('#' + game.movingPieceId).css({width: game.pieceSize, height: game.pieceSize}).children()
						.css({width: game.pieceSize, height: game.pieceSize}).attr({width: game.pieceSize, height: game.pieceSize});
					game.endMove(game.movingGroupId);       // data-flag = true

				}else if (dataFlag === 'true' && dataOne === 'false'){

					newX = game.movingGroupStartX - ((game.pieceSize - game.pieceSizeLine) / 2) + (game.touchX - game.touchStartX);
					newY = game.movingGroupStartY - ((game.pieceSize - game.pieceSizeLine) / 2) + (game.touchY - game.touchStartY);
					$('#' + game.movingPieceId).css({width: game.pieceSize, height: game.pieceSize}).children()
						.css({width: game.pieceSize, height: game.pieceSize}).attr({width: game.pieceSize, height: game.pieceSize});
					game.moveElement(game.movingGroupId, newX, newY, function (){game.moving = true;});
				}
			}else {
				newX = game.touchX - game.touchStartX;
				newY = game.touchY - game.touchStartY;

				if (dataFlag === 'false' && dataOne === 'false' && dataGroup === 'false'){

					game.moveElement(game.movingPieceId, newX, newY, function (){game.moving = true;});
				}else if (dataFlag === 'true' && dataOne === 'false' && dataGroup === 'false'){

					newX = game.movingGroupStartX + (game.touchX - game.touchStartX);
					newY = game.movingGroupStartY + (game.touchY - game.touchStartY);
					$('#' + game.movingPieceId).css({width: game.pieceSizeLine, height: game.pieceSizeLine}).children()
						.css({width: game.pieceSizeLine, height: game.pieceSizeLine}).attr({width: game.pieceSizeLine, height: game.pieceSizeLine});

					const newYCoord = game.maxHeight + (($(window).height() - game.maxHeight) / 2);
					const newXCoord = newX - game.pieceSizeLine;
					const elemHover = document.elementFromPoint(newXCoord, newYCoord);
					game.elemInsert = $(elemHover).closest('.group');

					game.moveElement(game.movingGroupId, newX, newY, function (){game.moving = true;});
				}else if (dataFlag === 'true' && dataOne === 'true' && dataGroup === 'false'){

					newX = game.movingGroupStartX + ((game.pieceSize - game.pieceSizeLine) / 2) + (game.touchX - game.touchStartX);
					newY = game.movingGroupStartY + ((game.pieceSize - game.pieceSizeLine) / 2) + (game.touchY - game.touchStartY);
					$('#' + game.movingPieceId).css({width: game.pieceSizeLine, height: game.pieceSizeLine}).children()
						.css({width: game.pieceSizeLine, height: game.pieceSizeLine}).attr({width: game.pieceSizeLine, height: game.pieceSizeLine});

					const newYCoord2 = game.maxHeight + (($(window).height() - game.maxHeight) / 2);
					const newXCoord2 = game.touchX - game.pieceSizeLine;
					const elemHover2 = document.elementFromPoint(newXCoord2, newYCoord2);
					game.elemInsert = $(elemHover2).closest('.group');

					game.moveElement(game.movingGroupId, newX, newY, function (){game.moving = true;});
				}else if (dataFlag === 'true' && dataOne === 'true' && dataGroup === 'true'){

					newX = game.movingGroupStartX + (game.touchX - game.touchStartX);
					newY = game.movingGroupStartY + (game.touchY - game.touchStartY);
					game.moveElement(game.movingGroupId, newX, newY, function (){game.moving = true;});
				}

			}
		});

		$('body').on(game.touchEndEvent, function (){
			// game.endMove(game.movingGroupId);
			if ($('#' + game.movingGroupId).attr('data-flag') === 'true'){
				$('#' + game.movingGroupId).attr('data-one', 'true');
				const group = $('#' + game.movingGroupId);
				group.children('.piece').each(function (){
					game.moveElement( $(this).prop('id'), $(this).offset().left, $(this).offset().top );
				});
				game.moveElement(game.movingGroupId, 0, 0);

				if (!game.solved){
					if (game.touchY < game.maxHeight){
						group.children('.piece').each(function (){
							const positionIStart = $(this).attr('id').indexOf('-');
							const positionIEnd = $(this).attr('id').lastIndexOf('-');
							const i = parseInt($(this).attr('id').slice(positionIStart + 1, positionIEnd), 10);
							const j = parseInt($(this).attr('id').slice(positionIEnd + 1), 10);

							// top neighbour верхний сосед
							game.checkCouple( $(this), 'piece-' + (i - 1) + '-' + (j), $(this).offset().left, $(this).offset().top - game.pieceInnerSize);

							// bottom neighbour нижний сосед
							game.checkCouple( $(this), 'piece-' + (i + 1) + '-' + (j), $(this).offset().left, $(this).offset().top + game.pieceInnerSize);

							// left neighbour левый сосед
							game.checkCouple( $(this), 'piece-' + (i) + '-' + (j - 1), $(this).offset().left - game.pieceInnerSize, $(this).offset().top);

							// right neighbour правый сосед
							game.checkCouple( $(this), 'piece-' + (i) + '-' + (j + 1), $(this).offset().left + game.pieceInnerSize, $(this).offset().top);

							// saveGame.flag = true;
							game.saveCookie();
							if (game.saveGame){
								$('.content__resum').css('display', 'flex');
							}else {
								$('.content__resum').css('display', 'none');
							}
							// if only one group left: puzzle solved!
							if ( $('.group').length === 1 ) {

								game.solved = true;
								const inst = $('[data-remodal-id="game-complite"]').remodal();
								inst.open();
								$('.remodal__game-complite').css({'margin-bottom': 0}).parent()
									.css({padding: 0, margin: 0, overflow: 'hidden'}).addClass('after-none');
								setTimeout(function (){
									$('.remodal-is-opened').css({filter: 'blur(0)'});
								}, 500);
								$('.game-complite__img').attr('src', game.imageGame);

								// game.solved = true;
								// $('.group:first').animate({left: 0, top: 0});
								// clearInterval(game.timer_interval);
								// $('#game-pause').hide();
								// $('#game-solved').show();
							}
						});
					}else if ($('#' + game.movingGroupId).attr('data-group') === 'false'){
						console.log($(game.elemInsert).attr('class'));
						console.log($(game.elemInsert));
						$('#' + game.movingGroupId).css({width: game.pieceSizeLine + 'px', height: game.pieceSizeLine + 'px', position: 'relative'}).attr('data-flag', 'false')
							.attr('data-one', 'false')
							.children('.piece').css({left: 'auto', top: 'auto'});
						if ($(game.elemInsert).attr('class') === 'group'){
							$('#' + game.movingGroupId).insertAfter($(game.elemInsert));
						}else {
							$('.game-floor__puzzle-line').children().prepend($('#' + game.movingGroupId));
						}
					}
				}

			}else {
				game.moveElementFooter(game.movingGroupId, 0, 0);
			}
			game.moving = false;
			game.movingGroupId = false;
			game.touchStartX = 0;
			game.touchStartY = 0;
			game.movingGroupStartX = 0;
			game.movingGroupStartY = 0;
		});

	};
	// game.dragStart();.css({width: game.pieceSize, height: game.pieceSize})

};
/*
game.startMove = function (elem){
	$('#' + elem)
		.children('.piece').css({position: 'absolute'});
	// $('.game-content').append($('#' + elem));
};*/
game.endMove = function (elem){
	$('.game-content__game').append($('#' + elem));
	$('#' + elem).css({width: 0, height: 0, position: 'absolute'}).attr('data-flag', 'true')
		.children('.piece').css({left: '0', top: '0'});
	// $('.game-content').append($('#' + elem));
};


game.moveElement = function (id, x, y, callback){
	$('#' + id).css({left: x + 'px', top: y + 'px'});
	if (typeof callback !== 'undefined'){
		callback();
	}
};
game.moveElementFooter = function (id, x, y){
	$('#' + id).children('.piece').css({left: x, top: y});
};

game.checkCouple = function (source, targetId, x, y){

	const target = $('.group[id!=' + game.movingGroupId + '] > #' + targetId);
	if (
		target.length && 											// Сосед не находится в одной группе
		game.between(target.offset().left, x - game.proximity, x + game.proximity) &&
		game.between(target.offset().top, y - game.proximity, y + game.proximity)	// Сосед достаточно близко
		) {
		const offsetX = x - target.offset().left;
		const offsetY = y - target.offset().top;
		const targetGroup = target.parent();
		targetGroup.children('.piece').each(function (){
			game.moveElement($(this).prop('id'), $(this).offset().left + offsetX, $(this).offset().top + offsetY );
			$('#' + game.movingGroupId).append($(this));
			$('#' + game.movingGroupId).attr('data-group', 'true');
		});
		// remove group if empty
		if (!targetGroup.children('.piece').length) {
			targetGroup.remove();
		}
	}
};
/*
game.pieceSizeLine = $('.game-floor').height() - ($('.game-floor').height() / 100 * 5); // малый размер детали
game.pieceSize = game.pieceSizeLine * 2.5;                 // большой размер детали
game.pieceInnerSizeLine = game.pieceSizeLine * 60 / 100;   // малый внутренний размер малой детали
game.pieceInnerSize = game.pieceInnerSizeLine * 2.5;       // большой внутреннй размер большой детали
$('#' + game.movingPieceId).css({width: game.pieceSize, height: game.pieceSize}).children().css({width: game.pieceSize, height: game.pieceSize}).attr({width: game.pieceSize, height: game.pieceSize});
					game.endMove(game.movingGroupId);      svg
*/
game.resize = function (){
	const newWidth = document.documentElement.clientWidth;
	const procent = (newWidth * 100 / game.widthResize) - 100;
	const sizeGroupItem = parseFloat($('[data-flag = true] > .piece').css('width'), 10);  // размер большой детали
	const sizeGroupItemLine = parseFloat($('[data-flag = false]').css('width'), 10);      // размер малой детали

	if (!isNaN(sizeGroupItemLine)){
		game.pieceSizeLine = (sizeGroupItemLine / 100 * procent) + game.pieceSizeLine;         // новый размер малой детали
		game.pieceInnerSizeLine = game.pieceSizeLine * 60 / 100;                               // новый малый внутренний размер
		switch (game.level){
			case 1:
				game.pieceSize = game.pieceSizeLine * 2.5;                                             // новый размер большой детали
				game.pieceInnerSize = game.pieceInnerSizeLine * 2.5;                                   // новый большой внутреннй размер большой детали
				break;
			case 2:
				game.pieceSize = game.pieceSizeLine * 1.5;                                             // новый размер большой детали
				game.pieceInnerSize = game.pieceInnerSizeLine * 1.5;                                   // новый большой внутреннй размер большой детали
				break;
			case 3:
				game.pieceSize = game.pieceSizeLine * 1.2;                                             // новый размер большой детали
				game.pieceInnerSize = game.pieceInnerSizeLine * 1.2;                                   // новый большой внутреннй размер большой детали
				break;
			default:
				console.log(game.level);
				console.log(typeof game.level);
		}
	}else {
		game.pieceSize = (sizeGroupItem / 100 * procent) + game.pieceSize;                         // новый размер большой детали
		game.pieceInnerSize = game.pieceSize * 60 / 100;                                           // новый внутренний размер большой детали
	}

	if (!isNaN(sizeGroupItem)){
		$('[data-flag = true]').each((key, elem) => {
			$(elem).css({width: game.pieceSize, height: game.pieceSize}).children('.piece').css({width: game.pieceSize, height: game.pieceSize})
				.children().attr({width: game.pieceSize, height: game.pieceSize}).css({width: game.pieceSize, height: game.pieceSize});
		});
		$('[data-flag = true] > .piece').each((key, elem) => {
			const positionLeft = parseFloat($(elem).css('left'), 10);
			const positionTop = parseFloat($(elem).css('top'), 10);
			$(elem).css({left: (positionLeft / 100 * procent) + positionLeft, top: (positionTop / 100 * procent) + positionTop});
		});
	}
	$('[data-flag = false]').each((key, elem) => {
		$(elem).css({width: game.pieceSizeLine, height: game.pieceSizeLine}).children('.piece').css({width: game.pieceSizeLine, height: game.pieceSizeLine})
			.children().attr({width: game.pieceSizeLine, height: game.pieceSizeLine}).css({width: game.pieceSizeLine, height: game.pieceSizeLine});
	});

	$('.picture-box__img').css({width: game.pieceInnerSize * game.puzzleQuantity.columns + 'px', height: game.pieceInnerSize * game.puzzleQuantity.rows + 'px'});

	$('.image-help__img').css({width: game.pieceInnerSize * game.puzzleQuantity.columns + 'px', height: game.pieceInnerSize * game.puzzleQuantity.rows + 'px'});
	game.widthResize = newWidth;
	game.saveCookie();
};

game.resumGame = function (){
	const getSaveGame = JSON.parse(localStorage.getItem('puzzleGameCookie'));
	const {flag} = getSaveGame;
	const divResumGame = $('.content__resum');
	if (flag === true){
		divResumGame.css('display', 'flex');
	}else {
		divResumGame.css('display', 'none');
	}
};

game.cleanFiled = function (){
	$('.game-floor__puzzle-line').children().html('');
	$('.game-content__game').html('');
};

// game.strreplace = function (search, replace, str){
// 	return str.split(search).join(replace);
// };

// сохраняем значения игры
game.saveCookie = function (){
	const saveGame = {};
	saveGame.flag = game.saveGame;
	saveGame.filename = game.imageName;
	saveGame.level = game.level;
	saveGame.zIndex = game.zIndex;
	saveGame.pieceSize = game.pieceSize;
	saveGame.pieceSizeLine = game.pieceSizeLine;
	saveGame.pieceInnerSize = game.pieceInnerSize;
	saveGame.pieceInnerSizeLine = game.pieceInnerSizeLine;
	saveGame.screenWidth = document.documentElement.clientWidth;
	saveGame.imageGame = game.imageGame;
	saveGame.itmeSize = game.itmeSize;
	saveGame.elemDataFlagFalse = $('.game-floor__puzzle-line').children().html();
	// saveGame.elemDataFlagFalse = game.strreplace(game.imageName, ' ', saveGame.elemDataFlagFalse);
	saveGame.elemDataFlagTrue = $('.game-content__game').html();
	// saveGame.elemDataFlagTrue = game.strreplace(game.imageName, ' ', saveGame.elemDataFlagTrue);
	localStorage.setItem('puzzleGameCookie', JSON.stringify(saveGame));
};


/*
game.time;
window.onresize = function (){
	// alert('не изменяй разрешение экрана во время игры');
	if (game.time){
		clearTimeout(game.time);
	}
	game.time = setTimeout(function (){
		game.resize();
	}, 700);
};
*/
