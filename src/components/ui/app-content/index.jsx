/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';

export default class AppContent extends Component {
	static propTypes = {
		children: PropTypes.node
	}

	render() {
		const { children } = this.props;

		return (
			<main className="app-content">
				{ children }
			</main>
		);
	}
}
