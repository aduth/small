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
import { receivePostPage } from 'actions/post';

/**
 * Selectors
 */

function select( state ) {
	return {
		posts: state.posts,
		postPages: state.postPages
	};
}

/**
 * Fetch utility
 */

export function fetchPosts( page ) {
	return new Promise( ( resolve, reject ) => {
		wpcom().site( SITE_ID ).postsList( { page }, ( error, response ) => {
			if ( error ) {
				reject( error );
			} else {
				resolve( receivePostPage( page, response.posts ) );
			}
		} );
	} );
}

@connect( select )
export default class PostsData extends Component {
	static propTypes = {
		page: PropTypes.number,
		postPages: PropTypes.arrayOf( PropTypes.arrayOf( PropTypes.string ) ),
		posts: PropTypes.object,
		dispatch: PropTypes.func.isRequired,
		children: PropTypes.node
	}

	static defaultProps = {
		page: 1
	}

	componentWillMount() {
		const { page, posts, postPages, dispatch } = this.props;

		if ( postPages[ page - 1 ] ) {
			return;
		}

		fetchPosts( page ).then( dispatch );
	}

	render() {
		const { page, postPages, posts, dispatch, children, ...props } = this.props;

		let mappedPosts;
		if ( postPages[ page - 1 ] ) {
			mappedPosts = postPages[ page - 1 ].map( ( slug ) => posts[ slug ] );
		} else {
			mappedPosts = null;
		}

		return React.DOM.div( null, React.Children.map( children, ( child ) => {
			return React.cloneElement( child, {
				...props,
				posts: mappedPosts
			} );
		} ) );
	}
}
