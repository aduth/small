/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react/addons';
import { Link } from 'react-router';

/**
 * Internal dependencies
 */

import PostMetaBlock from 'components/ui/post-meta-block';

export default class PostCategories extends Component {
	static propTypes = {
		post: PropTypes.object
	}

	render() {
		const { post: { categories } } = this.props;

		if ( ! Object.keys( categories ).length ) {
			return null;
		}

		const children = Object.keys( categories ).map( ( slug ) => {
			return (
				<li key={ slug } className="post-categories__category">
					<Link to={ '/category/' + encodeURIComponent( slug ) }>
						{ categories[ slug ].name }
					</Link>
				</li>
			);
		} );

		return (
			<PostMetaBlock icon="folder-open" className="post-categories">
				<ul className="post-categories__categories">
					{ children }
				</ul>
			</PostMetaBlock>
		);
	}
}
