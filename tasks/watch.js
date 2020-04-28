import gulp from 'gulp';
// import runSequence from 'run-sequence';
import {get as browserSync} from 'browser-sync';
import {styles, stylesLint} from './styles';
import {templates, templatesLint} from './templates';
import {scriptsWatch} from './scripts';
import {icons} from './icons';

const bs = browserSync('server');
const reload = done => {
    bs.reload();
    done();
};

export const watch = () => {
    global.watch = true;

    gulp.watch(
        'app/{styles,blocks}/**/*.styl',
        gulp.series(styles, stylesLint)
    );

    gulp.watch('app/icons/**/*.svg', gulp.series(icons, reload));

    gulp.watch(
        ['app/{pages,blocks}/**/*.jade'],
        gulp.series(templates, templatesLint)
    );

    gulp.watch('app/**/*.js', scriptsWatch);
};
