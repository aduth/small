/**
 * External dependencies
 */

import React, { Component } from 'react';

/**
 * Internal dependencies
 */

import NotFoundPage from 'components/ui/not-found-page';

export default class NotFoundRoute extends Component {
	static status() {
		return 404;
	}

	render() {
		return (
			<NotFoundPage />
		);
	}
}
