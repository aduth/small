/**
 * Internal dependencies
 */

import * as ActionTypes from 'constants/action-types';

export function receiveSite( site ) {
	return {
		type: ActionTypes.RECEIVE_SITE,
		payload: { site }
	};
}
