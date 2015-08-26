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
import { receivePost } from 'actions/post';

/**
 * Selectors
 */

function select( state ) {
	return {
		posts: state.posts
	};
}

/**
 * Fetch utility
 */

export function fetchPost( slug ) {
	return new Promise( ( resolve, reject ) => {
		wpcom().site( SITE_ID ).post( { slug } ).get( ( error, response ) => {
			if ( error ) {
				reject( error );
			} else {
				resolve( receivePost( response ) );
			}
		} );
	} );
}

@connect( select )
export default class PostData extends Component {
	static propTypes = {
		slug: PropTypes.string.isRequired,
		posts: PropTypes.object,
		dispatch: PropTypes.func.isRequired,
		children: PropTypes.node
	}

	componentWillMount() {
		const { slug, posts, dispatch } = this.props;

		if ( posts && posts[ slug ] ) {
			return;
		}

		fetchPost( slug ).then( dispatch );
	}

	render() {
		const { children, posts, slug, dispatch, ...props } = this.props;

		return React.DOM.div( null, React.Children.map( children, ( child ) => {
			return React.cloneElement( child, {
				...props,
				post: posts ? posts[ slug ] : null
			} );
		} ) );
	}
}
