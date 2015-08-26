/**
 * Internal dependencies
 */

import * as ActionTypes from 'constants/action-types';

export function receiveAuthor( author ) {
	return {
		type: ActionTypes.RECEIVE_AUTHOR,
		payload: { author }
	};
}
