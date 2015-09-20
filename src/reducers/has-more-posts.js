/**
 * Internal dependencies
 */

import * as ActionTypes from 'constants/action-types';
import { POSTS_PER_PAGE } from 'constants/config';

export default function( hasMorePosts = true, action ) {
	switch ( action.type ) {
		case ActionTypes.SET_POSTS_QUERY:
			return true;

		case ActionTypes.RECEIVE_POST_PAGE:
			return action.payload.page * POSTS_PER_PAGE < action.payload.found;

		default:
			return hasMorePosts;
	}
}
