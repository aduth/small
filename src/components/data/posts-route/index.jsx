/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import pick from 'lodash/object/pick';

/**
 * Internal dependencies
 */

import PostsData, { fetchPosts } from 'components/data/posts-data';
import PostQueryData, { setQuery } from 'components/data/post-query-data';
import PostsPage from 'components/ui/posts-page';

export default class PostsRoute extends Component {
	static propTypes = {
		params: PropTypes.object.isRequired
	}

	static prepareServerRoute( params ) {
		return setQuery( params ).then( ( action ) => {
			return Promise.all( [ action, fetchPosts( action.payload.query ) ] );
		} );
	}

	render() {
		const { params } = this.props;

		let page;
		if ( params.page ) {
			page = parseInt( params.page, 10 );
		}

		return (
			<PostQueryData page={ page } { ...pick( params, 'tag', 'category' ) }>
				<PostsData>
					<PostsPage page={ page } />
				</PostsData>
			</PostQueryData>
		);
	}
}
