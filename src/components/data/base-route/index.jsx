/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';

/**
 * Internal dependencies
 */

import SiteData, { fetchSite } from 'components/data/site-data';
import AccountsData, { fetchAuthor } from 'components/data/accounts-data';
import AppHeader from 'components/ui/app-header';
import AppContent from 'components/ui/app-content';
import { GA_ACCOUNT_ID } from 'constants/config';

export default class BaseRoute extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired,
		children: PropTypes.node
	}

	static prepareServerRoute() {
		return Promise.all( [ fetchSite(), fetchAuthor() ] );
	}

	componentDidMount() {
		this.trackPageView( this.props.location.pathname );
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.location.pathname !== this.props.location.pathname ) {
			this.trackPageView( nextProps.location.pathname );
		}
	}

	trackPageView( path ) {
		if ( ! GA_ACCOUNT_ID || 'undefined' === typeof window ) {
			return;
		}

		window.ga( 'set', 'page', path );
	}

	render() {
		const { children } = this.props;

		return (
			<SiteData>
				<AccountsData>
					<AppHeader />
				</AccountsData>
				<AppContent>
					{ children }
				</AppContent>
			</SiteData>
		);
	}
}
