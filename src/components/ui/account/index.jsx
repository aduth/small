/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';

/**
 * Internal dependencies
 */

import Icon from 'components/ui/icon';

export default class Account extends Component {
	static propTypes = {
		account: PropTypes.object
	}

	icon() {
		const { account } = this.props;

		switch ( account.shortname ) {
			case 'google':
				return 'google-plus-square';
			default:
				return `${ account.shortname }-square`;
		}
	}

	render() {
		const { account } = this.props;

		return (
			<a href={ account.url } className="account" target="_blank">
				<span className="account__service">
					{ account.shortname }
				</span>
				<Icon
					icon={ this.icon() }
					className="account__icon" />
			</a>
		);
	}
}
