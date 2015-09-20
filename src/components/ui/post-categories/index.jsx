/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import values from 'lodash/object/values';

/**
 * Internal dependencies
 */

import PostTerms from 'components/ui/post-terms';

export default class PostCategories extends Component {
	static propTypes = {
		post: PropTypes.object
	}

	render() {
		const { post: { categories } } = this.props;

		if ( ! Object.keys( categories ).length ) {
			return null;
		}

		return (
			<PostTerms
				taxonomy="category"
				terms={ values( categories ) }
				icon="folder-open" />
		);
	}
}
