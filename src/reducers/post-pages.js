/**
 * Internal dependencies
 */

import * as ActionTypes from 'constants/action-types';

export default function( postPages = [], action ) {
	switch ( action.type ) {
		case ActionTypes.RECEIVE_POST_PAGE:
			return [
				...postPages.slice( action.payload.page - 2 ),
				...[ action.payload.posts.map( ( { slug } ) => slug ) ],
				...postPages.slice( action.payload.page )
			];
			break;

		default:
			return postPages;
	}
}
