import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpIf from 'gulp-if';
import rupture from 'rupture';
import stylint from 'gulp-stylint';
import stylus from 'gulp-stylus';
import importIfExist from 'stylus-import-if-exist';
import autoprefixer from 'autoprefixer-stylus';
import gcmq from 'gulp-group-css-media-queries';
import nano from 'gulp-cssnano';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import errorHandler from 'gulp-plumber-error-handler';
// import cache from 'gulp-cached';
// import progeny from 'gulp-progeny';

// const emitty = require('emitty').setup('app/styles', 'stylus');

const isDebug = process.env.NODE_ENV !== 'production';

export const styles = () =>
    gulp
        .src('app/styles/*.styl')
        // .pipe(cache('stylus'))
        // .pipe(
        //     progeny({
        //         regexp: /^\s*@import\s*(?:\(\w+\)\s*)?['"]([^'"]+)['"]/
        //     })
        // )
        // .pipe(
        //     gulpIf(
        //         global.watch,
        //         emitty.stream(
        //             global.emittyChangedFile.path,
        //             global.emittyChangedFile.stats
        //         )
        //     )
        // )
        .pipe(plumber({errorHandler: errorHandler('Error in "styles" task')}))
        .pipe(gulpIf(isDebug, sourcemaps.init()))
        .pipe(
            stylus({
                // use: [rupture(), autoprefixer()],
                use: [importIfExist(), rupture(), autoprefixer()],
                'include css': true,
                define: {
                    // dev-mode variable for using in stylus
                    __DEV__: isDebug
                }
            })
        )
        .pipe(gulpIf(!isDebug, gcmq()))
        .pipe(gulpIf(!isDebug, nano({zindex: false})))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulpIf(isDebug, sourcemaps.write()))
        .pipe(gulp.dest('dist/assets/styles'));
// .pipe(bs.reload({stream: true}));
// );

// gulp.task('styles:lint', () => (
export const stylesLint = () =>
    gulp
        .src(['app/**/*.styl', '!app/styles/**'])
        .pipe(
            stylint({
                reporter: {
                    reporter: 'stylint-stylish',
                    reporterOptions: {
                        verbose: true
                    }
                }
            })
        )
        .pipe(stylint.reporter())
        .pipe(stylint.reporter('fail'));
// .pipe(stylint.reporter('fail', {failOnWarning: true}));
// ));
