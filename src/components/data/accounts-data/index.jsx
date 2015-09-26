/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { AUTHOR_EMAIL } from 'constants/config';
import { receiveAuthor } from 'actions/author';
import gravatar from 'gravatar-profile';

/**
 * Selectors
 */

function select( state ) {
	return {
		accounts: state.accounts
	};
}

/**
 * Fetch utility
 */

export function fetchAuthor() {
	return new Promise( ( resolve, reject ) => {
		gravatar( AUTHOR_EMAIL, ( error, author ) => {
			if ( error ) {
				reject( error );
			} else {
				resolve( receiveAuthor( author ) );
			}
		} );
	} );
}

@connect( select )
export default class AccountsData extends Component {
	static propTypes = {
		accounts: PropTypes.arrayOf( PropTypes.object ),
		dispatch: PropTypes.func.isRequired,
		children: PropTypes.node
	}

	componentWillMount() {
		const { accounts, dispatch } = this.props;

		if ( accounts ) {
			return;
		}

		fetchAuthor().then( dispatch );
	}

	render() {
		const { accounts, dispatch, children, ...props } = this.props;

		return React.DOM.div( null, React.Children.map( children, ( child ) => {
			return React.cloneElement( child, {
				...props,
				accounts
			} );
		} ) );
	}
}
