/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import wpcom from 'wpcom';

/**
 * Internal dependencies
 */

import { SITE_ID } from 'constants/config';
import { receiveSite } from 'actions/site';

/**
 * Selectors
 */

function select( state ) {
	return {
		site: state.site
	};
}

/**
 * Fetch utility
 */

export function fetchSite() {
	return new Promise( ( resolve ) => {
		wpcom().site( SITE_ID ).get( ( error, response ) => {
			resolve( receiveSite( response ) );
		} );
	} );
}

@connect( select )
export default class SiteData extends Component {
	static propTypes = {
		site: PropTypes.object,
		dispatch: PropTypes.func.isRequired,
		children: PropTypes.node
	}

	componentWillMount() {
		const { site, dispatch } = this.props;

		if ( site ) {
			return;
		}

		fetchSite().then( dispatch );
	}

	render() {
		const { site, dispatch, children, ...props } = this.props;

		return React.DOM.div( null, React.Children.map( children, ( child ) => {
			return React.cloneElement( child, {
				...props,
				site
			} );
		} ) );
	}
}
