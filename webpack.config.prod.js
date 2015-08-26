/**
 * External dependencies
 */
var webpack = require( 'webpack' ),
	HtmlWebpackPlugin = require( 'html-webpack-plugin' ),
	ExtractTextPlugin = require( 'extract-text-webpack-plugin' ),
	assign = require( 'lodash/object/assign' ),
	manifest = require( './package' );

/**
 * Internal dependencies
 */

var common = require( './webpack.config.common' );

module.exports = assign( {}, common, {
	entry: __dirname + '/src/client.js',
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: __dirname + '/src',
				loaders: [ 'babel' ]
			},
			{
				test: /\.json$/,
				loaders: [ 'json' ]
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract( 'raw!autoprefixer!sass?outputStyle=compressed' )
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin( {
			compress: {
				warnings: false
			}
		} ),
		new ExtractTextPlugin( 'bundle.css', {
			allChunks: true
		} ),
		new webpack.DefinePlugin( {
			'process.env.SITE_ID': JSON.stringify( process.env.SITE_ID ),
			'process.env.AUTHOR_EMAIL': JSON.stringify( process.env.AUTHOR_EMAIL ),
			'process.env.ACCOUNTS': JSON.stringify( process.env.ACCOUNTS ),
			'process.env.GA_ACCOUNT_ID': JSON.stringify( process.env.GA_ACCOUNT_ID )
		} )
	]
} );
