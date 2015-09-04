/**
 * External dependencies
 */
import omit from 'lodash/object/omit';
import isEqual from 'lodash/lang/isEqual';

/**
 * Internal dependencies
 */

import * as ActionTypes from 'constants/action-types';

export default function( postsByPage = {}, action ) {
	switch ( action.type ) {
		case ActionTypes.SET_POSTS_QUERY:
			return {};

		case ActionTypes.RECEIVE_POST_PAGE:
			return {
				...postsByPage,
				[ action.payload.page ]: action.payload.posts.map( ( { slug } ) => slug )
			};

		default:
			return postsByPage;
	}
}
