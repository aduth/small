/**
 * External dependencies
 */

import pick from 'lodash/object/pick';

/**
 * Internal dependencies
 */

import * as ActionTypes from 'constants/action-types';

/**
 * Constants
 */

const PICK_ATTRIBUTES = [ 'ID', 'name', 'description', 'URL', 'jetpack', 'icon' ];

export default function( site = null, action ) {
	switch ( action.type ) {
		case ActionTypes.RECEIVE_SITE:
			return pick( action.payload.site, PICK_ATTRIBUTES );
			break;

		default:
			return site;
	}
}
