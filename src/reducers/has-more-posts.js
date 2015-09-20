/**
 * Internal dependencies
 */

import * as ActionTypes from 'constants/action-types';

export default function( hasMorePosts = true, action ) {
	switch ( action.type ) {
		case ActionTypes.SET_POSTS_QUERY:
			return true;

		case ActionTypes.RECEIVE_POST_PAGE:
			return !! action.payload.meta.next_page;

		default:
			return hasMorePosts;
	}
}
