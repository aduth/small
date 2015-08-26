module.exports = {
	output: {
		path: __dirname + '/public',
		filename: 'bundle.js',
		publicPath: '/'
	},
	resolve: {
		extensions: [ '', '.json', '.js', '.jsx' ],
		root: [
			__dirname + '/src'
		]
	},
	node: {
		console: true,
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	}
};
