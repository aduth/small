/**
 * External dependencies
 */

import express from 'express';
import compression from 'compression';
import http from 'http';
import React from 'react';
import { match, RoutingContext } from 'react-router'
import createLocation from 'history/lib/createLocation';
import { isFSA } from 'flux-standard-action';
import cache from 'serve-static-cache';
import bodyParser from 'body-parser';
import rimraf from 'rimraf';

/**
 * Internal dependencies
 */

import createStore from 'utils/create-store';
import routes from 'routes';
import Root from 'components/data/root';
import SiteData from 'components/data/site-data';
import Layout from 'components/ui/layout';
import { CACHE_BUST_KEY } from 'constants/config';
import manifest from '../package';

/**
 * App initialization
 */

const app = express();
const server = http.Server( app );

/**
 * Middlewares
 */

app.use( compression() );
app.use( express.static( __dirname + '/../public' ) );
app.use( express.static( __dirname + '/../public-cache' ) );
app.use( cache( {
	root: __dirname + '/../public-cache',
	clean: true
} ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

/**
 * Routes
 */

// POST /cachebust
app.post( '/cachebust', ( request, response ) => {
	if ( CACHE_BUST_KEY && request.query.key === CACHE_BUST_KEY ) {
		// Only cachebust if query key matches configured API key
		rimraf( __dirname + '/../public-cache', () => {} );
		response.status( 204 ).end();
	} else {
		// Otherwise, respond with unauthorized status
		response.status( 401 ).end();
	}
} );

// GET *
app.get( '*', ( request, response ) => {
	const store = createStore();
	const location = createLocation( request.url );

	match( { routes, location }, ( error, redirect, routeState ) => {
		if ( redirect ) {
			return response.redirect( 301, redirect.pathname + redirect.search );
		}

		const { components, params } = routeState;

		// Allow routes to define status codes to send with the response. This
		// is particularly useful for the NotFoundRoute (404).
		if ( components[ components.length - 1 ].status ) {
			response.status( components[ components.length - 1 ].status() );
		}

		// Each rendered route may have asynchronous prerequisites, so we
		// map over and generate a promise for each
		Promise.all( [ error ].concat( components.map( ( component ) => {
			// If the route has no prerequisites, return immediately
			if ( ! component.prepareServerRoute ) {
				return Promise.resolve();
			}

			// Otherwise, execute the preparation handler, providing the
			// current route parameters.
			return component.prepareServerRoute( params ).then( ( result ) => {
				// The result of the handler may be an action object or an
				// array of action objects. First, normalize to an array.
				if ( ! Array.isArray( result ) ) {
					result = [ result ];
				}

				// Then, dispatch each flux standard action
				result.filter( isFSA ).forEach( store.dispatch );
			} );
		} ) ) ).then( () => {
			const state = store.getState();
			const page = React.renderToString(
				<Root store={ store }>
					{ () => <RoutingContext { ...routeState } /> }
				</Root>
			);

			// Finally, render the page. Pass along the current store state to
			// enable rehydrating the store on the client.
			response.send( '<!doctype html>' + React.renderToStaticMarkup(
				<Layout site={ state.site } hydrator={ state } version={ manifest.version } children={ page } />
			) );
		} ).catch( ( exception ) => {
			response.status( 500 );

			// In development environments, display the error message.
			if ( 'production' !== process.env.NODE_ENV ) {
				response.send( exception.stack );
			}

			response.end();
		} );
	} );
} );

/**
 * Start server
 */

const port = process.env.PORT || 3000;
server.listen( port, () => {
	console.log( 'Listening on port %d...', port );
} );
