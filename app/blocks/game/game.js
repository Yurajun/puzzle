import Cookies from 'js-cookie';

const game = {};
export default game;

game.randomInteger = function(low, high) {
	return low + Math.round(Math.random() * (high - low));
};

game.between = function(num, low, high) {
	return num >= low && num <= high;
};

game.extactTouchPoint = function(e) {
	if (typeof e.pageX === 'undefined') {
		game.touchX =
			e.originalEvent.touches[0].pageX ||
			e.originalEvent.changedTouches[0].pageX;
		// console.log('und');
	} else {
		game.touchX = e.pageX;
	}
	if (typeof e.pageY === 'undefined') {
		game.touchY =
			e.originalEvent.touches[0].pageY ||
			e.originalEvent.changedTouches[0].pageY;
	} else {
		game.touchY = e.pageY;
	}
	return true;
};

game.createPuzzleItem = function() {
	let w = 0;
	let str = '';
	let puzzleItmes = [];
	const row = []; // vert
	for (let i = 0; i < game.puzzleQuantity.columns; i++) {
		const arrRows = [];
		for (let j = 0; j < game.puzzleQuantity.rows; j++) {
			const sign = Math.random() < 0.5 ? -1 : 1;
			if (j === 0) {
				arrRows.push([0, sign]);
			} else if (game.puzzleQuantity.rows - 1 === j) {
				const itemSign = arrRows[j - 1][1];
				arrRows.push([itemSign * -1, 0]);
			} else {
				const itemSign = arrRows[j - 1][1];
				arrRows.push([itemSign * -1, sign]);
			}
		}
		row.push(arrRows);
	}
	const col = [];
	for (let j = 0; j < game.puzzleQuantity.rows; j++) {
		const arrColumns = [];
		for (let i = 0; i < game.puzzleQuantity.columns; i++) {
			const sign = Math.random() < 0.5 ? -1 : 1;
			if (i === 0) {
				arrColumns.push([0, sign]);
			} else if (game.puzzleQuantity.columns - 1 === i) {
				const itemSign = arrColumns[i - 1][1];
				arrColumns.push([itemSign * -1, 0]);
			} else {
				const itemSign = arrColumns[i - 1][1];
				arrColumns.push([itemSign * -1, sign]);
			}
		}
		col.push(arrColumns);
	}
	// console.dir(row);
	// console.dir(arrColumns);
	for (let i = 1; i <= game.puzzleQuantity.rows; i++) {
		for (let j = 1; j <= game.puzzleQuantity.columns; j++) {
			const n = (i - 1) * game.puzzleQuantity.columns + j;
			// console.log(game.image);
			const svg = game.createPuzzle(
				game.image,
				++w,
				game.itmeSize,
				row[j - 1][i - 1],
				col[i - 1][j - 1]
			);
			str =
				'<div data-flag="false" data-one="false" data-group="false" class="group" id="group-' +
				n +
				'" style="width:' +
				game.pieceSizeLine +
				'px; height:' +
				game.pieceSizeLine +
				'px;"><div class="piece" id="piece-' +
				i +
				'-' +
				j +
				'" style="width:' +
				game.pieceSizeLine +
				'px; height:' +
				game.pieceSizeLine +
				'px;">' +
				svg +
				'</div></div>';
			puzzleItmes.push(str);
		}
	}
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
	str = '';
	for (let i = 0; i < puzzleItmes.length; i++) {
		str += puzzleItmes[i];
	}
	const newdiv = document.createElement('div');
	newdiv.innerHTML = str;
	const gameFloorPuzzleLine = document.querySelector(
		'.game-floor__puzzle-line'
	);
	gameFloorPuzzleLine.appendChild(newdiv);
	$('[data-flag = false] > .piece')
		.children()
		.each((key, elem) => {
			$(elem)
				.attr('height', game.pieceSizeLine)
				.css('height', game.pieceSizeLine);
			$(elem)
				.attr('width', game.pieceSizeLine)
				.css('width', game.pieceSizeLine);
			// console.log($(elem));
		});
	setTimeout(function() {
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
game.touchDevice = function() {
	try {
		document.createEvent('TouchEvent');
		// Отменять перетаскивание, когда приложение возобновляется с фона
		document.addEventListener('resumed', function() {
			game.moving = false;
			game.movingGroupId = false;
		});
		document.addEventListener(
			'touchmove',
			function(event) {
				event.preventDefault();
			},
			true
		);
	} catch (err) {
		isTouchDevice = false;
	}

	game.touchStartEvent = isTouchDevice ? 'touchstart' : 'mousedown';
	game.touchMoveEvent = isTouchDevice ? 'touchmove' : 'mousemove';
	game.touchEndEvent = isTouchDevice ? 'touchend' : 'mouseup';
	game.touchStartX = 0;
	game.touchStartY = 0;
	game.movingGroupStartX = 0;
	game.movingGroupStartY = 0;
};

game.getPuzzleQuantity = function(sideWidth, width, height) {
	const quantity = {}; // создаем новый объект
	quantity.columns = Math.floor(width / sideWidth); // количество колонок
	quantity.rows = Math.floor(height / sideWidth); // количество строк
	quantity.width = quantity.columns * sideWidth;
	quantity.height = quantity.rows * sideWidth;
	quantity.segments = quantity.columns * quantity.rows;
	quantity.size = sideWidth;
	return quantity;
};

/* eslint complexity: ["error", 25] */
game.getBorder = function(rows, column) {
	const rowS = parseInt(rows[0], 10);
	const rowE = parseInt(rows[1], 10);
	const colS = parseInt(column[0], 10);
	const colE = parseInt(column[1], 10);
	const b = {
		top: {
			smooth: 'M50,50',
			outside:
				'M50,50 110,47 C115,40 115,35 110,30 105,25 95,1 125,1 155,1 145,25 140,30 135,35 135,40 140,47',
			inside:
				'M50,50 110,53 C115,60 115,65 110,70 105,75 95,100 125,100 155,100 145,75 140,70 135,65 135,60 140,53'
		},
		right: {
			smooth: ' L200,50',
			outside:
				' L200,50 203,110 C210,115 215,115 220,110 225,105 249,95 249,125 249,155 225,145 220,140 215,135 210,135 203,140',
			inside:
				' L200,50 197,110 C190,115 185,115 180,110 175,105 151,95 151,125 151,155 175,145 180,140 185,135 190,135 197,140'
		},
		bottom: {
			smooth: ' L200,200',
			outside:
				' L200,200 140,203 C135,210 135,215 140,220 145,225 155,249 125,249 95,249 105,225 110,220 115,215 115,210 110,203',
			inside:
				' L200,200 140,197 C135,190 135,185 140,180 145,175 155,151 125,151 95,151 105,175 110,180 115,185 115,190 110,197'
		},
		left: {
			smooth: ' L50,200z',
			outside:
				' L50,200 47,140 C40,135 35,135 30,140 25,145 1,155 1,125 1,95 25,105 30,110 35,115 40,115 47,110z',
			inside:
				' L50,200 53,140 C60,135 65,135 70,140 75,145 99,155 99,125 99,95 75,105 70,110 65,115 60,115 53,110z'
		}
	};
	const border = {};
	// TOP // console.log(puzzleQuantity); // Object {columns: 4, rows: 3, width: 464, height: 348, segments: 15, size: 116}
	// console.log(position);
	if (rowS === 0) {
		// 1, 2, 3
		border.top = b.top.smooth;
	} else if (rowS === -1) {
		border.top = b.top.inside;
	} else {
		border.top = b.top.outside;
	}
	// RIGHT
	if (colE === 0) {
		// 1, 2, 3
		border.right = b.right.smooth;
	} else if (colE === -1) {
		border.right = b.right.inside;
	} else {
		border.right = b.right.outside;
	}
	// BOTTOM
	if (rowE === 0) {
		// 1, 2, 3
		border.bottom = b.bottom.smooth;
	} else if (rowE === -1) {
		border.bottom = b.bottom.inside;
	} else {
		border.bottom = b.bottom.outside;
	}
	// LEFT
	if (colS === 0) {
		// 1, 2, 3
		border.left = b.left.smooth;
	} else if (colS === -1) {
		border.left = b.left.inside;
	} else {
		border.left = b.left.outside;
	}
	return border;
};

game.createPuzzle = function(
	imageObj,
	puzzleNumber,
	puzzleSize,
	rows,
	columns
) {
	const imageScale = 1 * (150 / puzzleSize); // 1.293103448275862
	const borderSize = 50 * (puzzleSize / 150); // 38.666666666666664

	const position = {};
	position.isFirst = puzzleNumber === 1; // true   11- false
	position.isLast = puzzleNumber === game.puzzleQuantity.segments;
	position.row =
		Math.floor((puzzleNumber - 1) / game.puzzleQuantity.columns) + 1; // 1, 2, 3
	position.column =
		puzzleNumber - (position.row - 1) * game.puzzleQuantity.columns; // 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4
	const border = game.getBorder(rows, columns);
	// const src = './assets/img-game/05.jpg';
	// let src = imageObj.src.lastIndexOf('/');
	// src = imageObj.src.slice(src);
	// const src2 = './assets/img-game/05.jpg';

	// Create svg
	const svg =
		'<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" class="piece-svg_start"' +
		'width="' +
		(puzzleSize + borderSize * 2) +
		'px" height="' +
		(puzzleSize + borderSize * 2) +
		'px" version="1.1"' +
		'class="puzzle" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 250 250">' +
		'<defs><filter id="filter" x="0" y="0">' +
		'<feGaussianBlur stdDeviation="1" /></feGaussianBlur>' +
		'<feOffset dx="1" dy="1" /></feOffset>' +
		'</filter>' +
		'</defs>' +
		'<clipPath id="path' +
		puzzleNumber +
		'">' +
		'<path d="' +
		border.top +
		border.right +
		border.bottom +
		border.left +
		'"></path>' +
		'</clipPath>' +
		'<g>' + // '<g stroke="white" stroke-width="1" stroke-opacity="0" >'
		'<g style="clip-path:url(#path' +
		puzzleNumber +
		')">' +
		'<image xlink:href="' +
		imageObj.src +
		'" x="' +
		(50 - (position.column - 1) * 150) +
		// '<image xlink:href="assets/img-game' + src + '" x="' + (50 - (position.column - 1) * 150) +
		'" y="' +
		(50 - (position.row - 1) * 150) +
		'" width="' +
		imageObj.naturalWidth * imageScale +
		'" height="' +
		imageObj.naturalHeight * imageScale +
		'"></image>' +
		'</g>' +
		'<path filter="url(#filter)" class="puzzle-border" fill="transparent" d="' +
		border.top +
		border.right +
		border.bottom +
		border.left +
		'"></path>' +
		'</g>' +
		'</svg>';
	// console.log(imageObj.src);
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

game.base64ToArrayBuffer = function(base64) {
	const binaryString = window.atob(base64);
	const len = binaryString.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	return bytes.buffer;
};
game.arrayBufferToUrl = function(ArrayBuffer, imgType) {
	const blob = new Blob([ArrayBuffer], {type: imgType});
	const urlCreator = window.URL || window.webkitURL;
	const imageUrl = urlCreator.createObjectURL(blob);
	return imageUrl;
};

game.load = function(
	filename,
	level,
	saveGameFlag,
	saveGameFlagPiople,
	flagPeoptleGameImg
) {
	game.solved = false;
	game.pixelRatio = window.devicePixelRatio === 2 ? 2 : 1;
	game.level = level;
	game.loadGame = true;
	game.saveGame = saveGameFlagPiople;
	game.imagesLeftToDownload = game.rows * game.columns;
	game.size = game.columns + 'x' + game.rows;
	game.flagPeoptleGameImg = flagPeoptleGameImg;
	// отбираем элеметы для работы
	game.gameCompliteImg = $('.game-complite__img');
	game.pictureBoxImg = $('.picture-box__img');
	game.imageHelpImg = $('.image-help__img');
	game.gameFloorPuzzleLine = $('.game-floor__puzzle-line');
	// --------------------------------------------------
	if (game.flagPeoptleGameImg) {
		// console.log(filename);
		game.base64 = filename;
		const savedImgArray = filename.split(';base64,');
		const arrayBufferImg = game.base64ToArrayBuffer(savedImgArray[1]);
		game.imageName = game.arrayBufferToUrl(
			arrayBufferImg,
			savedImgArray[0].replace('data:', '')
		);
	} else {
		// console.log(filename);
		game.imageName = filename;
	}

	game.image = new Image();
	game.image.src = game.imageName;
	game.pieceSizeLine =
		$('.game-floor').height() - ($('.game-floor').height() / 100) * 5; // малый размер детали
	game.image.onload = function() {
		const imageWidth = game.image.width / game.pixelRatio;
		const imageHeight = game.image.height / game.pixelRatio;
		switch (game.level) {
			case 1:
				game.itmeSize = Math.floor(imageHeight / 3);
				game.pieceSize = game.pieceSizeLine * 3.1; // большой размер детали
				game.pieceInnerSizeLine = (game.pieceSizeLine * 60) / 100; // малый внутренний размер малой детали
				game.pieceInnerSize = game.pieceInnerSizeLine * 3.1; // большой внутреннй размер большой детали
				break;
			case 2:
				game.itmeSize = Math.floor(imageHeight / 5);
				game.pieceSize = game.pieceSizeLine * 1.9; // большой размер детали
				game.pieceInnerSizeLine = (game.pieceSizeLine * 60) / 100; // малый внутренний размер малой детали
				game.pieceInnerSize = game.pieceInnerSizeLine * 1.9; // большой внутреннй размер большой детали
				break;
			case 3:
				game.itmeSize = Math.floor(imageHeight / 7);
				game.pieceSize = game.pieceSizeLine * 1.37; // большой размер детали
				game.pieceInnerSizeLine = (game.pieceSizeLine * 60) / 100; // малый внутренний размер малой детали
				game.pieceInnerSize = game.pieceInnerSizeLine * 1.37; // большой внутреннй размер большой детали
				break;
			default:
			// console.log(game.level);
			// console.log(typeof game.level);
		}

		game.puzzleQuantity = game.getPuzzleQuantity(
			game.itmeSize,
			imageWidth,
			imageHeight
		);

		$(game.pictureBoxImg).css({
			width: game.pieceInnerSize * game.puzzleQuantity.columns + 'px',
			height: game.pieceInnerSize * game.puzzleQuantity.rows + 'px'
		});
		$(game.imageHelpImg).css({
			width: game.pieceInnerSize * game.puzzleQuantity.columns + 'px',
			height: game.pieceInnerSize * game.puzzleQuantity.rows + 'px',
			'background-image': 'url(' + game.imageName + ')',
			'background-size': 'cover'
		});
		// pictureBoxHelp.css({});

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
		game.zIndex = 1002;
		game.zIndexGroup = 2;

		$(game.gameFloorPuzzleLine).css('left', game.pieceSizeLine);
		$(game.gameFloorPuzzleLine).prop('left', game.pieceSizeLine);

		// Определить, поддерживает ли устройство сенсорные события
		game.touchDevice();
		// Создаем кусочки и помещаем их в puzzle-line
		game.createPuzzleItem();

		if (saveGameFlag) {
			game.cleanFiled();
			game.startSaveGame();
			// console.log($('.piece image'));
		} else {
			game.touchGameEventPlay();
		}
	};
	// game.dragStart();.css({width: game.pieceSize, height: game.pieceSize})
};

game.touchGameEventPlay = function() {
	function getCurrentTarget(event) {
		let hoverElem;
		if (
			navigator.userAgent.match('MSIE') ||
			navigator.userAgent.match('Gecko')
		) {
			hoverElem = document.elementFromPoint(event.clientX, event.clientY);
		} else {
			hoverElem = document.elementFromPoint(event.pageX, event.pageY);
		}
		return $(hoverElem);
	}
	$('.piece > svg').on(game.touchStartEvent, function(e, param) {
		if (
			$(this)
				.closest('.group')
				.attr('data-flag') === 'false'
		) {
			// console.log('start', e.target);
			e.stopPropagation();
			e.preventDefault();
			game.extactTouchPoint(e); // game.touchX = e.pageX; game.touchY = e.pageY;
			game.moving = true;
			game.movingGroupId = $(this)
				.closest('.group')
				.prop('id');
			game.pieceInBody = $(this)
				.closest('.group')
				.attr('data-flag');
			game.movingPieceId = $(this)
				.closest('.piece')
				.prop('id');
			game.touchStartX = game.touchX;
			game.touchStartY = game.touchY;
			game.movingGroupStartX = $(this)
				.closest('.group')
				.offset().left;
			game.movingGroupStartY = $(this)
				.closest('.group')
				.offset().top;
			if ($('#' + game.movingGroupId).attr('data-group') === 'false') {
				$('#' + game.movingGroupId).css({'z-index': game.zIndex++});
			} else {
				$('#' + game.movingGroupId).css({
					'z-index': game.zIndexGroup++
				});
			}
			if (
				$(this)
					.closest('.group')
					.children().length < 2
			) {
				game.svgShodow = $(this)
					.closest('.group')
					.find('.piece-svg_start');
				$(game.svgShodow).addClass('piece-svg_move');
			}
		} else {
			if (e.stopPropagation) {
				e.stopPropagation();
			}
			if (e.target.tagName === 'svg') {
				// const path = 'jj';
			}
			// e.preventDefault();
			e.cancelBubble = true;
			// console.log('param: ', param);
			// console.log('e.target: ', $(e.target));
			// console.log('true, false', $(e.target).hasClass('puzzle-border'));
			if (param) {
				e.clientX = param.clientX;
				e.clientY = param.clientY;
				e.pageX = param.pageX;
				e.pageY = param.pageY;
				// console.log(param);
			} else {
				game.extactTouchPoint(e);
				e.clientX = game.touchX;
				e.clientY = game.touchY;
				// e.pageX = param.pageX;
				// e.pageY = param.pageY;
			}
			// game.extactTouchPoint(param); // game.touchX = e.pageX; game.touchY = e.pageY;
			if ($(e.target).hasClass('puzzle-border')) {
				if (
					$(this)
						.closest('.group')
						.attr('data-group') === 'false'
				) {
					// console.log('dvig odin');
					game.moving = true;
					game.movingGroupId = $(this)
						.closest('.group')
						.prop('id');
					game.pieceInBody = $(this)
						.closest('.group')
						.attr('data-flag');
					game.movingPieceId = $(this)
						.closest('.piece')
						.prop('id');
					game.touchStartX = game.touchX;
					game.touchStartY = game.touchY;
					game.movingGroupStartX = $(this)
						.closest('.group')
						.offset().left;
					game.movingGroupStartY = $(this)
						.closest('.group')
						.offset().top;
					if (
						$('#' + game.movingGroupId).attr('data-group') ===
						'false'
					) {
						$('#' + game.movingGroupId).css({
							'z-index': game.zIndex++
						});
					} else {
						$('#' + game.movingGroupId).css({
							'z-index': game.zIndexGroup++
						});
					}
					// console.log($('.group').find('[data-group=false]'));// .find('');// 'data-flag': 'true'}));// .find.css({'z-index': game.zIndex++});
					// $('.group').each((key, elem) => {
					// 	$(elem).css({'z-index': game.zIndex++});
					// 	console.log($(elem));
					// });
					if (
						$(this)
							.closest('.group')
							.children().length < 2
					) {
						game.svgShodow = $(this)
							.closest('.group')
							.find('.piece-svg_start');
						$(game.svgShodow).addClass('piece-svg_move');
					}
				} else {
					// console.log('dviga group');
					game.moving = true;
					game.movingGroupId = $(this)
						.closest('.group')
						.prop('id');
					game.pieceInBody = $(this)
						.closest('.group')
						.attr('data-flag');
					game.movingPieceId = $(this)
						.closest('.piece')
						.prop('id');
					game.touchStartX = game.touchX;
					game.touchStartY = game.touchY;
					game.movingGroupStartX = $(this)
						.closest('.group')
						.offset().left;
					game.movingGroupStartY = $(this)
						.closest('.group')
						.offset().top;
					if (
						$('#' + game.movingGroupId).attr('data-group') ===
						'false'
					) {
						$('#' + game.movingGroupId).css({
							'z-index': game.zIndex++
						});
					} else {
						$('#' + game.movingGroupId).css({
							'z-index': game.zIndexGroup++
						});
					}
					// console.log($('.group').find('[data-group=false]'));// .find('');// 'data-flag': 'true'}));// .find.css({'z-index': game.zIndex++});
					// $('.group').each((key, elem) => {
					// 	$(elem).css({'z-index': game.zIndex++});
					// 	console.log($(elem));
					// });
					return false;
				}
			} else if (
				$(this)
					.closest('.group')
					.attr('data-group') === 'true'
			) {
				// console.log('dviga group eles if');
				game.moving = true;
				game.movingGroupId = $(this)
					.closest('.group')
					.prop('id');
				game.pieceInBody = $(this)
					.closest('.group')
					.attr('data-flag');
				game.movingPieceId = $(this)
					.closest('.piece')
					.prop('id');
				game.touchStartX = game.touchX;
				game.touchStartY = game.touchY;
				game.movingGroupStartX = $(this)
					.closest('.group')
					.offset().left;
				game.movingGroupStartY = $(this)
					.closest('.group')
					.offset().top;
				if (
					$('#' + game.movingGroupId).attr('data-group') === 'false'
				) {
					$('#' + game.movingGroupId).css({'z-index': game.zIndex++});
				} else {
					$('#' + game.movingGroupId).css({
						'z-index': game.zIndexGroup++
					});
				}
			} else {
				$(this)
					.closest('.group')
					.css('display', 'none');
				const newTarget = getCurrentTarget(e); // возвращает элемент под кликом
				// console.log(newTarget);
				// console.log(e);
				newTarget.trigger(game.touchStartEvent, e); //
				$(this)
					.closest('.group')
					.css('display', '');
			}
		}
		return false;
	});
	/*	$('.piece').on(game.touchStartEvent, function (e){
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
		if ($('#' + game.movingGroupId).attr('data-group') === 'false'){
			$('#' + game.movingGroupId).css({'z-index': game.zIndex++});
		}else {
			$('#' + game.movingGroupId).css({'z-index': game.zIndexGroup++});
		}
		// console.log($('.group').find('[data-group=false]'));// .find('');// 'data-flag': 'true'}));// .find.css({'z-index': game.zIndex++});
		// $('.group').each((key, elem) => {
		// 	$(elem).css({'z-index': game.zIndex++});
		// 	console.log($(elem));
		// });
		if ($(this).closest('.group').children().length < 2){
			game.svgShodow = $(this).find('.piece-svg_start');
			$(game.svgShodow).addClass('piece-svg_move');
		}
	});*/

	$('body').on(game.touchMoveEvent, function(e) {
		if (!game.moving) {
			return false;
		}

		e.stopPropagation();
		e.preventDefault();
		game.extactTouchPoint(e); // game.touchX = e.pageX; game.touchY = e.pageY;
		game.moving = false;

		let newX;
		let newY;
		game.maxHeight = document
			.querySelector('.game-floor')
			.getBoundingClientRect().top;
		// && $('#' + game.movingGroupId).attr('data-one') === 'false'

		const dataFlag = $('#' + game.movingGroupId).attr('data-flag');
		const dataOne = $('#' + game.movingGroupId).attr('data-one');
		const dataGroup = $('#' + game.movingGroupId).attr('data-group');
		if (game.touchY < game.maxHeight) {
			newX = game.movingGroupStartX + (game.touchX - game.touchStartX);
			newY = game.movingGroupStartY + (game.touchY - game.touchStartY);

			if (dataFlag === 'true' && dataOne === 'true') {
				$('#' + game.movingPieceId)
					.css({width: game.pieceSize, height: game.pieceSize})
					.children()
					.css({width: game.pieceSize, height: game.pieceSize})
					.attr({width: game.pieceSize, height: game.pieceSize});
				game.moveElement(game.movingGroupId, newX, newY, function() {
					game.moving = true;
				});
			} else if (dataFlag === 'false' && dataOne === 'false') {
				// console.log('false  false');
				newX =
					game.movingGroupStartX -
					(game.pieceSize - game.pieceSizeLine) / 2 +
					(game.touchX - game.touchStartX);
				newY =
					game.movingGroupStartY -
					(game.pieceSize - game.pieceSizeLine) / 2 +
					(game.touchY - game.touchStartY);
				game.moveElement(game.movingGroupId, newX, newY, function() {
					game.moving = true;
				});
				$('#' + game.movingPieceId)
					.css({width: game.pieceSize, height: game.pieceSize})
					.children()
					.css({width: game.pieceSize, height: game.pieceSize})
					.attr({width: game.pieceSize, height: game.pieceSize});
				game.endMove(game.movingGroupId); // data-flag = true
			} else if (dataFlag === 'true' && dataOne === 'false') {
				newX =
					game.movingGroupStartX -
					(game.pieceSize - game.pieceSizeLine) / 2 +
					(game.touchX - game.touchStartX);
				newY =
					game.movingGroupStartY -
					(game.pieceSize - game.pieceSizeLine) / 2 +
					(game.touchY - game.touchStartY);
				$('#' + game.movingPieceId)
					.css({width: game.pieceSize, height: game.pieceSize})
					.children()
					.css({width: game.pieceSize, height: game.pieceSize})
					.attr({width: game.pieceSize, height: game.pieceSize});
				game.moveElement(game.movingGroupId, newX, newY, function() {
					game.moving = true;
				});
			}
		} else {
			newX = game.touchX - game.touchStartX;
			newY = game.touchY - game.touchStartY;

			if (
				dataFlag === 'false' &&
				dataOne === 'false' &&
				dataGroup === 'false'
			) {
				game.moveElement(game.movingPieceId, newX, newY, function() {
					game.moving = true;
				});
			} else if (
				dataFlag === 'true' &&
				dataOne === 'false' &&
				dataGroup === 'false'
			) {
				newX =
					game.movingGroupStartX + (game.touchX - game.touchStartX);
				newY =
					game.movingGroupStartY + (game.touchY - game.touchStartY);
				$('#' + game.movingPieceId)
					.css({
						width: game.pieceSizeLine,
						height: game.pieceSizeLine
					})
					.children()
					.css({
						width: game.pieceSizeLine,
						height: game.pieceSizeLine
					})
					.attr({
						width: game.pieceSizeLine,
						height: game.pieceSizeLine
					});

				const newYCoord =
					game.maxHeight + ($(window).height() - game.maxHeight) / 2;
				const newXCoord = newX - game.pieceSizeLine;
				const elemHover = document.elementFromPoint(
					newXCoord,
					newYCoord
				);
				game.elemInsert = $(elemHover).closest('.group');

				game.moveElement(game.movingGroupId, newX, newY, function() {
					game.moving = true;
				});
			} else if (
				dataFlag === 'true' &&
				dataOne === 'true' &&
				dataGroup === 'false'
			) {
				newX =
					game.movingGroupStartX +
					(game.pieceSize - game.pieceSizeLine) / 2 +
					(game.touchX - game.touchStartX);
				newY =
					game.movingGroupStartY +
					(game.pieceSize - game.pieceSizeLine) / 2 +
					(game.touchY - game.touchStartY);
				$('#' + game.movingPieceId)
					.css({
						width: game.pieceSizeLine,
						height: game.pieceSizeLine
					})
					.children()
					.css({
						width: game.pieceSizeLine,
						height: game.pieceSizeLine
					})
					.attr({
						width: game.pieceSizeLine,
						height: game.pieceSizeLine
					});

				const newYCoord2 =
					game.maxHeight + ($(window).height() - game.maxHeight) / 2;
				const newXCoord2 = game.touchX - game.pieceSizeLine;
				const elemHover2 = document.elementFromPoint(
					newXCoord2,
					newYCoord2
				);
				game.elemInsert = $(elemHover2).closest('.group');

				game.moveElement(game.movingGroupId, newX, newY, function() {
					game.moving = true;
				});
			} else if (
				dataFlag === 'true' &&
				dataOne === 'true' &&
				dataGroup === 'true'
			) {
				newX =
					game.movingGroupStartX + (game.touchX - game.touchStartX);
				newY =
					game.movingGroupStartY + (game.touchY - game.touchStartY);
				game.moveElement(game.movingGroupId, newX, newY, function() {
					game.moving = true;
				});
			}
		}
	});

	$('body').on(game.touchEndEvent, function() {
		// game.endMove(game.movingGroupId);
		if ($('#' + game.movingGroupId).attr('data-flag') === 'true') {
			$('#' + game.movingGroupId).attr('data-one', 'true');
			const group = $('#' + game.movingGroupId);
			group.children('.piece').each(function() {
				game.moveElement(
					$(this).prop('id'),
					$(this).offset().left,
					$(this).offset().top
				);
			});
			game.moveElement(game.movingGroupId, 0, 0);
			$(game.svgShodow).removeClass('piece-svg_move');

			if (!game.solved) {
				if (game.touchY < game.maxHeight) {
					// game.sounEffect('puzzleSound.wav', 'puzzleSound.mp3', 'puzzleSound.ogg', '0.1');
					if (game.soundPu.flag !== false) {
						game.soundPu.play();
						game.soundPu.volume = '0.1';
					}
					group.children('.piece').each(function() {
						const positionIStart = $(this)
							.attr('id')
							.indexOf('-');
						const positionIEnd = $(this)
							.attr('id')
							.lastIndexOf('-');
						const i = parseInt(
							$(this)
								.attr('id')
								.slice(positionIStart + 1, positionIEnd),
							10
						);
						const j = parseInt(
							$(this)
								.attr('id')
								.slice(positionIEnd + 1),
							10
						);

						// top neighbour верхний сосед
						game.checkCouple(
							$(this),
							'piece-' + (i - 1) + '-' + j,
							$(this).offset().left,
							$(this).offset().top - game.pieceInnerSize
						);

						// bottom neighbour нижний сосед
						game.checkCouple(
							$(this),
							'piece-' + (i + 1) + '-' + j,
							$(this).offset().left,
							$(this).offset().top + game.pieceInnerSize
						);

						// left neighbour левый сосед
						game.checkCouple(
							$(this),
							'piece-' + i + '-' + (j - 1),
							$(this).offset().left - game.pieceInnerSize,
							$(this).offset().top
						);

						// right neighbour правый сосед
						game.checkCouple(
							$(this),
							'piece-' + i + '-' + (j + 1),
							$(this).offset().left + game.pieceInnerSize,
							$(this).offset().top
						);

						// saveGame.flag = true;
						game.saveCookie();
						if (game.saveGame) {
							$('.content__resum').css('display', 'flex');
						} else {
							$('.content__resum').css('display', 'none');
						}
						// if only one group left: puzzle solved!
						if ($('.group').length === 1) {
							game.solved = true;
							game.saveGame = false;
							game.saveCookie();
							if (game.saveGame) {
								$('.content__resum').css('display', 'flex');
							} else {
								$('.content__resum').css('display', 'none');
							}
							// music game ---------------------
							game.sounEffect(
								'win.wav',
								'win.mp3',
								'win.ogg',
								'0.5'
							);
							// --------------------------------
							const inst = $(
								'[data-remodal-id="game-complite"]'
							).remodal();
							inst.open();
							$('.remodal__game-complite')
								.css({'margin-bottom': 0})
								.parent()
								.css({
									padding: 0,
									margin: 0,
									overflow: 'hidden'
								})
								.addClass('after-none');
							setTimeout(function() {
								$('.remodal-is-opened').css({
									filter: 'blur(0)'
								});
							}, 500);
							// console.log(game.imageName);
							const littleWidth =
								game.pieceInnerSize *
									game.puzzleQuantity.columns -
								((game.pieceInnerSize *
									game.puzzleQuantity.columns) /
									100) *
									30;
							const littleHeight =
								game.pieceInnerSize * game.puzzleQuantity.rows -
								((game.pieceInnerSize *
									game.puzzleQuantity.rows) /
									100) *
									30;
							$(game.gameCompliteImg).css({
								width: littleWidth + 'px',
								height: littleHeight + 'px',
								'background-image':
									'url(' + game.imageName + ')',
								'background-size': 'cover'
							});
							// window.URL = window.URL || window.webkitURL;
							// window.URL.revokeObjectURL(game.filePiepleGame);
							let inputFD = $('#file-download');
							inputFD.replaceWith(
								(inputFD = inputFD.val('').clone(true))
							);
							// game.solved = true;
							// $('.group:first').animate({left: 0, top: 0});
							// clearInterval(game.timer_interval);
							// $('#game-pause').hide();
							// $('#game-solved').show();
						}
					});
				} else if (
					$('#' + game.movingGroupId).attr('data-group') === 'false'
				) {
					// console.log($(game.elemInsert).attr('class'));
					// console.log($(game.elemInsert));
					$('#' + game.movingGroupId)
						.css({
							width: game.pieceSizeLine + 'px',
							height: game.pieceSizeLine + 'px',
							position: 'relative'
						})
						.attr('data-flag', 'false')
						.attr('data-one', 'false')
						.children('.piece')
						.css({left: 'auto', top: 'auto'});
					if ($(game.elemInsert).attr('class') === 'group') {
						$('#' + game.movingGroupId).insertAfter(
							$(game.elemInsert)
						);
						// game.sounEffect('puzzleStock.wav', 'puzzleStock.mp3', 'puzzleStock.ogg', '0.3');
						if (game.soundLi.flag !== false) {
							game.soundLi.play();
							game.soundLi.volume = '0.3';
						}
					} else {
						$('.game-floor__puzzle-line')
							.children()
							.prepend($('#' + game.movingGroupId));
					}
				} else if (game.soundPu.flag !== false) {
					// game.sounEffect('puzzleSound.wav', 'puzzleSound.mp3', 'puzzleSound.ogg', '0.1');
					game.soundPu.play();
					game.soundPu.volume = '0.1';
				}
			}
		} else {
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

game.soundClick = function() {
	game.soundCl = new Audio();
	if (game.soundCl.canPlayType('audio/mpeg;')) {
		game.soundCl.src = 'assets/musics/menuClick.mp3';
	} else if (game.soundCl.canPlayType('audio/wav;')) {
		game.soundCl.src = 'assets/musics/menuClick.wav';
	} else {
		game.soundCl.src = 'assets/musics/menuClick.ogg'; // Указываем путь к звуку "клика"
	}
};

game.soundPuzzle = function() {
	game.soundPu = new Audio();
	if (game.soundPu.canPlayType('audio/mpeg;')) {
		game.soundPu.src = 'assets/musics/puzzleSound.mp3';
	} else if (game.soundPu.canPlayType('audio/wav;')) {
		game.soundPu.src = 'assets/musics/puzzleSound.wav';
	} else {
		game.soundPu.src = 'assets/musics/puzzleSound.ogg'; // Указываем путь к звуку "клика"
	}
};

game.soundLine = function() {
	game.soundLi = new Audio();
	if (game.soundLi.canPlayType('audio/mpeg;')) {
		game.soundLi.src = 'assets/musics/puzzleStock.mp3';
	} else if (game.soundLi.canPlayType('audio/wav;')) {
		game.soundLi.src = 'assets/musics/puzzleStock.wav';
	} else {
		game.soundLi.src = 'assets/musics/puzzleStock.ogg'; // Указываем путь к звуку "клика"
	}
};

game.soundButtonError = function() {
	game.soundButtonLine = new Audio();
	if (game.soundButtonLine.canPlayType('audio/mpeg;')) {
		game.soundButtonLine.src = 'assets/musics/error.mp3';
	} else if (game.soundButtonLine.canPlayType('audio/wav;')) {
		game.soundButtonLine.src = 'assets/musics/error.wav';
	} else {
		game.soundButtonLine.src = 'assets/musics/error.ogg'; // Указываем путь к звуку "клика"
	}
};

game.soundPuzzleOk = function() {
	game.suondOk = new Audio();
	if (game.suondOk.canPlayType('audio/mpeg;')) {
		game.suondOk.src = 'assets/musics/puzzleOk.mp3';
	} else if (game.suondOk.canPlayType('audio/wav;')) {
		game.suondOk.src = 'assets/musics/puzzleOk.wav';
	} else {
		game.suondOk.src = 'assets/musics/puzzleOk.ogg'; // Указываем путь к звуку "клика"
	}
};

game.sounEffect = function(nameWav, nameMp3, nameOgg, volume) {
	const soundCookie2 = Cookies.get('puzzleSound');
	if (soundCookie2 === 'checked') {
		let audio = new Audio(); // Создаём новый элемент Audio
		// audio.autoplay = true; // Автоматически запускаем
		if (audio.canPlayType('audio/mpeg;')) {
			audio.src = 'assets/musics/' + nameMp3;
		} else if (audio.canPlayType('audio/wav;')) {
			audio.src = 'assets/musics/' + nameWav;
		} else {
			audio.src = 'assets/musics/' + nameOgg; // Указываем путь к звуку "клика"
		}
		audio.play();
		audio.volume = volume; // Громкость музыки
		audio.addEventListener('ended', function() {
			audio = {};
		});
	}
};

game.musicMenu = {};

game.soundBar = function(nameWav, nameMp3, nameOgg, volume) {
	const soundCookie2 = Cookies.get('puzzleSound');
	game.musicMenu = new Audio(); // Создаём новый элемент Audio

	if (game.musicMenu.canPlayType('audio/mpeg;')) {
		game.musicMenu.src = 'assets/musics/' + nameMp3;
	} else if (game.musicMenu.canPlayType('audio/wav;')) {
		game.musicMenu.src = 'assets/musics/' + nameWav;
	} else {
		game.musicMenu.src = 'assets/musics/' + nameOgg; // Указываем путь к звуку "клика"
	}
	game.musicMenu.volume = volume; // Громкость музыки
	game.musicMenu.loop = true;
	game.musicFlagOnOff = false;
	if (soundCookie2 === 'checked') {
		game.musicMenu.autoplay = true; // Автоматически запускаем
		game.musicFlagOnOff = true;
	} else {
		game.musicFlagOnOff = false;
		// game.musicMenu.stop();
		game.musicMenu.currentTime = 0;
	}
};

/*
game.startMove = function (elem){
	$('#' + elem)
		.children('.piece').css({position: 'absolute'});
	// $('.game-content').append($('#' + elem));
};*/
game.endMove = function(elem) {
	$('.game-content__game').append($('#' + elem));
	$('#' + elem)
		.css({width: 0, height: 0, position: 'absolute'})
		.attr('data-flag', 'true')
		.children('.piece')
		.css({left: '0', top: '0'});
	// $('.game-content').append($('#' + elem));
};

game.moveElement = function(id, x, y, callback) {
	$('#' + id).css({left: x + 'px', top: y + 'px'});
	if (typeof callback !== 'undefined') {
		callback();
	}
};
game.moveElementFooter = function(id, x, y) {
	$('#' + id)
		.children('.piece')
		.css({left: x, top: y});
};

game.checkCouple = function(source, targetId, x, y) {
	const target = $('.group[id!=' + game.movingGroupId + '] > #' + targetId);
	if (
		target.length && // Сосед не находится в одной группе
		game.between(
			target.offset().left,
			x - game.proximity,
			x + game.proximity
		) &&
		game.between(
			target.offset().top,
			y - game.proximity,
			y + game.proximity
		) // Сосед достаточно близко
	) {
		const offsetX = x - target.offset().left;
		const offsetY = y - target.offset().top;
		const targetGroup = target.parent();
		targetGroup.children('.piece').each(function() {
			game.moveElement(
				$(this).prop('id'),
				$(this).offset().left + offsetX,
				$(this).offset().top + offsetY
			);
			$('#' + game.movingGroupId).append($(this));
			$('#' + game.movingGroupId).attr('data-group', 'true');
		});
		// game.sounEffect('puzzleOk.wav', 'puzzleOk.mp3', 'puzzleOk.ogg', '0.4');
		if (game.suondOk.flag !== false) {
			game.suondOk.play();
			game.suondOk.volume = '0.3';
		}
		$(game.svgShodow)
			.closest('.group')
			.children()
			.each((key, elem) => {
				$(elem)
					.find('.piece-svg_start')
					.removeClass('piece-svg_start')
					.removeClass('piece-svg_move')
					.addClass('piece-svg_end');
			});
		$('.game-content__game')
			.find('[data-group=false]')
			.each((k, el) => {
				$(el).css({'z-index': game.zIndex++});
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
/**
 * Изменяет размер всех деталей, картинок при изменении ширины экрана
 * @return undefined
 */
game.resize = function() {
	const newWidth = document.documentElement.clientWidth;
	const procent = (newWidth * 100) / game.widthResize - 100;
	const sizeGroupItem = parseFloat(
		$('[data-flag = true] > .piece').css('width'),
		10
	); // размер большой детали
	const sizeGroupItemLine = parseFloat(
		$('[data-flag = false]').css('width'),
		10
	); // размер малой детали

	if (!isNaN(sizeGroupItemLine)) {
		game.pieceSizeLine =
			(sizeGroupItemLine / 100) * procent + game.pieceSizeLine; // новый размер малой детали
		game.pieceInnerSizeLine = (game.pieceSizeLine * 60) / 100; // новый малый внутренний размер
		switch (game.level) {
			case 1:
				game.pieceSize = game.pieceSizeLine * 3.1; // 2.5 новый размер большой детали
				game.pieceInnerSize = game.pieceInnerSizeLine * 3.1; // новый большой внутреннй размер большой детали
				break;
			case 2:
				game.pieceSize = game.pieceSizeLine * 1.9; // 1.5 новый размер большой детали
				game.pieceInnerSize = game.pieceInnerSizeLine * 1.9; // новый большой внутреннй размер большой детали
				break;
			case 3:
				game.pieceSize = game.pieceSizeLine * 1.37; // 1.2 новый размер большой детали
				game.pieceInnerSize = game.pieceInnerSizeLine * 1.37; // новый большой внутреннй размер большой детали
				break;
			default:
			// console.log(game.level);
			// console.log(typeof game.level);
		}
	} else {
		game.pieceSize = (sizeGroupItem / 100) * procent + game.pieceSize; // новый размер большой детали
		game.pieceInnerSize = (game.pieceSize * 60) / 100; // новый внутренний размер большой детали
	}

	if (!isNaN(sizeGroupItem)) {
		$('[data-flag = true]').each((key, elem) => {
			$(elem)
				.css({width: game.pieceSize, height: game.pieceSize})
				.children('.piece')
				.css({width: game.pieceSize, height: game.pieceSize})
				.children()
				.attr({width: game.pieceSize, height: game.pieceSize})
				.css({width: game.pieceSize, height: game.pieceSize});
		});
		$('[data-flag = true] > .piece').each((key, elem) => {
			const positionLeft = parseFloat($(elem).css('left'), 10);
			const positionTop = parseFloat($(elem).css('top'), 10);
			$(elem).css({
				left: (positionLeft / 100) * procent + positionLeft,
				top: (positionTop / 100) * procent + positionTop
			});
		});
	}
	$('[data-flag = false]').each((key, elem) => {
		$(elem)
			.css({width: game.pieceSizeLine, height: game.pieceSizeLine})
			.children('.piece')
			.css({width: game.pieceSizeLine, height: game.pieceSizeLine})
			.children()
			.attr({width: game.pieceSizeLine, height: game.pieceSizeLine})
			.css({width: game.pieceSizeLine, height: game.pieceSizeLine});
	});

	$(game.pictureBoxImg).css({
		width: game.pieceInnerSize * game.puzzleQuantity.columns + 'px',
		height: game.pieceInnerSize * game.puzzleQuantity.rows + 'px'
	});

	$(game.imageHelpImg).css({
		width: game.pieceInnerSize * game.puzzleQuantity.columns + 'px',
		height: game.pieceInnerSize * game.puzzleQuantity.rows + 'px'
	});

	const littleWidth =
		game.pieceInnerSize * game.puzzleQuantity.columns -
		((game.pieceInnerSize * game.puzzleQuantity.columns) / 100) * 30;
	const littleHeight =
		game.pieceInnerSize * game.puzzleQuantity.rows -
		((game.pieceInnerSize * game.puzzleQuantity.rows) / 100) * 30;
	$(game.gameCompliteImg).css({
		width: littleWidth + 'px',
		height: littleHeight + 'px'
	});

	const lineCssLeft = parseInt($(game.gameFloorPuzzleLine).css('left'), 10);
	const linePropLeft = parseInt($(game.gameFloorPuzzleLine).prop('left'), 10);
	$(game.gameFloorPuzzleLine).css(
		'left',
		(lineCssLeft / 100) * procent + lineCssLeft
	);
	$(game.gameFloorPuzzleLine).prop(
		'left',
		(linePropLeft / 100) * procent + linePropLeft
	);
	game.widthResize = newWidth;
	game.saveCookie();
};
/*
game.resumGame = function (){
	const getSaveGame = JSON.parse(localStorage.getItem('puzzleGameCookie'));
	const {flag} = getSaveGame;
	const divResumGame = $('.content__resum');
	if (flag === true){
		divResumGame.css('display', 'flex');
	}else {
		divResumGame.css('display', 'none');
	}
};*/

game.cleanFiled = function() {
	$('.game-floor__puzzle-line').html('');
	$('.game-content__game').html('');
};

game.strreplace = function(search, replace, str) {
	return str.split(search).join(replace);
};

// сохраняем значения игры
game.saveCookie = function() {
	const saveGame = {};
	saveGame.flag = game.saveGame;
	saveGame.filename = game.imageName;
	saveGame.level = game.level;
	saveGame.zIndex = game.zIndex;
	saveGame.zIndexGroup = game.zIndexGroup;
	saveGame.pieceSize = game.pieceSize;
	saveGame.pieceSizeLine = game.pieceSizeLine;
	saveGame.pieceInnerSize = game.pieceInnerSize;
	saveGame.pieceInnerSizeLine = game.pieceInnerSizeLine;
	saveGame.screenWidth = document.documentElement.clientWidth;
	if (!game.flagPeoptleGameImg) {
		saveGame.imageGame = game.imageGame;
	}
	saveGame.itmeSize = game.itmeSize;
	if (game.flagPeoptleGameImg) {
		saveGame.base64 = game.base64;
	} else {
		saveGame.base64 = 'undefined';
	}
	saveGame.flagPeoptleGameImg = game.flagPeoptleGameImg;
	saveGame.elemDataFlagFalse = $('.game-floor__puzzle-line').html();
	// saveGame.elemDataFlagFalse = game.strreplace(game.imageName, ' ', saveGame.elemDataFlagFalse);
	saveGame.elemDataFlagTrue = $('.game-content__game').html();
	// saveGame.elemDataFlagTrue = game.strreplace(game.imageName, ' ', saveGame.elemDataFlagTrue);
	// localStorage.setItem('puzzleGameCookie', JSON.stringify(saveGame));
	game.putSaveGame(saveGame);
};

game.gameStartSave = function() {
	if ('indexedDB' in window) {
		const openRequest = indexedDB.open('puzzleGame', 1); // устанавливаем соедениние
		openRequest.onupgradeneeded = function(e) {
			// сробатывает первый раз
			const thisDB = e.target.result;
			if (!thisDB.objectStoreNames.contains('saveGame')) {
				// если таблицы нет, то создать ее
				thisDB.createObjectStore('saveGame', {autoIncrement: true}); // создаем таблицу (нужно поменять версию)
			}
		};
		openRequest.onsuccess = function(e) {
			const db = e.target.result;
			const transaction = db.transaction(['saveGame'], 'readwrite');
			const store = transaction.objectStore('saveGame');
			const saveGame = {flag: false};
			const request = store.add(saveGame);
			request.onsuccess = function() {
				Cookies.set('oneSaveGame', 1, {expires: 365});
			};
		};
	}
};

game.gameGetSaveResum = function() {
	const openRequest = indexedDB.open('puzzleGame', 1); // устанавливаем соедениние
	openRequest.onsuccess = function(e) {
		const db = e.target.result;
		const transaction = db.transaction(['saveGame'], 'readonly');
		const store = transaction.objectStore('saveGame');
		const request = store.get(1);
		request.onsuccess = function(event) {
			const {flag} = event.target.result;
			const divResumGame = $('.content__resum');
			if (flag === true) {
				divResumGame.css('display', 'flex');
			} else {
				divResumGame.css('display', 'none');
			}
		};
	};
};

game.putSaveGame = function(saveGame) {
	const openRequest = indexedDB.open('puzzleGame', 1); // устанавливаем соедениние
	openRequest.onsuccess = function(e) {
		const db = e.target.result;
		const transaction = db.transaction(['saveGame'], 'readwrite');
		const store = transaction.objectStore('saveGame');
		store.put(saveGame, 1);
	};
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
