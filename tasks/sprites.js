// import gulp from 'gulp';
// import buffer from 'vinyl-buffer';
// import csso from 'gulp-csso';
// import imagemin from 'gulp-imagemin';
// // import plumber from 'gulp-plumber';
// import spritesmith from 'gulp.spritesmith-multi';
// // import checkIconsInDir from 'spritesmith-dir-checker';
// import merge from 'merge-stream';
// // import spritesmith from 'gulp.spritesmith';
// import path from 'path';

// // console.log(spritesmith);

// // import errorHandler from 'gulp-plumber-error-handler';

// // const cwd = path.join(__dirname, '..');
// // const spritesDirPath = 'app/sprites';
// const imgPath = '../images/sprites/';
// const tmplName = 'stylus_retina.template.handlebars';
// const tmplPath = '../node_modules/spritesmith-stylus-retina-template';
// const cssTemplate = path.join(__dirname, tmplPath, tmplName);

// export const sprites = () => {
// 	const spriteData = gulp
// 		.src(['app/sprites/**/*.png', '!app/sprites/*.png'])
// 		.pipe(
// 			spritesmith(
// 				{
// 					spritesmith: function(options) {
// 						options.imgPath = imgPath + options.imgName;
// 					},
// 				},

// 				// // // retinaSrcFilter: ['app/sprites/**/*@2x.png'],
// 				// // // retinaImgPath: imgPath + options.retinaImgName,
// 				// imgName: 'sprite.png',
// 				// // // retinaImgName: 'sprite@2x.png',
// 				// cssName: 'sprite.styl',
// 				// algorithm: 'binary-tree',
// 				// padding: 8,
// 				// cssTemplate: path.join(__dirname, tmplPath, tmplName),
// 			),
// 		);

// 	// 				options.imgPath = imgPath + options.imgName;
// 	// 				options.retinaImgPath = imgPath + options.retinaImgName;
// 	// 				options.cssName = options.cssName.replace(
// 	// 					/\.css$/,
// 	// 					'.styl',
// 	// 				);
// 	// 				options.cssFormat = 'stylus';
// 	// 				options.cssTemplate = cssTemplate;
// 	// 				options.algorithm = 'binary-tree';
// 	// 				options.padding = 8;

// 	// Pipe image stream through image optimizer and onto disk
// 	// const imgStream = spriteData.img
// 	// 	.pipe(imagemin())
// 	// 	.pipe(gulp.dest('dist/assets/images/sprites'));
// 	// // .pipe(gulp.dest('dist/assets/images/sprites'));

// 	// // Pipe CSS stream through CSS optimizer and onto disk
// 	// const cssStream = spriteData.css
// 	// 	// .pipe(csso())
// 	// 	.pipe(gulp.dest('app/styles/sprites'));
// 	// // .pipe(gulp.dest('app/styles/sprites'));

// 	// // Return a merged stream to handle both `end` events
// 	// return merge(imgStream, cssStream);

// 	// 8888888888888888888888888888888888888888888888888888888888888888888888888
// 	// const canDoNext = checkIconsInDir(cwd, spritesDirPath);

// 	// if (!canDoNext) {
// 	// 	return;
// 	// }

// 	// return gulp
// 	// 	.src(['app/sprites/**/*.png', '!app/sprites/*.png'])
// 	// 	.pipe(plumber({errorHandler: errorHandler('Error in "sprites" task')}))
// 	// 	.pipe(spritesmith())
// 	// 	.pipe(gulp.dest('dist/assets/images/sprites'));
// 	// ===========================================================================

// 	// const spriteData = gulp
// 	// 	.src(['app/sprites/**/*.png', '!app/sprites/*.png'])
// 	// 	.pipe(plumber({errorHandler: errorHandler('Error in "sprites" task')}))
// 	// 	.pipe(
// 	// 		spritesmith({
// 	// 			spritesmith(options) {
// 	// 				options.imgPath = imgPath + options.imgName;
// 	// 				options.retinaImgPath = imgPath + options.retinaImgName;
// 	// 				options.cssName = options.cssName.replace(
// 	// 					/\.css$/,
// 	// 					'.styl',
// 	// 				);
// 	// 				options.cssFormat = 'stylus';
// 	// 				options.cssTemplate = cssTemplate;
// 	// 				options.algorithm = 'binary-tree';
// 	// 				options.padding = 8;

// 	// 				return options;
// 	// 			},
// 	// 		}),
// 	// 	);

// 	// const imgStream = spriteData.img.pipe(
// 	// 	gulp.dest('dist/assets/images/sprites'),
// 	// );
// 	// const styleStream = spriteData.css.pipe(gulp.dest('app/styles/sprites'));

// 	// return merge(imgStream, styleStream);
// };

// // ------------------------------------------------------------------------------

// // const canDoNext = checkIconsInDir(cwd, spritesDirPath);

// // 	if (!canDoNext) {
// // 		return;
// // 	}

// // 	const spriteData = gulp.src(['app/sprites/**/*.png', '!app/sprites/*.png'])
// // 		.pipe(plumber({errorHandler: errorHandler('Error in "sprites" task')}))
// // 		.pipe(spritesmith({
// // 			spritesmith(options) {
// // 				options.imgPath = imgPath + options.imgName;
// // 				options.retinaImgPath = imgPath + options.retinaImgName;
// // 				options.cssName = options.cssName.replace(/\.css$/, '.styl');
// // 				options.cssFormat = 'stylus';
// // 				options.cssTemplate = cssTemplate;
// // 				options.algorithm = 'binary-tree';
// // 				options.padding = 8;

// // 				return options;
// // 			}
// // 		}));

// // 	const imgStream = spriteData.img.pipe(gulp.dest('dist/assets/images/sprites'));
// // 	const styleStream = spriteData.css.pipe(gulp.dest('app/styles/sprites'));

// // 	return merge(imgStream, styleStream);
