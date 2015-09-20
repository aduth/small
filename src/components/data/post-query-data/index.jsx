/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import assign from 'lodash/object/assign';
import pick from 'lodash/object/pick';
import contains from 'lodash/collection/contains';
import isEqual from 'lodash/lang/isEqual';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { setPostsQuery } from 'actions/post';
import { POSTS_PER_PAGE } from 'constants/config';

/**
 * Selectors
 */

function select( state ) {
	return {
		query: state.query
	};
}

/**
 * Fetch utility
 */

export function setQuery( params ) {
	return new Promise( ( resolve ) => {
		resolve( setPostsQuery( getQuery( params ) ) );
	} );
}

/**
 * Generates a query object using an object containing supported parameters,
 * including `number`, `page`, `s`, or `category`.
 *
 * @param  {Object} params Object containing parameters
 * @return {Object}        Query object
 */
function getQuery( params ) {
	return assign( {
		number: POSTS_PER_PAGE
	}, pick( params, ( value, key ) => {
		return value && contains( [ 'page', 'number', 'tag', 'category' ], key );
	} ) );
}

@connect( select )
export default class PostQueryData extends Component {
	static propTypes = {
		page: PropTypes.number,
		tag: PropTypes.string,
		category: PropTypes.string,
		query: PropTypes.object,
		dispatch: PropTypes.func.isRequired,
		children: PropTypes.node
	}

	componentWillMount() {
		this.maybeSetQuery( this.props );
	}

	componentWillReceiveProps( nextProps ) {
		this.maybeSetQuery( nextProps );
	}

	maybeSetQuery( props ) {
		if ( ! isEqual( this.props.query, getQuery( props ) ) ) {
			setQuery( props ).then( props.dispatch );
		}
	}

	render() {
		const { query, children, ...props } = this.props;

		return React.DOM.div( null, React.Children.map( children, ( child ) => {
			return React.cloneElement( child, { ...props, query } );
		} ) );
	}
}
