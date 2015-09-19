/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import assign from 'lodash/object/assign';
import pick from 'lodash/object/pick';
import isEqual from 'lodash/lang/isEqual';
import { connect } from 'react-redux';
import wpcom from 'wpcom';

/**
 * Internal dependencies
 */

import { SITE_ID } from 'constants/config';
import { receivePostPage, setPostsQuery } from 'actions/post';

/**
 * Selectors
 */

function select( state ) {
	return {
		posts: state.posts,
		postsByPage: state.postsByPage,
		query: state.query
	};
}

/**
 * Fetch utility
 */

export function fetchPosts( params ) {
	const query = getQuery( params );

	return new Promise( ( resolve, reject ) => {
		wpcom().site( SITE_ID ).postsList( query, ( error, response ) => {
			if ( error ) {
				reject( error );
			} else {
				resolve( receivePostPage( query.page, response.posts ) );
			}
		} );
	} );
}

function getQuery( params ) {
	return assign( {
		number: 10
	}, pick( params, [
		'page',
		'number',
		'tag'
	] ) );
}

@connect( select )
export default class PostsData extends Component {
	static propTypes = {
		page: PropTypes.number,
		tag: PropTypes.string,
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
		const { page, posts, postsByPage, dispatch } = props;

		const nextQuery = getQuery( props );
		if ( ! this.props.query || ! isEqual( this.props.query, nextQuery ) ) {
			dispatch( setPostsQuery( nextQuery ) );
			return;
		}

		if ( postsByPage[ page ] ) {
			return;
		}

		fetchPosts( props ).then( dispatch );
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
