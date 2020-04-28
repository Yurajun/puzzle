import gulp from 'gulp';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import makeWebpackConfig from '../webpack.conf.js';

const {NODE_ENV} = process.env;
// console.log(NODE_ENV);
const isDebug = NODE_ENV !== 'production';

function runWebpack(watch = false) {
    return gulpWebpack(
        makeWebpackConfig({
            sourcemaps: isDebug,
            debug: isDebug,
            eslint: watch
        }),
        webpack
    );
}

export const scripts = () =>
    gulp
        .src('app/scripts/app.js')
        .pipe(runWebpack())
        .pipe(gulp.dest('dist/assets/scripts'));

export const scriptsWatch = () =>
    gulp
        .src('app/scripts/app.js')
        .pipe(runWebpack(true))
        .pipe(gulp.dest('dist/assets/scripts'));
