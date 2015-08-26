/**
 * External dependencies
 */

import pick from 'lodash/object/pick';

/**
 * Internal dependencies
 */

import * as ActionTypes from 'constants/action-types';
import { ACCOUNTS } from 'constants/config';

/**
 * Constants
 */

const PICK_ATTRIBUTES = [ 'url', 'shortname' ];

/**
 * Default accounts
 */

function defaultAccounts() {
	if ( ! ACCOUNTS ) {
		return [];
	}

	return ACCOUNTS
		.split( ',' )
		.filter( ( account ) => -1 !== account.indexOf( '=' ) )
		.map( ( account ) => {
			const [ shortname, url ] = account.split( '=' );
			return { shortname, url };
		} );
}

export default function( accounts = null, action ) {
	switch ( action.type ) {
		case ActionTypes.RECEIVE_AUTHOR:
			return action.payload.author.accounts
				.map( ( account ) => pick( account, PICK_ATTRIBUTES ) )
				.filter( ( account ) => ! ACCOUNTS || ( new RegExp( `(^|,)${ account.shortname }(,|$)` ) ).test( ACCOUNTS ) )
				.concat( defaultAccounts() );
			break;

		default:
			return accounts;
	}
}
