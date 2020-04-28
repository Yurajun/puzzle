import {create as browserSync} from 'browser-sync';
import gulp from 'gulp';
import debuga from 'debuga';
import historyApiFallback from 'connect-history-api-fallback';
// import proxy from 'http-proxy-middleware';

export const bs = browserSync('server');
const {PORT, OPEN, NODE_ENV, TUNNEL, BROWSER_SYNC_PROXY_HOST} = process.env;
/*
const middleware = proxy(['/lesson-7'], {
	target: 'http://localhost:3000',
	changeOrigin: true,
	pathRewrite: {
		'^/lesson-7': ''
	}
});
*/
export const server = () =>
	bs.init({
		files: ['dist/**/*'],
		open: !!OPEN,
		reloadOnRestart: true,
		// proxy: BROWSER_SYNC_PROXY_HOST,
		port: PORT || 3000,
		snippetOptions: {
			rule: {
				match: /<\/body>/i
			}
		},
		// startPath: '/lesson-7.html',
		server: {
			baseDir: ['app/resources', 'dist'],
			directory: false,
			middleware:
				NODE_ENV !== 'production'
					? [historyApiFallback(), debuga()]
					: []
		},
		tunnel: !!TUNNEL,
		notify: false
	});
