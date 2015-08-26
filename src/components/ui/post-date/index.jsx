/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react/addons';
import moment from 'moment';

/**
 * Internal dependencies
 */

import PostMetaBlock from 'components/ui/post-meta-block';

export default class PostDate extends Component {
	static propTypes = {
		post: PropTypes.object
	}

	render() {
		const { post } = this.props;

		return (
			<PostMetaBlock icon="clock-o">
				<time dateTime={ post.date }>
					{ moment( post.date ).format( 'll' ) }
				</time>
			</PostMetaBlock>
		);
	}
}
