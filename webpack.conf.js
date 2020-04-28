// import path from 'path';
// import NpmInstallPlugin from 'npm-install-webpack-plugin';
import webpack from 'webpack';

export default function makeWebpackConfig({
	sourcemaps = false,
	debug = false,
	eslint = false,
}) {
	return {
		entry: {
			app: './app/scripts/app.js',
		},
		output: {
			filename: '[name].min.js',
		},
		mode: debug ? 'development' : 'production',
		// devtool: (sourcemaps || !debug) ? '#source-map' : 'eval',
		devtool: sourcemaps && debug ? 'source-map' : 'none',
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: '/node_modules/',
					use: {
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							ignore: ['node_modules/**/*'],
						},
					},
				},
				{
					test: require.resolve('jquery'),
					use: [
						{loader: 'expose-loader', options: 'jQuery'},
						{loader: 'expose-loader', options: '$'},
					],
				},
				{
					test: require.resolve('axios'),
					use: [{loader: 'expose-loader', options: 'axios'}],
				},
				eslint
					? {
							test: /\.js$/,
							exclude: /node_modules/,
							loader: 'eslint-loader',
							options: {
								configFile: './.eslintrc',
								// emitErrors: false,
								// emitWarning: true,
								// failOnError: true,
								// formatter: 'stylish',
								formatter: require('eslint-friendly-formatter'),
								// formatter: eslintFormatter(true),
							},
					  }
					: {},
			],
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				},
			}),
		],
	};
}
