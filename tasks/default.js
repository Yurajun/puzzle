import gulp from 'gulp';

import {styles, stylesLint} from './styles';
import {icons} from './icons';
import {copy} from './copy';
import {templates, templatesLint} from './templates';
import {server} from './server';
import {watch} from './watch';
import {scripts, scriptsWatch} from './scripts';
// import {sprites} from './sprites';

gulp.task(
	'default',
	gulp.series(
		styles,
		icons,
		stylesLint,
		templates,
		templatesLint,
		gulp.parallel(server, watch)
	)
);

gulp.task(
	'build',
	gulp.series(templates, copy, gulp.parallel(icons, styles, scripts))
);

gulp.task('stylesLint', stylesLint);
gulp.task('scriptsWatch', scriptsWatch);
gulp.task('templatesLint', templatesLint);
