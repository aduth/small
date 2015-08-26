/**
 * External dependencies
 */

import request from 'superagent';
import jsonp from 'superagent-jsonp';
import { createHash } from 'crypto';

/**
 * SuperAgent plugin initialization
 */

jsonp( request );

/**
 * Constants
 */

const GRAVATAR_API_BASE = 'https://www.gravatar.com';

export default function( email ) {
	return new Promise( ( resolve, reject ) => {
		let md5 = createHash( 'md5' );
		md5.update( email );

		let xhr = request.get( `${ GRAVATAR_API_BASE }/${ md5.digest( 'hex' ) }.json` );
		if ( 'undefined' !== typeof window ) {
			// In browser environments, we must use JSONP for the request
			xhr = xhr.jsonp();
		}

		xhr.end( function( error, { body: { entry } } ) {
			if ( error || ! entry || ! entry.length ) {
				reject( error );
			} else {
				resolve( entry[ 0 ] );
			}
		} );
	} );
}
