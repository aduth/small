/* eslint-disable vars-on-top */
require( 'babel/register' );

/**
 * External dependencies
 */

var React = require( 'react' ),
	webpack = require( 'webpack' ),
	HtmlWebpackPlugin = require( 'html-webpack-plugin' ),
	assign = require( 'lodash/object/assign' ),
	manifest = require( './package' );

/**
 * Internal dependencies
 */

var Layout = require( './src/components/ui/layout' ),
	common = require( './webpack.config.common' );

module.exports = assign( {}, common, {
	cache: true,
	entry: [
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		__dirname + '/src/client.js'
	],
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: __dirname + '/src',
				loaders: [ 'react-hot', 'babel?cacheDirectory' ]
			},
			{
				test: /\.json$/,
				loaders: [ 'json' ]
			},
			{
				test: /\.scss$/,
				loaders: [ 'style', 'css', 'autoprefixer', 'sass' ]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin( {
			templateContent: function() {
				return React.renderToStaticMarkup( React.createElement( Layout, {
					assets: { main: { js: '/main.js' } }
				} ) );
			}
		} ),
		new webpack.DefinePlugin( {
			'process.env.SITE_ID': JSON.stringify( process.env.SITE_ID ),
			'process.env.AUTHOR_EMAIL': JSON.stringify( process.env.AUTHOR_EMAIL ),
			'process.env.ACCOUNTS': JSON.stringify( process.env.ACCOUNTS ),
			'process.env.GA_ACCOUNT_ID': JSON.stringify( process.env.GA_ACCOUNT_ID ),
			'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV )
		} )
	]
} );
