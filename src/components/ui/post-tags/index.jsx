/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react/addons';

/**
 * Internal dependencies
 */

import PostMetaBlock from 'components/ui/post-meta-block';

export default class PostTags extends Component {
	static propTypes = {
		post: PropTypes.object
	}

	render() {
		const { post: { tags } } = this.props;

		if ( ! Object.keys( tags ).length ) {
			return null;
		}

		const children = Object.keys( tags ).map( ( slug ) => {
			return (
				<li key={ slug } className="post-tags__tag">
					{ tags[ slug ].name }
				</li>
			);
		} );

		return (
			<PostMetaBlock icon="tags" className="post-tags">
				<ul className="post-tags__tags">
					{ children }
				</ul>
			</PostMetaBlock>
		);
	}
}
