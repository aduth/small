/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';

/**
 * Internal dependencies
 */

import PostData, { fetchPost } from 'components/data/post-data';
import PostPage from 'components/ui/post-page';

export default class PostRoute extends Component {
	static propTypes = {
		params: PropTypes.shape( {
			slug: PropTypes.string.isRequired
		} ).isRequired
	}

	static prepareServerRoute( params ) {
		return fetchPost( params.slug );
	}

	render() {
		const { params } = this.props

		return (
			<PostData slug={ params.slug }>
				<PostPage />
			</PostData>
		);
	}
}
