/**
 * Internal dependencies
 */

import * as ActionTypes from 'constants/action-types';

export default function( postsByPage = {}, action ) {
	switch ( action.type ) {
		case ActionTypes.RECEIVE_POST_PAGE:
			return {
				...postsByPage,
				[ action.payload.page ]: action.payload.posts.map( ( { slug } ) => slug )
			};
			break;

		default:
			return postsByPage;
	}
}
