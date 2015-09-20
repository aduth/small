/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import values from 'lodash/object/values';

/**
 * Internal dependencies
 */

import PostTerms from 'components/ui/post-terms';

export default class PostTags extends Component {
	static propTypes = {
		post: PropTypes.object
	}

	render() {
		const { post: { tags } } = this.props;

		if ( ! Object.keys( tags ).length ) {
			return null;
		}

		return (
			<PostTerms
				taxonomy="tag"
				terms={ values( tags ) }
				icon="tags"
				className="post-tags" />
		);
	}
}
