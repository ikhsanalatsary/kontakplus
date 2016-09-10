import path from 'path';

module.exports = {
	entry: ['./client/app.js', './client/js/controller.js', './client/js/controller.js'],
	output: {
		path: './client/dist',
		publicPath: '',
		filename: '[name].bundle.js',
		chunkFilename: '[id].bundle.js',
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel', query: { compact: false } },
			{ test: /\.json$/, loader: "json-loader" },
			{ test: /\.css$/, loader: "style-loader!css-loader" },
			{ test: /\.png$/, loader: "url-loader?limit=100000" },
			{ test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, loader: 'file' },
			{ test: /\.html$/, loader: 'raw' },
		],
	},
	resolve: {
		extentions: ['', '.js'],
	},
};
