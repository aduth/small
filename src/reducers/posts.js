/**
 * External dependencies
 */

import indexBy from 'lodash/collection/indexBy';
import pick from 'lodash/object/pick';

/**
 * Internal dependencies
 */

import * as ActionTypes from 'constants/action-types';

/**
 * Constants
 */

const PICK_ATTRIBUTES = [ 'ID', 'slug', 'global_ID', 'title', 'URL', 'date', 'tags', 'content', 'excerpt' ];

export default function( posts = null, action ) {
	switch ( action.type ) {
		case ActionTypes.RECEIVE_POST_PAGE:
		case ActionTypes.RECEIVE_POSTS:
			return {
				...posts,
				...indexBy( action.payload.posts.map( ( post ) => pick( post, PICK_ATTRIBUTES ) ), 'slug' )
			};
			break;

		case ActionTypes.RECEIVE_POST:
			return {
				...posts,
				[ action.payload.post.slug ]: pick( action.payload.post, PICK_ATTRIBUTES )
			};
			break;

		default:
			return posts;
	}
}
