/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Router from 'react-router';

/**
 * Internal dependencies
 */

import routes from 'routes';

export default class Root extends Component {
	static propTypes = {
		store: PropTypes.object,
		history: PropTypes.object
	}

	render() {
		const { store, ...props } = this.props;

		return (
			<Provider store={ store }>
				{ () => <Router { ...props } children={ routes } /> }
			</Provider>
		);
	}
}
