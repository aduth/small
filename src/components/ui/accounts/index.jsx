/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

import Account from 'components/ui/account';

export default class Accounts extends Component {
	static propTypes = {
		accounts: PropTypes.arrayOf( PropTypes.object )
	}

	renderLinks() {
		const { accounts } = this.props;

		if ( ! accounts ) {
			return;
		}

		return accounts.map( ( account ) => {
			return (
				<li key={ account.url } className="accounts__link">
					<Account account={ account } />
				</li>
			);
		} );
	}

	render() {
		const { className } = this.props;
		const classes = classNames( 'accounts', className );

		return (
			<ul className={ classes }>
				{ this.renderLinks() }
			</ul>
		);
	}
}
