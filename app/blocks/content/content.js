/* global $ */
import game from '../game/game.js';
import Cookies from 'js-cookie';

// проверяем, и если нет то устанавливаем объект с сохраненной игрой



/**
 * Самый первый раз системы - создаем базу данных
 */
const oneSaveGame = parseInt(Cookies.get('oneSaveGame'), 10);
if (!oneSaveGame){
	game.gameStartSave(); // стартуем первый раз за игру и не показываем иконку с сохран
	// console.log('gs1');
}else {
	game.gameGetSaveResum();  // стартуем всегда и проверяем показывать сохранения или нет
	// console.log('gs2');
}


$('.content__resum').on('click', function (){
	const inste = $('[data-remodal-id="load-game"]').remodal();
	setTimeout(function (){
		inste.open();
	}, 300);
	$('.content').hide(300);
	$('.game').delay(300).show(300);
	const openRequest = indexedDB.open('puzzleGame', 1);  // устанавливаем соедениние
	openRequest.onsuccess = function (e){
		const db = e.target.result;
		const transaction = db.transaction(['saveGame'], 'readonly');
		const store = transaction.objectStore('saveGame');
		const request = store.get(1);
		request.onsuccess = function (event){
			const {
				filename,
				level,
				imageGame,
				base64,
				flagPeoptleGameImg
			} = event.target.result;
			const pictureBoxHelp = $('.image-help__img');
			pictureBoxHelp.attr('src', imageGame);
			// game.cleanFiled();
			if (flagPeoptleGameImg){
				// console.log(base64);
				game.load(
					base64,
					level,
					true,
					true,
					true,
				);
			}else {
				game.load(
					filename,
					level,
					true,
					true,
					false,
				);
			}
		};
	};
});

game.startSaveGame = function (){
	const openRequest = indexedDB.open('puzzleGame', 1);  // устанавливаем соедениние
	game.musicMenu.pause();
	openRequest.onsuccess = function (e){
		const db = e.target.result;
		const transaction = db.transaction(['saveGame'], 'readonly');
		const store = transaction.objectStore('saveGame');
		const request = store.get(1);
		request.onsuccess = function (event){
			const {
				flag,
				zIndex,
				zIndexGroup,
				pieceSize,
				pieceSizeLine,
				pieceInnerSize,
				pieceInnerSizeLine,
				screenWidth,
				itmeSize,
				elemDataFlagFalse,
				elemDataFlagTrue
			} = event.target.result;

			game.loadGame = flag;
			game.zIndex = zIndex;
			game.zIndexGroup = zIndexGroup;
			game.itmeSize = itmeSize;
			game.widthResize = screenWidth;
			game.pieceSize = pieceSize;
			game.pieceSizeLine = pieceSizeLine;
			game.pieceInnerSize = pieceInnerSize;
			game.pieceInnerSizeLine = pieceInnerSizeLine;
			const gameFloorPuzzleLine = $('.game-floor__puzzle-line');
			const gameContentGame = $('.game-content__game');
			gameFloorPuzzleLine.html(elemDataFlagFalse);
			// gameFloorPuzzleLine.children().find('image').attr('xlink:href', game.imageGame);
			gameContentGame.html(elemDataFlagTrue);
			// gameContentGame.children().find('image').attr('xlink:href', game.imageGame);
			game.resize();
			setTimeout(function (){
				const instClose = $('[data-remodal-id="load-game"]').remodal();
				instClose.close();
			}, 1250);
			$('.piece image').each((key, elem) => {
				$(elem).attr('xlink:href', game.imageName);
				// console.log($(elem).attr('xlink:href'));
			});
			game.touchGameEventPlay();
		};
	};
};

const labelFile = $('.folder-load__label');
labelFile.on('change', function (e){
	game.getFile(e);
});

function showPeopleGame(pipleImage){
	const level = parseInt(Cookies.get('puzzleLevel'), 10);
	game.musicMenu.pause();
	setTimeout(function (){
		$('.content').hide(300);
		$('.game').delay(300).show(300);
		const saveGameFlagPiople = true;
		const imgName = pipleImage;
		game.cleanFiled();
		setTimeout(function (){
			game.load(
				imgName,
				level,
				false,
				saveGameFlagPiople,
				true
			);
			game.widthResize = document.documentElement.clientWidth;
		}, 333);
		const inst = $('[data-remodal-id="load-game"]').remodal();
		inst.open();
	}, 300);
	game.imageGame = pipleImage;
}


game.getFile = function (e){
	const file = e.target.files[0];
	const reader = new FileReader();

	reader.onloadend = function (){
		// saveGame.filename = reader.result;
		const result = reader.result;
		showPeopleGame(result);
	};

	if (file.type !== 'null' && file.type === 'image/jpeg' || file.type === 'image/png') {
		reader.readAsDataURL(file);
	}else {
		const instOpen = $('[data-remodal-id="download-game"]').remodal();
		instOpen.open();
	}
};
/*
function loadFile () {
	const savedImg = localStorage.savedImg;
	if(savedImg) {
		const savedImgArray = savedImg.split(';base64,');
		const arrayBufferImg = base64ToArrayBuffer(savedImgArray[1]);
		const savedImgUrl = ArrayBufferToUrl(arrayBufferImg, savedImgArray[0].replace('data:',''));
		document.querySelectorAll('img').forEach((img)=>{img.src = savedImgUrl});
	}
}*/
	// document.querySelector('input[type=file]').onchange = saveFile
	// loadFile();







	// if (file.type !== 'null' && file.type === 'image/jpeg' || file.type === 'image/png'){
	// 	game.filePiepleGame = window.URL.createObjectURL(file);
	// 	showPeopleGame(game.filePiepleGame);
	// }else {
	// 	const instOpen = $('[data-remodal-id="download-game"]').remodal();
	// 	instOpen.open();
	// }

/*	readerBynary.onload = function (eve){
		// let str = '';
		const res = eve.target.result;
		console.log(res.toString());
		const header = ';base64,';
		const sFileData = eve.target.result;
		const sBase64Data = sFileData.substr(sFileData.indexOf(header) + header.length);
		console.log(sBase64Data);
		// for (let i = 0; i < res.length; i++){
		// 	console.log(i + ': ' + res[i]);
		// }
		// for (let i = 0; i < 9; i++){
		// 	str += res.charCodeAt(i).toString(16);
		// }
		// console.log('str', str);
		// // console.log(str);
		// if (str.slice(0, 7) === 'ffd8ffe' || str.slice(0, 7) === '89504e4'){
		// 	// readFileBase64(file);
		// 	window.URL = window.URL || window.webkitURL;
		game.filePiepleGame = window.URL.createObjectURL(file);
		showPeopleGame(game.filePiepleGame);
		// }else {
		// 	const instOpen = $('[data-remodal-id="download-game"]').remodal();
		// 	instOpen.open();
		// }
	};
	// readerBynary.readAsDataURL(file);
	// readerBynary.readAsBinaryString(file);
	// readerBynary.send(file);*/

