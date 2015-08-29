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
		postsByPage: state.postsByPage
	};
}

/**
 * Fetch utility
 */

export function fetchPosts( params ) {
	const { page } = params;

	return new Promise( ( resolve, reject ) => {
		wpcom().site( SITE_ID ).postsList( params, ( error, response ) => {
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
		postsByPage: PropTypes.object,
		posts: PropTypes.object,
		dispatch: PropTypes.func.isRequired,
		children: PropTypes.node
	}

	componentWillMount() {
		this.maybeFetchPosts( this.props );
	}

	componentWillReceiveProps( nextProps ) {
		if ( this.props.page === nextProps.page ) {
			return;
		}

		this.maybeFetchPosts( nextProps );
	}

	maybeFetchPosts( props ) {
		const { page, posts, postsByPage, dispatch } = props;

		if ( postsByPage[ page ] ) {
			return;
		}

		fetchPosts( { page } ).then( dispatch );
	}

	render() {
		const { page, postsByPage, posts, dispatch, children, ...props } = this.props;

		let mappedPosts;
		if ( postsByPage[ page ] ) {
			mappedPosts = postsByPage[ page ].map( ( slug ) => posts[ slug ] );
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
