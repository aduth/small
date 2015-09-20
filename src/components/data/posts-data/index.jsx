/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import isEqual from 'lodash/lang/isEqual';
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
		postsByPage: state.postsByPage,
		hasMorePosts: state.hasMorePosts
	};
}

/**
 * Fetch utility
 */

export function fetchPosts( query ) {
	return new Promise( ( resolve, reject ) => {
		wpcom().site( SITE_ID ).postsList( query, ( error, response ) => {
			if ( error ) {
				reject( error );
			} else {
				resolve( receivePostPage( query.page || 1, response.posts, response.found ) );
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
		query: PropTypes.object,
		dispatch: PropTypes.func.isRequired,
		children: PropTypes.node
	}

	static defaultProps = {
		page: 1
	}

	componentWillMount() {
		this.maybeFetchPosts( this.props );
	}

	componentWillReceiveProps( nextProps ) {
		this.maybeFetchPosts( nextProps );
	}

	maybeFetchPosts( props ) {
		const { page, postsByPage, hasMorePosts, dispatch } = props;

		if ( isEqual( this.props.query, props.query ) || postsByPage[ page ] || ! hasMorePosts ) {
			return;
		}

		fetchPosts( props.query ).then( dispatch );
	}

	render() {
		const { page, postsByPage, posts, hasMorePosts, dispatch, children, ...props } = this.props;

		let mappedPosts;
		if ( postsByPage[ page ] ) {
			mappedPosts = postsByPage[ page ].map( ( slug ) => posts[ slug ] );
		} else {
			mappedPosts = null;
		}

		return React.DOM.div( null, React.Children.map( children, ( child ) => {
			return React.cloneElement( child, {
				...props,
				posts: mappedPosts,
				hasMorePosts: hasMorePosts
			} );
		} ) );
	}
}
