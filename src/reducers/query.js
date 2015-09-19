/**
 * Internal dependencies
 */

import * as ActionTypes from 'constants/action-types';

export default function( query = null, action ) {
	switch ( action.type ) {
		case ActionTypes.SET_POSTS_QUERY:
			return action.payload.query;

		default:
			return query;
	}
}
