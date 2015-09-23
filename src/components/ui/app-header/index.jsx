/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router';

/**
 * Internal dependencies
 */

import { AUTHOR_EMAIL } from 'constants/config';
import Accounts from 'components/ui/accounts';

export default class AppHeader extends Component {
	static propTypes = {
		site: PropTypes.object,
		accounts: PropTypes.arrayOf( PropTypes.object )
	}

	renderLogo() {
		const { site } = this.props;
		if ( ! site ) {
			return;
		}

		if ( site.icon && site.icon.img ) {
			return <img src={ site.icon.img } className="app-header__logo" />;
		}

		return (
			<Gravatar
				email={ AUTHOR_EMAIL }
				size={ 40 }
				className="app-header__logo" />
		);
	}

	render() {
		const { accounts } = this.props;

		return (
			<header className="app-header">
				<Link to="/" className="app-header__logo-link">
					{ this.renderLogo() }
				</Link>
				<Accounts
					accounts={ accounts }
					className="app-header__accounts" />
			</header>
		);
	}
}
