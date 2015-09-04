/**
 * Internal dependencies
 */

import * as ActionTypes from 'constants/action-types';

export function receivePosts( posts ) {
	return {
		type: ActionTypes.RECEIVE_POSTS,
		payload: { posts }
	};
}

export function receivePostPage( page, posts ) {
	return {
		type: ActionTypes.RECEIVE_POST_PAGE,
		payload: { page, posts }
	}
}

export function setPostsQuery( query ) {
	return {
		type: ActionTypes.SET_POSTS_QUERY,
		payload: { query }
	}
}

export function receivePost( post ) {
	return {
		type: ActionTypes.RECEIVE_POST,
		payload: { post }
	};
}
